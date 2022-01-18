import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from '@invertase/react-native-google-ads';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Config from 'react-native-config';
import {Icon} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import {useMutation, useQueryClient} from 'react-query';
import {COLORS} from '../../contants';
import {updateMovie} from '../../services/mainMovieService/main_movie.service';
import {adUseHandler} from '../../utils/ad.util';

const adId =
  Config.ENVIRONMENT === 'PROD'
    ? Config.RELOAD_FULLSCREEN_AD
    : TestIds.INTERSTITIAL;

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    zIndex: 100,
  },
});

const interstitial = InterstitialAd.createForAdRequest(adId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export const ReloadButton = () => {
  const queryClient = useQueryClient();
  const {mutate: update} = useMutation(() => updateMovie(), {
    cacheKey: 'primary_movie',
    onSuccess: () => {
      queryClient.refetchQueries('primary_movie');
    },
    onError: () => {
      Snackbar.show({
        text: 'Oops, there is no trailer for this movie =(',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: COLORS.RED,
        },
      });
    },
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet

  const handlePress = async () => {
    adUseHandler(update, interstitial, loaded);
  };

  return (
    <Icon
      containerStyle={styles.container}
      onPress={handlePress}
      name="rotate-left"
      color="white"
      size={28}
    />
  );
};
