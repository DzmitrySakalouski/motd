import {useQuery} from 'react-query';
import {getActorMoviesList} from '../../../services/actorService/actor.service';

export const useActorMovies = (actorId, isEnabled = false) => {
  const cacheKey = 'actorMovies';
  const {data: actorMoviesList, isLoading: isActorMoviesListLoading} = useQuery(
    cacheKey,
    () => getActorMoviesList(actorId),
    {enabled: isEnabled},
  );

  return {
    actorMoviesList,
    isActorMoviesListLoading,
  };
};
