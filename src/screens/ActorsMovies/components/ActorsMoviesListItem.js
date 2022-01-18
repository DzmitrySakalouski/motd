import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import {COLORS} from '../../../contants';
import {getMovieImage} from '../../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GOLD,
  },
});

export const ActorsMoviesListItem = ({movie, onItemPress}) => {
  const {width: windowWidth} = useSafeAreaFrame();

  if (!movie.poster_path && !movie.backdrop_path) {
    console.log('nonono', movie);

    return null;
  }

  return (
    <TouchableOpacity onPress={onItemPress}>
      <SharedElement id={`image_background.${movie.id}`}>
        <Image
          style={[
            styles.container,
            {height: windowWidth * 0.8, width: windowWidth / 2},
          ]}
          resizeMode="cover"
          source={{
            uri: getMovieImage(
              movie.poster_path ? movie.poster_path : movie.backdrop_path,
            ),
          }}
        />
      </SharedElement>
    </TouchableOpacity>
  );
};
