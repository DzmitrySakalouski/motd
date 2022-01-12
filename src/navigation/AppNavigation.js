import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { MainMovieScreen } from '../screens/MainMovieScreen/MainMovieScreen';
import { MovieDetailsScreen } from '../screens/MovieDetailsScreen/MovieDetailsScreen';

import 'react-native-gesture-handler';
// import { RecomendedMovieDetailsModal } from '../screens/components/RecomendedMovieDetailsModal';

const AppStack = createSharedElementStackNavigator();

const appScreenOptions = {
    headerTransparent: true,
    headerTitle: "",
};

const detailsRouteOptions = {
    headerLeft: () => null,
    gestureEnabled: false
};

export const AppNavigation = () => {
    return (
        <AppStack.Navigator screenOptions={appScreenOptions}>
            <AppStack.Screen name="MainMovieScreen" component={MainMovieScreen} />
            <AppStack.Screen
                name="MovieDetailsScreen"
                options={{...detailsRouteOptions}}
                component={MovieDetailsScreen}
                sharedElements={() => ['movie_poster_main']} />
            {/* <AppStack.Screen
                options={{presentation: 'modal'}}
                name="RecomendedMovieDetails"
                component={RecomendedMovieDetailsModal} /> */}
        </AppStack.Navigator>
    )
}