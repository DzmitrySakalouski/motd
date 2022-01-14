// import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
// import {AdditionalMovieDetailsScreen} from '../screens/AdditionalMovieDetailsScreen/AdditionalMovieDetailsScreen';
import {HomeDrawerNavigator} from './HomeNavigator';
import 'react-native-gesture-handler';

const RootStack = createSharedElementStackNavigator();

const appScreenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
};

export const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={appScreenOptions}
      mode="modal"
      initialRouteName="Main">
      <RootStack.Screen name="Main" component={HomeDrawerNavigator} />
      {/* <RootStack.Screen */}
      {/* name="AdditionalMovieDetailsScreen"
        component={AdditionalMovieDetailsScreen}
        sharedElements={route => {
          const {id} = route.params.movie;

          return [`image_background.${id}`];
        }}
      /> */}
    </RootStack.Navigator>
  );
};
