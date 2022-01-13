import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeDrawerNavigator} from './HomeNavigator';
import {RecomendedMovieDetailsModal} from '../screens/RecomendedMovieDetailsModal/RecomendedMovieDetailsModal';

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
        name="RecomendedMovieDetails"
        options={{presentation: 'modal'}}
        component={RecomendedMovieDetailsModal}
      />
    </RootStack.Navigator>
  );
};
