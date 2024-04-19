import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {ToastProvider} from 'react-native-toast-notifications';
import {NavigationContainer} from '@react-navigation/native';
// import 'react-native-gesture-handler'

const App = () => {
  return (
    <ToastProvider>
      <AppNavigation />
      {/* <NavigationContainer>
        <AppNavigation />
      </NavigationContainer> */}
    </ToastProvider>
  );
};

export default App;
