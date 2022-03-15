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
import FiltersScreen from '../screens/main_flow/FiltersScreen';
import RatingsProfileScreen from '../screens/profile_tabs/RatingsProfileScreen';
import MyPostsProfileScreen from '../screens/profile_tabs/MyPostsProfileScreen';
import PostsInterestedProfileScreen from '../screens/profile_tabs/PostsInterestedProfileScreen';
import InterestedInMeProfileScreen from '../screens/profile_tabs/InterestedInMeProfileScreen';
import RequestsProfileScreen from '../screens/profile_tabs/RequestsProfileScreen';
import PostPreviewScreen from '../screens/main_flow/PostPreviewScreen';

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
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.FILTERS_SCREEN}
            component={FiltersScreen} />
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.RATINGS_PROFILE_SCREEN}
            component={RatingsProfileScreen} />
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.MYPOSTS_PROFILE_SCREEN}
            component={MyPostsProfileScreen} />
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.POSTS_INTERESTED_PROFILE_SCREEN}
            component={PostsInterestedProfileScreen} />
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.POSTS_INTERESTED_IN_ME_PROFILE_SCREEN}
            component={InterestedInMeProfileScreen} />
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.REQUESTS_PROFILE_SCREEN}
            component={RequestsProfileScreen} />
        <Stack.Screen
            options={{ headerShown: false }}
            name={routes.POST_PREVIEW_SCREEN}
            component={PostPreviewScreen} />


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