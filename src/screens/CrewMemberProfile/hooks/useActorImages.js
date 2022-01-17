import {useQuery} from 'react-query';
import {getActorImages} from '../../../services/actorService/actor.service';

export const useActorImages = (actorId, isEnabled = false) => {
  const {data: actorImages, isLoading: areActorImagesLoading} = useQuery(
    'actorImages',
    () => getActorImages(actorId),
    {enabled: isEnabled},
  );

  return {actorImages, areActorImagesLoading};
};
