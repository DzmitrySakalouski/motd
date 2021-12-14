import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {AboutScreen, AdsSettingsScreen} from '../screens';
import {AppNavigation} from './AppNavigation';
import { COLORS } from '../contants';
import { Drawer } from './components/Drawer';

const HomeDrawer = createDrawerNavigator();

const screenOptions = {
    headerTransparent: true,
    headerTitle: () => null,
    headerTintColor: COLORS.PRIMARY,
    drawerType: 'front',
    drawerStyle: {
        backgroundColor: 'transparent',
        width: '100%'
    }
}

export const HomeDrawerNavigator = () => (
    <HomeDrawer.Navigator
        initialRouteName='Home' 
        screenOptions={screenOptions}
        drawerContent={props => <Drawer {...props} />}>
        <HomeDrawer.Screen name="Home" component={AppNavigation} />
        <HomeDrawer.Screen name="About" component={AboutScreen} />
        <HomeDrawer.Screen name="Ads" component={AdsSettingsScreen} />
    </HomeDrawer.Navigator>
)