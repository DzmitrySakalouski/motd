import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {COLORS} from '../../../contants';
import {MaskedMovieImage} from './MakedImage';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export const ImageCollage = ({sourceUrl, primaryHeight}) => {
  return (
    <View style={styles.container}>
      <Animated.View>
        <MaskedMovieImage
          sourceUrl={sourceUrl}
          mainHeight={primaryHeight - 100}
          backgroundColor={COLORS.BACKGROUND_PRIMARY_75}
        />
      </Animated.View>
      <View>
        <MaskedMovieImage
          sourceUrl={sourceUrl}
          backgroundColor={COLORS.BACKGROUND_PRIMARY_35}
          mainHeight={primaryHeight - 200}
        />
      </View>
      <View>
        <MaskedMovieImage
          sourceUrl={sourceUrl}
          mainHeight={primaryHeight - 300}
        />
      </View>
    </View>
  );
};
