import {useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../contants';
import {getMovieImage} from '../../services/mainMovieService/main_movie.service';
import {ImageCollage} from './components/ImageCollage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    height: '100%',
  },
});

export const AdditionalMovieDetailsScreen = () => {
  const {
    params: {movie},
  } = useRoute();
  const movieImage = useMemo(() => getMovieImage(movie?.poster_path), [movie]);

  return (
    <View style={styles.container}>
      <ImageCollage sourceUrl={movieImage} />
    </View>
  );
};
