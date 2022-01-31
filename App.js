import * as React from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './src/stacks/AuthStack';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { routes } from './src/navigation/RouteNames';
//import MainTabStack from './src/stacks/MainTabStack';
import HomeStack from './src/stacks/MainTabStack';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore'
let Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

function App() {
  return (
    <Provider store={configureStore}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name={routes.AUTHSTACK} component={AuthStack} />
          <Stack.Screen name={routes.HOMESTACK} component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>



  );
}

export default App;