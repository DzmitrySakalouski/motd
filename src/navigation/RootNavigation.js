import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
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
    </RootStack.Navigator>
  );
};
