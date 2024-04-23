import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {ToastProvider} from 'react-native-toast-notifications';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/context/authContext';
import PostProvider from './src/context/postContext';

// import 'react-native-gesture-handler'

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <PostProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </PostProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
