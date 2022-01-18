import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {MainMovieScreen} from '../screens/MainMovieScreen/MainMovieScreen';
import {MovieDetailsScreen} from '../screens/MovieDetailsScreen/MovieDetailsScreen';

import 'react-native-gesture-handler';
import {AdditionalMovieDetailsScreen} from '../screens/AdditionalMovieDetailsScreen/AdditionalMovieDetailsScreen';
import {CrewMemberProfile} from '../screens/CrewMemberProfile/CrewMemberProfile';
import {COLORS} from '../contants';
import {ActorsMoviesList} from '../screens/ActorsMovies/ActorsMoviesList';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AppStack = createSharedElementStackNavigator();

const appScreenOptions = {
  headerTransparent: true,
  gestureEnabled: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
};

const headerStyles = {
  marginLeft: 10,
};

const detailsRouteOptions = {
  gestureEnabled: false,
  headerTitle: '',
};
const MenuHeaderButton = () => {
  const navigation = useNavigation();

  const onIconPress = () => navigation.openDrawer();

  return (
    <TouchableOpacity onPress={onIconPress} style={headerStyles}>
      <Icon name="menu" size={30} color={COLORS.PRIMARY} />
    </TouchableOpacity>
  );
};

export const AppNavigation = () => {
  return (
    <AppStack.Navigator screenOptions={appScreenOptions} mode="modal">
      <AppStack.Screen
        name="MainMovieScreen"
        options={{
          ...detailsRouteOptions,
          headerLeft: () => <MenuHeaderButton />,
        }}
        component={MainMovieScreen}
      />
      <AppStack.Screen
        name="MovieDetailsScreen"
        options={{
          ...detailsRouteOptions,
          headerLeft: () => <MenuHeaderButton />,
        }}
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
          headerLeftContainerStyle: headerStyles,
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
          headerLeftContainerStyle: headerStyles,
        }}
        name="ActorsMoviesList"
        component={ActorsMoviesList}
      />
    </AppStack.Navigator>
  );
};
