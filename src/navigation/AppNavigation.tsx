import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import HeaderMenu from '../components/Menus/Header/HeaderMenu';
import Login from '../auth/Login';
import Register from '../auth/Registers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Account from '../screens/Account/Account';
import Post from '../screens/post/Post';
import About from '../screens/about/About';
import theme from '../defaultCss/Theme';
import AuthProvider, {AuthContext} from '../context/authContext';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const [authData] = useContext(AuthContext);
  const initiaState = authData?.token !== null ? 'Home' : 'Login';
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',

          headerRight: () => <HeaderMenu />,
          headerTintColor: theme.colors.white,
          headerStyle: {
            backgroundColor: theme.colors.darkYellowGreen,
          },
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
{
  /* {authData?.token && (
          // User is authenticated, show the Home screen
          <></>
        )}
        {authData?.token === null && <></>} */
}
