import Snackbar from 'react-native-snackbar';
import {useQuery} from 'react-query';
import {COLORS} from '../../../contants';
import {getActorMoviesList} from '../../../services/actorService/actor.service';

export const useActorMovies = (actorId, isEnabled = false) => {
  const cacheKey = 'actorMovies';
  const {data: actorMoviesList, isLoading: isActorMoviesListLoading} = useQuery(
    cacheKey,
    () => getActorMoviesList(actorId),
    {
      enabled: isEnabled,
      onError: () => {
        Snackbar.show({
          text: 'Oops, server error occured =(',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'OK',
            textColor: COLORS.RED,
          },
        });
      },
    },
  );

  return {
    actorMoviesList,
    isActorMoviesListLoading,
  };
};
