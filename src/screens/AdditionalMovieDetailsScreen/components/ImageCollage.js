import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {COLORS} from '../../../contants';
import {MaskedMovieImage} from './MakedImage';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  mainLayer: {
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

export const ImageCollage = ({sourceUrl}) => {
  const {height: windowHeight} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <MaskedMovieImage
        sourceUrl={sourceUrl}
        mainHeight={windowHeight * 0.8 - 100}
        backgroundColor={COLORS.BACKGROUND_PRIMARY_75}
      />
      <MaskedMovieImage
        sourceUrl={sourceUrl}
        backgroundColor={COLORS.BACKGROUND_PRIMARY_35}
        mainHeight={windowHeight * 0.8 - 200}
      />
      <MaskedMovieImage
        sourceUrl={sourceUrl}
        mainHeight={windowHeight * 0.8 - 300}
      />
    </View>
  );
};
