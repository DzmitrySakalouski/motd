/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import admob, {MaxAdContentRating} from '@invertase/react-native-google-ads';

admob().setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to whitelist.
    testDeviceIdentifiers: ["EMULATOR"]
  })
  .then(() => {
    // Request config successfully set!
  });

AppRegistry.registerComponent(appName, () => App);
