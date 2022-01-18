import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {PanGestureHandler, ScrollView} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  BounceInDown,
} from 'react-native-reanimated';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import {COLORS} from '../../contants';
import {
  buildTrailerUrl,
  getMovieImage,
  getMovieVideo,
} from '../../services/mainMovieService/main_movie.service';
import {snapPoint} from 'react-native-redash';
import {YouTubeButton} from '../components/YouTubeButton';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Snackbar from 'react-native-snackbar';

const styles = StyleSheet.create({
  overviewText: {
    color: COLORS.PRIMARY,
    fontFamily: 'Roboto',
    marginTop: 4,
    fontSize: 16,
    marginRight: 16,
    textAlign: 'center',
    lineHeight: 27,
    paddingBottom: 30,
  },
  square: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY_75,
    flex: 1,
  },
  triangleCorner: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderBottomColor: COLORS.BACKGROUND_PRIMARY_75,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  title: {
    fontSize: 40,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    fontFamily: 'Bebas Neue',
    textAlign: 'center',
  },
  background: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {width: '100%', height: '100%', opacity: 1},
  infoContainer: {
    position: 'absolute',
  },
  youtubeContainer: {position: 'relative'},
  scroll: {paddingHorizontal: 16},
});

export const AdditionalMovieDetailsScreen = () => {
  const {
    params: {movie},
  } = useRoute();
  const movieImage = useMemo(() => getMovieImage(movie?.poster_path), [movie]);
  const {height, width} = useSafeAreaFrame();
  const {goBack} = useNavigation();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const infoContainerTranslateY = useSharedValue(0);

  const moveStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const infoAnimationStyle = useAnimatedStyle(() => ({
    width,
    height: height / 1.5,
    backgroundColor: 'transparent',
    zIndex: 100,
    bottom: 0,
    transform: [{translateY: infoContainerTranslateY.value}],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({translationX, translationY}) => {
      translateX.value = translationX;
      if (translationY > 0) {
        translateY.value = translationY;
        infoContainerTranslateY.value = translationY * 2;
      }
    },
    onEnd: ({velocityX, velocityY}) => {
      const shouldGoBack =
        snapPoint(translateY.value, velocityY, [0, height]) === height;
      if (shouldGoBack) {
        runOnJS(goBack)();
      } else {
        translateX.value = withSpring(0, {velocity: velocityX});
        translateY.value = withSpring(0, {velocity: velocityY});
        infoContainerTranslateY.value = withSpring(0, {velocity: velocityY});
      }
    },
  });

  const openTrailer = async () => {
    const video = await getMovieVideo(movie.id);
    if (!video?.results?.length) {
      Snackbar.show({
        text: 'Oops, there is no trailer for this movie =(',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: COLORS.RED,
        },
      });

      return;
    }
    const url = buildTrailerUrl(video.results[0]);
    if (url) {
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
    }
  };

  return (
    <>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={moveStyle}>
          <SharedElement id={`image_background.${movie.id}`}>
            <Image source={{uri: movieImage}} style={styles.imageBg} />
          </SharedElement>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        entering={BounceInDown.duration(1000)}
        style={[styles.infoContainer, infoAnimationStyle]}>
        <View
          style={[
            styles.triangleCorner,
            {
              borderLeftWidth: width,
              borderBottomWidth: width / 5,
            },
          ]}
        />
        <View style={[styles.square, {height: width / 2, width}]}>
          <View style={[styles.youtubeContainer, {top: -(width / 5)}]}>
            <YouTubeButton onPress={openTrailer} />
          </View>
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <View>
              <Text style={[styles.title]}>{movie.title}</Text>
              <Text style={[styles.overviewText]}>{movie.overview}</Text>
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
};
