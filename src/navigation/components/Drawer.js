import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Switch, Icon} from 'react-native-elements';
import {useQuery} from 'react-query';
import {COLORS} from '../../contants';
import {
  configureMainMovie,
  getMovieImage,
} from '../../services/mainMovieService/main_movie.service';

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
    fontFamily: 'Bebas Neue',
  },
  header: {
    fontSize: 40,
    fontFamily: 'Bebas Neue',
    color: COLORS.PRIMARY,
  },
  menuItem: {
    fontSize: 23,
    marginBottom: 40,
    fontWeight: '700',
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
        <Text style={[styles.text, {fontFamily: 'Roboto'}]}>
          {movie?.title}
        </Text>
        <Image
          source={{uri: getMovieImage(movie?.poster_path)}}
          style={styles.smallImg}
        />
      </View>
      <View style={styles.primaryMenu}>
        {/* TODO: custom search item */}
        <View style={styles.menuItemContainer}>
          <Icon name="ad-units" color={COLORS.PRIMARY} />
          <Text style={[styles.text, styles.menuItem]}>Ads settings</Text>
        </View>
        <View style={styles.menuItemContainer}>
          <Icon name="info" color={COLORS.PRIMARY} />
          <Text style={[styles.text, styles.menuItem]}>About</Text>
        </View>
      </View>
    </BlurView>
  );
};
