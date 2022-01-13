import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../contants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    height: 280,
    marginBottom: 20,
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
  innerViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  scrollContainer: {
    width: '100%',
  },
});

export const HorizontalCarousel = ({
  title,
  items,
  onItemPress,
  isLoading,
  CaroucelItem,
}) => {
  if (!items) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <View style={styles.innerViewContainer}>
        {isLoading ? (
          <Text style={styles.text}>...is loading</Text>
        ) : (
          <ScrollView horizontal style={styles.scrollContainer}>
            {items.map(movieItem => (
              <CaroucelItem
                item={movieItem}
                key={movieItem.id}
                onPress={() => onItemPress(movieItem.id)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
