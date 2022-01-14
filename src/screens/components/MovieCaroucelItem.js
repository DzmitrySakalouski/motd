import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import {COLORS} from '../../contants';
import {getMovieImage} from '../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
  imageContainer: {
    width: 130,
    height: 199,
    borderRadius: 5,
  },
  container: {
    marginRight: 30,
  },
  itemTitle: {
    marginTop: 5,
    textAlign: 'center',
  },
  text: {
    color: COLORS.PRIMARY,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export const MovieCaroucelItem = ({item, onPress}) => {
  const imgOpacity = useSharedValue(1);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      width: '100%',
      height: '100%',
      opacity: imgOpacity.value,
    };
  });

  const onItemPress = () => {
    imgOpacity.value = withSpring(1);
    onPress();
  };

  if (!item) {
    return null;
  }

  return (
    // <TouchableOpacity onPress={onItemPress}>
    <View style={styles.container}>
      <Pressable style={styles.imageContainer} onPress={onItemPress}>
        <SharedElement id={`image_background.${item.id}`}>
          <Animated.Image
            source={{uri: getMovieImage(item.poster_path)}}
            style={animatedImageStyle}
          />
        </SharedElement>
      </Pressable>
      <Text style={[styles.text, styles.itemTitle]}>{item.title}</Text>
    </View>
  );
};
