import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {AboutScreen, AdsSettingsScreen} from '../screens';
import {AppNavigation} from './AppNavigation';
import { COLORS } from '../contants';
import { Drawer } from './components/Drawer';
import { ReloadButton } from './components/ReloadHeaderButton';

const HomeDrawer = createDrawerNavigator();

const screenOptions = {
    headerTransparent: true,
    headerTitle: () => null,
    headerTintColor: COLORS.PRIMARY,
    headerStyle: {
        marginTop: 10,
    },
    drawerType: 'front',
    drawerStyle: {
        backgroundColor: 'transparent',
        width: '100%'
    },
    headerRight: () => <ReloadButton name="add" color="white" />
}

export const HomeDrawerNavigator = () => (
    <HomeDrawer.Navigator
        initialRouteName='Home' 
        screenOptions={{...screenOptions}}
        drawerContent={props => <Drawer {...props} />}>
        <HomeDrawer.Screen name="Home" component={AppNavigation} />
        <HomeDrawer.Screen name="About" component={AboutScreen} />
        <HomeDrawer.Screen name="Ads" component={AdsSettingsScreen} />
    </HomeDrawer.Navigator>
)