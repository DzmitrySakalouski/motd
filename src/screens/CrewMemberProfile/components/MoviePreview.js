import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from '@invertase/react-native-google-ads';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import {BallIndicator} from 'react-native-indicators';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import {COLORS} from '../../../contants';
import {getMovieImage} from '../../../services/mainMovieService/main_movie.service';
import {adUseHandler} from '../../../utils/ad.util';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 11,
    marginTop: 30,
  },
  column: {
    flex: 0.5,
    paddingHorizontal: 5,
    overflow: 'hidden',
  },
  columnImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  roundedContainer: {
    margin: 5,
  },
  showMoreBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_PRIMARY_75,
    marginTop: 10,
    borderRadius: 10,
    flex: 0.5,
  },
  btnText: {
    fontFamily: 'Bebas Neue',
    fontSize: 22,
    color: COLORS.PRIMARY,
  },
  loader: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const adId =
  Config.ENVIRONMENT === 'PROD'
    ? Config.SHOW_MORE_MOVIES_FULLSCREEN
    : TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export const MoviePreview = ({movies, isLoading, actorId, actorName}) => {
  const {width: windowWidth} = useSafeAreaFrame();
  const {navigate} = useNavigation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.loader, {width: windowWidth, height: windowWidth}]}>
        <BallIndicator size={50} color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!movies?.length) {
    return null;
  }

  const [first, second] = movies.filter(movie =>
    Boolean(movie.poster_path || movie.backdrop_path),
  );

  const handleMoviePress = movie => {
    if (movie) {
      navigate('AdditionalMovieDetailsScreen', {movie});
    }
  };

  const handlePressSeeMore = () => {
    adUseHandler(
      () => navigate('ActorsMoviesList', {actorId, actorName}),
      interstitial,
      loaded,
    );
  };
  /* eslint-disable react-native/no-inline-styles */

  return (
    <View style={[styles.container, {height: windowWidth * 0.7}]}>
      <View style={[styles.column]}>
        <TouchableOpacity
          onPress={() => handleMoviePress(first)}
          style={styles.rounded}>
          {}
          <SharedElement id={`image_background.${first.id}`}>
            <Image
              style={styles.columnImg}
              resizeMode="cover"
              source={{
                uri: getMovieImage(first?.poster_path || first?.backdrop_path),
              }}
            />
          </SharedElement>
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        {second && (
          <TouchableOpacity
            onPress={() => handleMoviePress(second)}
            style={[styles.column, movies.length < 3 && {flex: 1}]}>
            <SharedElement id={`image_background.${second.id}`}>
              <Image
                style={[styles.columnImg, {height: windowWidth * 0.7}]}
                resizeMode="stretch"
                source={{uri: getMovieImage(second?.poster_path)}}
              />
            </SharedElement>
          </TouchableOpacity>
        )}
        {movies.length >= 3 && (
          <TouchableOpacity
            onPress={handlePressSeeMore}
            style={[styles.showMoreBtn]}>
            <Text style={styles.btnText}>see more</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
