import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../auth/Registers';
import Login from '../auth/Login';
import Home from '../screens/Home/Home';
import {AuthContext} from '../context/authContext';
const ScreenMenu = () => {
  const Stack = createNativeStackNavigator();
  //globalState
  const [authData] = useContext(AuthContext);
  console.log(authData, 'authData');
  const authenticateUser = authData?.user && authData?.token;
  return (
    <Stack.Navigator initialRouteName="Home">
      {authenticateUser ? (
        <>
          <Stack.Screen
            name={'Home'}
            component={Home}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={'Register'}
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
