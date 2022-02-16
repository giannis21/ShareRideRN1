import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { routes } from '../navigation/RouteNames';
import CreatePostScreen from '../screens/main_flow/CreatePostScreen';
import SearchRouteScreen from '../screens/main_flow/search_route/SearchRouteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/Colors';
import ProfileScreen from '../screens/main_flow/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import PreviewInterestedInMeScreen from '../screens/profile_tabs/PreviewInterestedInMeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/main_flow/SettingsScreen';
import RestorePasswordScreen from '../screens/RestorePasswordScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.MAIN_TAB_STACK}
            component={MainTabStack} />
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.PROFILE_SCREEN}
            component={ProfileScreen} />

        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.SETTINGS_SCREEN}
            component={SettingsScreen} />
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.PREVIEW_INTERESTED_IN_ME_SCREEN}
            component={PreviewInterestedInMeScreen} />

        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.RESTORE_PASSWORD_SCREEN}
            component={RestorePasswordScreen} />


    </Stack.Navigator>
);
const MainTabStack = () => (
    <Tab.Navigator tabBar={(props) => <TabBar  {...props} />}
        screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
        <Tab.Screen

            initialParams={{ icon: 'ios-home' }}
            name={"Αναζήτηση"}
            component={SearchRouteScreen}
        />
        <Tab.Screen

            initialParams={{ icon: 'ios-home' }}
            name={"Δημιουργία post"}
            component={CreatePostScreen}
        />
    </Tab.Navigator >
);
const getTabBarVisibility = (route) => {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';

    // if (routeName === 'CameraView') {
    //return false;
    //}

    return true;
}
export default HomeStack;