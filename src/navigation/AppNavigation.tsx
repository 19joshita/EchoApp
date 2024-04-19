import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import HeaderMenu from '../components/Menus/Header/HeaderMenu';
import Login from '../auth/Login';
import Register from '../auth/Registers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthData} from '../model/auth.model';
import Account from '../screens/Account/Account';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const [authData, setAuthData] = useState<AuthData>({
    user: null,
    token: null,
  });
  console.log(authData?.token, 'authData');
  useEffect(() => {
    const getAsyncStorageData = async () => {
      try {
        const userData: any = await AsyncStorage.getItem('@auth');
        console.log('local storage data ====>', userData);
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setAuthData({
            user: parsedUserData?.user,
            token: parsedUserData?.accessToken,
          });
        }
      } catch (error) {
        console.error('Error getting data from AsyncStorage:', error);
      }
    };
    getAsyncStorageData();
  }, []);
  const initiaState = authData?.token !== null ? 'Home' : 'Login';
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'welcome', headerRight: () => <HeaderMenu />}}
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
    </NavigationContainer>
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
