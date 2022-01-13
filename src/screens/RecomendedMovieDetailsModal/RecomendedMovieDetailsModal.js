import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
});

export const RecomendedMovieDetailsModal = () => {
  return (
    <View style={styles.container}>
      <Text>Details</Text>
    </View>
  );
};
