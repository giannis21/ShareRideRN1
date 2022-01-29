
// import { AppRegistry } from 'react-native';
// import React from 'react';
// import App from './App';
// import { name as appName } from './app.json';
// import { Provider } from 'react-redux';
// import configureStore from './src/configureStore';

// const store = configureStore()

// const RNRedux = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )


import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);


// // import 'react-native-gesture-handler';
// // import { registerRootComponent } from 'expo';

// // import App from './App';

// // // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // // It also ensures that whether you load the app in Expo Go or in a native build,
// // // the environment is set up appropriately
// // registerRootComponent(App);
