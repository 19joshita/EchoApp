import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../auth/Registers';
import Login from '../auth/Login';
import Home from '../screens/Home/Home';
import {AuthContext} from '../context/authContext';
import HeaderMenu from '../components/Menus/Header/HeaderMenu';
const Stack = createNativeStackNavigator();
const ScreenMenu = () => {
  //globalState
  const [authData] = useContext(AuthContext);
  const authenticateUser = authData?.user && authData?.token;
  const initialRouteName = authenticateUser ? 'Home' : 'Login';
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {/* <Stack.Screen
        name={'Login'}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Register'}
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{title: 'Home123', headerRight: () => <HeaderMenu />}}
      /> */}
      <>
        {authenticateUser ? (
          <>
            <Stack.Screen
              name={'Home'}
              component={Home}
              options={{title: 'Home123', headerRight: () => <HeaderMenu />}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={'Login'}
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'Register'}
              component={Register}
              options={{headerShown: false}}
            />
          </>
        )}
      </>
    </Stack.Navigator>
  );
};

export default ScreenMenu;
