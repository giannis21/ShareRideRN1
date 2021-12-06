import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './src/stacks/AuthStack';
  
function App() {
  return (
    <NavigationContainer>
       <AuthStack />
    </NavigationContainer>
  );
}

export default App;