import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {useMutation, useQueryClient} from 'react-query';
import {updateMovie} from '../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    zIndex: 100,
  },
});

export const ReloadButton = () => {
  const queryClient = useQueryClient();
  const {mutate: update} = useMutation(() => updateMovie(), {
    cacheKey: 'primary_movie',
    onSuccess: () => {
      queryClient.refetchQueries('primary_movie');
    },
  });

  return (
    <Icon
      containerStyle={styles.container}
      onPress={() => {
        update();
      }}
      name="rotate-left"
      color="white"
      size={28}
    />
  );
};
