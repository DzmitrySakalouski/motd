import Snackbar from 'react-native-snackbar';
import {useQuery} from 'react-query';
import {COLORS} from '../../../contants';
import {getActorDataRequest} from '../../../services/actorService/actor.service';

export const useActorData = (actorId, isEnabled = false) => {
  const cacheKey = 'actorData';
  const {data: actorData, isFetching: isActorDataLoading} = useQuery(
    cacheKey,
    () => getActorDataRequest(actorId),
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
    actorData,
    isActorDataLoading,
  };
};
