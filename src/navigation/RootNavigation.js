import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AdditionalMovieDetailsScreen} from '../screens/AdditionalMovieDetailsScreen/AdditionalMovieDetailsScreen';
import {HomeDrawerNavigator} from './HomeNavigator';

const RootStack = createStackNavigator();

const appScreenOptions = {
  headerShown: false,
};

export const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={appScreenOptions}
      initialRouteName="Main">
      <RootStack.Screen name="Main" component={HomeDrawerNavigator} />
      <RootStack.Screen
        name="AdditionalMovieDetailsScreen"
        options={{presentation: 'modal'}}
        component={AdditionalMovieDetailsScreen}
      />
    </RootStack.Navigator>
  );
};
