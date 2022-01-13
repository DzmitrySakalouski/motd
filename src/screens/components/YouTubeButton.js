import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon as ElementsIcon} from 'react-native-elements';
import {COLORS} from '../../contants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
});

export const YouTubeButton = ({
  onPress,
  hasShadow = false,
  customContainerStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[hasShadow && styles.shadow, customContainerStyle]}>
      <ElementsIcon size={100} name="play-circle-filled" color={COLORS.RED} />
    </TouchableOpacity>
  );
};
