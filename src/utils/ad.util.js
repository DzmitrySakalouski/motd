import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {COLORS} from '../contants';

export const adUseHandler = async (callback, interstitial, isAdLoaded) => {
  try {
    let showCount = await AsyncStorage.getItem('showAdCount');
    console.log(showCount);
    if (!showCount) {
      await AsyncStorage.setItem('showAdCount', '0');
      callback();

      return;
    }
    if (+showCount !== 0 && +showCount % 10 === 0 && isAdLoaded) {
      await interstitial.show();
    }
    await AsyncStorage.setItem('showAdCount', `${+showCount + 1}`);
    callback();
  } catch (error) {
    Snackbar.show({
      text: 'Oops, something went wrong =(',
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'OK',
        textColor: COLORS.RED,
      },
    });
  }
};
