import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from '@invertase/react-native-google-ads';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import {ScrollView} from 'react-native-gesture-handler';
import {BallIndicator} from 'react-native-indicators';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {COLORS} from '../../contants';
import {useActorMovies} from '../CrewMemberProfile/hooks/useActorMoves';
import {ActorsMoviesListItem} from './components/ActorsMoviesListItem';

const styles = StyleSheet.create({
  loader: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moviesList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  contentContainer: {},
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  banner: {
    width: '100%',
  },
});

const adId =
  Config.ENVIRONMENT === 'PROD'
    ? Config.BOTTOM_MOVIES_LIST_ACTOR
    : TestIds.BANNER;

export const ActorsMoviesList = () => {
  const {params} = useRoute();
  const {navigate, setOptions} = useNavigation();
  const {actorMoviesList, isActorMoviesListLoading} = useActorMovies(
    params?.actorId,
  );
  const {width: windowWidth} = useSafeAreaFrame();

  useEffect(() => {
    if (params?.actorName)
      setOptions({
        headerTitle: `${params?.actorName}'s movies`,
      });
  }, [params, setOptions]);

  const handlePressMovie = movie => {
    navigate('AdditionalMovieDetailsScreen', {movie});
  };

  if (isActorMoviesListLoading) {
    return (
      <View style={[styles.loader, {width: windowWidth, height: windowWidth}]}>
        <BallIndicator size={50} color={COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.moviesList}>
          {actorMoviesList?.cast?.map(movie => {
            return (
              <ActorsMoviesListItem
                movie={movie}
                onItemPress={() => handlePressMovie(movie)}
                key={movie.id}
              />
            );
          })}
          {actorMoviesList?.cast?.length % 2 !== 0 && (
            <ActorsMoviesListItem movie={null} key={'movie.id'} />
          )}
        </View>
      </ScrollView>
      <View style={styles.banner}>
        <BannerAd unitId={adId} size={BannerAdSize.ADAPTIVE_BANNER} />
      </View>
    </View>
  );
};
