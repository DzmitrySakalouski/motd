import {useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {COLORS} from '../../contants';
import {
  buildTrailerUrl,
  getMovieImage,
} from '../../services/mainMovieService/main_movie.service';
import {YouTubeButton} from '../components/YouTubeButton';

const styles = StyleSheet.create({
  overviewText: {
    color: COLORS.PRIMARY,
    fontFamily: 'Roboto',
    marginTop: 4,
    fontSize: 16,
    marginRight: 16,
    textAlign: 'center',
    lineHeight: 27,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    color: COLORS.PRIMARY,
    paddingVertical: 60,
    fontWeight: 'bold',
    fontFamily: 'Bebas Neue',
    textAlign: 'center',
  },
  background: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY_75,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export const AdditionalMovieDetailsScreen = () => {
  const {
    params: {movie},
  } = useRoute();
  const movieImage = useMemo(() => getMovieImage(movie?.poster_path), [movie]);

  const openTrailer = async () => {
    const url = buildTrailerUrl(movie.video);
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
    <ImageBackground source={{uri: movieImage}} style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.youTubeButtonContainer]}>
          <YouTubeButton hasShadow onPress={openTrailer} />
        </View>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overviewText}>{movie.overview}</Text>
      </View>
    </ImageBackground>
  );
};
