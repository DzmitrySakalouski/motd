import React, {useMemo} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import {
  buildTrailerUrl,
  getCast,
  getMovieImage,
  getRecommendedMovies,
} from '../../services/mainMovieService/main_movie.service';
import {InfoSectionComponent} from './components/InfoSectionComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../contants';
import {HorizontalCarousel} from '../components/HorizontalCarousel';
import {useQuery} from 'react-query';
import {MovieCaroucelItem} from '../components/MovieCaroucelItem';
import {CrewCarouselItem} from '../components/CrewCarouselItem';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {BallIndicator} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import {YouTubeButton} from '../components/YouTubeButton';
import Snackbar from 'react-native-snackbar';
import Config from 'react-native-config';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from '@invertase/react-native-google-ads';

const styles = StyleSheet.create({
  frontImageStyle: {
    width: 195,
    height: 314,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  frontImageStyleContainer: {
    position: 'absolute',
    bottom: -157,
    zIndex: 2,
    opacity: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    paddingBottom: 60,
  },
  bgPoster: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
    // position: 'relative',
  },
  header: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  mainSection: {
    paddingHorizontal: 24,
  },
  banner: {
    width: '100%',
  },
});

export const MovieDetailsScreen = () => {
  const {
    data: movie,
    isFetching,
    isFetched: isMovieFetched,
  } = useQuery('primary_movie', {
    enabled: false,
    onError: () => {
      Snackbar.show({
        text: 'Oops, server error occured =(',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: COLORS.RED,
        },
      });
    },
  });
  const {navigate} = useNavigation();
  const movieImage = useMemo(() => getMovieImage(movie?.poster_path), [movie]);
  const {data: recommendedData, isLoading: isLoadingRecommended} = useQuery(
    ['recommended', isMovieFetched, movie],
    () => getRecommendedMovies(movie.id),
    {
      enabled: isMovieFetched,
      onError: () => {
        Snackbar.show({
          text: 'Oops, server error occured =(',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'OK',
            textColor: COLORS.RED,
          },
        });
      },
    },
  );
  const {data: crewData, isLoading: isLoadingCrew} = useQuery(
    ['crew', isMovieFetched, movie],
    () => getCast(movie.id),
    {
      enabled: isMovieFetched,
      onError: () => {
        Snackbar.show({
          text: 'Oops, server error occured =(',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'OK',
            textColor: COLORS.RED,
          },
        });
      },
    },
  );

  const borderRadiusValue = useSharedValue(15);
  const imageAnimationStyles = useAnimatedStyle(() => ({
    borderRadius: withTiming(borderRadiusValue.value, {duration: 10000}),
  }));

  const openTrailer = async () => {
    try {
      const url = buildTrailerUrl(movie.video);

      await InAppBrowser.open(url, {
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: COLORS.BACKGROUND_PRIMARY,
        preferredControlTintColor: COLORS.PRIMARY,
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
      });
    } catch {
      Snackbar.show({
        text: 'Oops, cannot find trailer =(',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: COLORS.RED,
        },
      });
    }
  };

  const handlePressRecomended = movie => {
    if (movie) {
      navigate('AdditionalMovieDetailsScreen', {movie});
    }
  };

  const handlePressCrew = crew => {
    if (crew) {
      navigate('CrewMemberProfile', {crew});
    }
  };

  if (isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <BallIndicator size={50} color={COLORS.PRIMARY} />
      </View>
    );
  }

  const adId =
    Config.ENVIRONMENT === 'PROD'
      ? Config.BOTTOM_BANNER_DETAILS
      : TestIds.BANNER;

  return (
    <>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <ImageBackground source={{uri: movieImage}} style={styles.bgPoster} />
          <View style={styles.frontImageStyleContainer}>
            <SharedElement id="movie_poster_main">
              <Animated.Image
                pointerEvents="none"
                source={{uri: movieImage}}
                style={[styles.frontImageStyle, imageAnimationStyles]}
              />
            </SharedElement>
            <YouTubeButton onPress={openTrailer} />
          </View>
        </View>
        <View style={styles.mainSection}>
          <InfoSectionComponent movie={movie} />
          <HorizontalCarousel
            items={crewData?.cast}
            title="Cast"
            isLoading={isLoadingCrew}
            onItemPress={crew => handlePressCrew(crew)}
            CaroucelItem={CrewCarouselItem}
            type="cast"
          />
          <HorizontalCarousel
            items={recommendedData?.results}
            title="Recommended"
            isLoading={isLoadingRecommended}
            onItemPress={recomendedMovie =>
              handlePressRecomended(recomendedMovie)
            }
            CaroucelItem={MovieCaroucelItem}
            type="movie"
          />
        </View>
      </ScrollView>
      <View style={styles.banner}>
        <BannerAd unitId={adId} size={BannerAdSize.ADAPTIVE_BANNER} />
      </View>
    </>
  );
};
