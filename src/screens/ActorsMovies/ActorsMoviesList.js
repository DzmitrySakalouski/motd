import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BallIndicator} from 'react-native-indicators';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {COLORS} from '../../contants';
import {useActorMovies} from '../CrewMemberProfile/hooks/useActorMoves';
import {ActorsMoviesListItem} from './components/ActorsMoviesListItem';

const styles = StyleSheet.create({
  loader: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moviesList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  contentContainer: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
});

export const ActorsMoviesList = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const {actorMoviesList, isActorMoviesListLoading} = useActorMovies(
    params?.actorId,
  );
  const {width: windowWidth} = useSafeAreaFrame();

  const handlePressMovie = movie => {
    navigate('AdditionalMovieDetailsScreen', {movie});
  };

  if (isActorMoviesListLoading) {
    return (
      <View style={[styles.loader, {width: windowWidth, height: windowWidth}]}>
        <BallIndicator size={50} color={COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.contentContainer}>
      <View style={styles.moviesList}>
        {actorMoviesList?.cast?.map(movie => {
          return (
            <ActorsMoviesListItem
              movie={movie}
              onItemPress={() => handlePressMovie(movie)}
              key={movie.id}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
