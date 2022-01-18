import Snackbar from 'react-native-snackbar';
import {useQuery} from 'react-query';
import {COLORS} from '../../../contants';
import {getActorImages} from '../../../services/actorService/actor.service';

export const useActorImages = (actorId, isEnabled = false) => {
  const {data: actorImages, isLoading: areActorImagesLoading} = useQuery(
    'actorImages',
    () => getActorImages(actorId),
    {
      enabled: isEnabled,
      onError: () => {
        Snackbar.show({
          text: 'Oops, server error occured =(',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: 'Ok',
            textColor: COLORS.RED,
          },
        });
      },
    },
  );

  return {actorImages, areActorImagesLoading};
};
