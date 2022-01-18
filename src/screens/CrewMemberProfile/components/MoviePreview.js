import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
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

export const MoviePreview = ({movies, isLoading}) => {
  const {width: windowWidth} = useSafeAreaFrame();
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

  const [first, second] = movies;

  return (
    <View style={[styles.container, {height: windowWidth * 0.7}]}>
      <View style={[styles.column]}>
        <TouchableOpacity tyle={styles.rounded}>
          <Image
            style={styles.columnImg}
            resizeMode="cover"
            source={{uri: getMovieImage(first?.poster_path)}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <TouchableOpacity style={[styles.column]}>
          <Image
            style={[styles.columnImg, {height: windowWidth * 0.7}]}
            resizeMode="stretch"
            source={{uri: getMovieImage(second?.poster_path)}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.showMoreBtn]}>
          <Text style={styles.btnText}>see more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
