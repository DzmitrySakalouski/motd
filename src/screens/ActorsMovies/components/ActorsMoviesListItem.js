import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import {COLORS} from '../../../contants';
import {getMovieImage} from '../../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    marginBottom: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,

    elevation: 10,
  },
  text: {
    fontFamily: 'Bebas Neue',
    textAlign: 'center',
    color: COLORS.PRIMARY,
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  noImageItem: {
    flex: 0.5,
    padding: 4,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
});

export const ActorsMoviesListItem = ({movie, onItemPress}) => {
  const {width: windowWidth} = useSafeAreaFrame();

  if (!movie) {
    return (
      <View style={{height: windowWidth * 0.8, width: windowWidth / 2 - 24}} />
    );
  }

  return (
    <TouchableOpacity onPress={onItemPress} style={styles.shadow}>
      {!movie.poster_path && !movie.backdrop_path ? (
        <View
          style={[
            styles.container,
            styles.textContainer,
            {height: windowWidth * 0.8, width: windowWidth / 2 - 24},
          ]}>
          <View style={[styles.noImageItem, styles.flexEnd]}>
            <Icon name="theaters" size={50} color={COLORS.PRIMARY} />
          </View>
          <View style={[styles.noImageItem]}>
            <Text style={styles.text}>{movie.title}</Text>
          </View>
        </View>
      ) : (
        <SharedElement id={`image_background.${movie.id}`}>
          <Image
            style={[
              styles.container,
              {height: windowWidth * 0.8, width: windowWidth / 2 - 24},
            ]}
            resizeMode="cover"
            source={{
              uri: getMovieImage(
                movie.poster_path ? movie.poster_path : movie.backdrop_path,
              ),
            }}
          />
        </SharedElement>
      )}
    </TouchableOpacity>
  );
};
