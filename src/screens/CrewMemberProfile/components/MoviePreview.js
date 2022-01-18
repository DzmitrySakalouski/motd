import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import {COLORS} from '../../../contants';
import {getMovieImage} from '../../../services/mainMovieService/main_movie.service';

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

export const MoviePreview = ({movies, isLoading, actorId}) => {
  const {width: windowWidth} = useSafeAreaFrame();
  const {navigate} = useNavigation();

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
    navigate('ActorsMoviesList', {actorId});
  };

  return (
    <View style={[styles.container, {height: windowWidth * 0.7}]}>
      <View style={[styles.column]}>
        <TouchableOpacity
          onPress={() => handleMoviePress(first)}
          style={styles.rounded}>
          <SharedElement id={`image_background.${first.id}`}>
            <Image
              style={styles.columnImg}
              resizeMode="cover"
              source={{uri: getMovieImage(first?.poster_path)}}
            />
          </SharedElement>
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        {second && (
          <TouchableOpacity
            onPress={() => handleMoviePress(second)}
            style={[styles.column]}>
            <SharedElement id={`image_background.${second.id}`}>
              <Image
                style={[styles.columnImg, {height: windowWidth * 0.7}]}
                resizeMode="stretch"
                source={{uri: getMovieImage(second?.poster_path)}}
              />
            </SharedElement>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handlePressSeeMore}
          style={[styles.showMoreBtn]}>
          <Text style={styles.btnText}>see more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
