import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import {COLORS} from '../../../contants';

const styles = StyleSheet.create({
  maskContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  image: {
    position: 'relative',
  },
  maskElement: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  square: {
    backgroundColor: COLORS.PRIMARY,
  },
  triangleCorner: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.PRIMARY,
  },
  blur: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

export const MaskedMovieImage = ({
  sourceUrl,
  mainHeight = 450,
  stylesShape = {},
  backgroundColor = 'transparent',
}) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  return (
    <>
      <MaskedView
        style={styles.maskElement}
        maskElement={
          <View style={styles.maskContainer}>
            <View
              style={[styles.square, {height: mainHeight, width: windowWidth}]}
            />
            <View
              style={[
                styles.triangleCorner,
                {
                  borderRightWidth: windowWidth,
                  borderTopWidth: windowWidth / 5,
                },
                stylesShape,
              ]}
            />
          </View>
        }>
        <View style={[styles.image, {height: mainHeight + windowWidth / 5}]}>
          <View style={[styles.blur, {backgroundColor}]} />
          <Image
            style={[
              styles.image,
              {height: windowHeight * 0.8, width: windowWidth},
            ]}
            source={{uri: sourceUrl}}
            resizeMode="cover"
          />
        </View>
      </MaskedView>
    </>
  );
};
