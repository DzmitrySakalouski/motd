import {useQuery} from 'react-query';
import {getActorDataRequest} from '../../../services/actorService/actor.service';

export const useActorData = (actorId, isEnabled = false) => {
  const cacheKey = 'actorData';
  const {data: actorData, isLoading: isActorDataLoading} = useQuery(
    cacheKey,
    () => getActorDataRequest(actorId),
    {enabled: isEnabled},
  );

  return {
    actorData,
    isActorDataLoading,
  };
};
