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
    </Stack.Navigator>
);
const MainTabStack = () => (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
        <Tab.Screen

            name={routes.SEARCH_ROUTE_SCREEN}
            component={SearchRouteScreen}
            options={{
                options: { headerShown: false },
                tabBarLabel: 'Αναζήτηση',
                tabBarColor: colors.colorPrimary,
                tabBarIcon: ({ focused, color }) => (
                    <Icon name="ios-home" color={focused ? colors.colorPrimary : color} size={26} />
                ),
            }} />
        <Tab.Screen

            name={routes.CREATE_POST_SCREEN}
            component={CreatePostScreen}
            options={{
                options: { headerShown: false },
                tabBarLabel: 'Δημιουργία Post',
                tabBarColor: colors.colorPrimary,
                tabBarIcon: ({ focused, color }) => (
                    <Icon name="ios-home" color={focused ? colors.colorPrimary : color} size={26} />
                ),
            }} />
    </Tab.Navigator >
);

export default HomeStack;