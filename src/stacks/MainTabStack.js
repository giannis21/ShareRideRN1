import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { routes } from '../navigation/RouteNames';
import CreatePostScreen from '../screens/main_flow/CreatePostScreen';
import SearchRouteScreen from '../screens/main_flow/search_route/SearchRouteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/Colors';
const Tab = createMaterialBottomTabNavigator();



const MainTabStack = () => (
    <Tab.Navigator>
        <Tab.Screen

            name={routes.SEARCH_ROUTE_SCREEN}
            component={SearchRouteScreen}
            options={{
                options: { headerShown: false },
                tabBarLabel: 'Αναζήτηση',
                tabBarColor: '#009387',
                tabBarOptions: {
                    style: { backgroundColor: '#f9f9f9', }
                },

                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={26} />
                ),
            }} />
        <Tab.Screen

            name={routes.CREATE_POST_SCREEN}
            component={CreatePostScreen}
            options={{
                options: { headerShown: false },
                tabBarLabel: 'Δημιουργία Post',
                tabBarColor: '#009387',
                tabBarOptions: {
                    style: { backgroundColor: colors.colorPrimary }
                },
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={26} />
                ),
            }} />
    </Tab.Navigator>
);

export default MainTabStack;