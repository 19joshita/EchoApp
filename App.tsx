import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {ToastProvider} from 'react-native-toast-notifications';

// import 'react-native-gesture-handler'

const App = () => {
  return (
    <ToastProvider>
      <AppNavigation />
    </ToastProvider>
  );
};

export default App;
