import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useQuery} from 'react-query';
import {COLORS} from '../../contants';
import {getMovieImage} from '../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 60,
    paddingHorizontal: 16,
    flex: 1,
  },
  text: {
    color: COLORS.PRIMARY,
    fontFamily: 'Roboto',
    fontWeight: '600',
  },
  header: {
    fontSize: 40,
    fontFamily: 'Bebas Neue',
    color: COLORS.PRIMARY,
  },
  menuItem: {
    fontSize: 23,
    marginBottom: 40,
    fontWeight: '100',
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexGrow: 1,
    flex: 1,
  },
  primaryMenu: {
    marginTop: 50,
  },
  smallImg: {
    width: 60,
    height: 90,
    marginTop: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 8,
  },
  menuItemContainer: {
    flexDirection: 'row',
  },
  movieTitle: {
    fontFamily: 'Roboto',
  },
});

export const Drawer = () => {
  const {data: movie} = useQuery('primary_movie');

  return (
    <BlurView
      style={styles.container}
      blurType="dark"
      blurAmount={10}
      reducedTransparencyFallbackColor="white">
      <View>
        <Text style={[styles.text, styles.header]}>Movie of the day</Text>
        <Text style={[styles.text, styles.movieTitle]}>{movie?.title}</Text>
        <Image
          source={{uri: getMovieImage(movie?.poster_path)}}
          style={styles.smallImg}
        />
      </View>
      <View style={styles.primaryMenu}>
        <TouchableOpacity style={styles.menuItemContainer}>
          <Icon name="local-offer" color={COLORS.PRIMARY} />
          <Text style={[styles.text, styles.menuItem]}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemContainer}>
          <Icon name="ad-units" color={COLORS.PRIMARY} />
          <Text style={[styles.text, styles.menuItem]}>Ads settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemContainer}>
          <Icon name="info" color={COLORS.PRIMARY} />
          <Text style={[styles.text, styles.menuItem]}>About</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};
