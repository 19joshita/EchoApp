import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Register from '../auth/Registers';
import Login from '../auth/Login';
import Home from '../screens/Home/Home';
import AuthProvider from '../context/authContext';
import ScreenMenu from './ScreenMenu';
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreenMenu />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default AppNavigation;
