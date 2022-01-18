import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BallIndicator} from 'react-native-indicators';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import {useQuery} from 'react-query';
import {COLORS} from '../../contants';
import {
  getMovieImage,
  presentMovie,
} from '../../services/mainMovieService/main_movie.service';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from '@invertase/react-native-google-ads';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  button: {
    borderColor: 'white',
    borderWidth: 1.5,
    paddingHorizontal: 40,
    paddingVertical: 12,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'Bebas Neue',
    fontSize: 23,
  },
  errorText: {
    color: 'red',
    fontSize: 22,
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageTransitionContainer: {
    height: 350,
    width: 230,
  },
});

const adId =
  Config.ENVIRONMENT === 'PROD' ? Config.BOTTOM_BANNER : TestIds.INTERSTITIAL;

export const MainMovieScreen = () => {
  console.log(Config.ENVIRONMENT);
  const {
    isFetching,
    isError,
    data: movieData,
  } = useQuery('primary_movie', presentMovie, {
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

  const handleNavigateToDetails = useCallback(() => {
    navigate('MovieDetailsScreen', {movie: movieData});
  }, [movieData, navigate]);

  useEffect(() => {
    presentMovie();
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      width: '100%',
      height: '100%',
    };
  });

  if (isFetching) {
    return (
      <View style={styles.container}>
        <BallIndicator size={50} color="white" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>An error occured</Text>
      </View>
    );
  }

  return (
    <>
      <ImageBackground
        source={{uri: getMovieImage(movieData?.poster_path)}}
        style={styles.container}
        resizeMode="stretch">
        <BlurView
          style={styles.blurContainer}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.imageTransitionContainer}>
          <SharedElement id="movie_poster_main">
            <Animated.Image
              source={{uri: getMovieImage(movieData?.poster_path)}}
              style={animatedImageStyle}
              resizeMode="cover"
            />
          </SharedElement>
        </View>
        <TouchableOpacity onPress={handleNavigateToDetails}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>View details</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.banner}>
        <BannerAd unitId={adId} size={BannerAdSize.ADAPTIVE_BANNER} />
      </View>
    </>
  );
};
