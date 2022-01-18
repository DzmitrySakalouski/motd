import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {MainMovieScreen} from '../screens/MainMovieScreen/MainMovieScreen';
import {MovieDetailsScreen} from '../screens/MovieDetailsScreen/MovieDetailsScreen';

import 'react-native-gesture-handler';
import {AdditionalMovieDetailsScreen} from '../screens/AdditionalMovieDetailsScreen/AdditionalMovieDetailsScreen';
import {CrewMemberProfile} from '../screens/CrewMemberProfile/CrewMemberProfile';
import {COLORS} from '../contants';
import {ActorsMoviesList} from '../screens/ActorsMovies/ActorsMoviesList';

const AppStack = createSharedElementStackNavigator();

const appScreenOptions = {
  headerTransparent: true,
  gestureEnabled: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
};

const detailsRouteOptions = {
  headerLeft: () => null,
  gestureEnabled: false,
  headerShown: false,
};

export const AppNavigation = () => {
  return (
    <AppStack.Navigator screenOptions={appScreenOptions} mode="modal">
      <AppStack.Screen
        name="MainMovieScreen"
        options={{...detailsRouteOptions}}
        component={MainMovieScreen}
      />
      <AppStack.Screen
        name="MovieDetailsScreen"
        options={{...detailsRouteOptions}}
        component={MovieDetailsScreen}
        sharedElements={() => {
          return ['movie_poster_main'];
        }}
      />
      <AppStack.Screen
        name="AdditionalMovieDetailsScreen"
        component={AdditionalMovieDetailsScreen}
        options={{presentation: 'transparentModal', headerShown: false}}
        sharedElements={route => {
          const {id} = route.params.movie;

          return [`image_background.${id}`];
        }}
      />
      <AppStack.Screen
        options={{
          presentation: 'transparentModal',
          headerLeftLabelVisible: false,
          headerTintColor: COLORS.PRIMARY,
          headerTitle: '',
        }}
        name="CrewMemberProfile"
        component={CrewMemberProfile}
      />
      <AppStack.Screen
        options={{
          presentation: 'transparentModal',
          headerLeftLabelVisible: false,
          headerTintColor: COLORS.PRIMARY,
          headerTitle: '',
        }}
        name="ActorsMoviesList"
        component={ActorsMoviesList}
      />
    </AppStack.Navigator>
  );
};
