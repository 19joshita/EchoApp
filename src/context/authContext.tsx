import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContextType, AuthData, ContextType} from '../model/auth.model';
import axios from 'axios';
// Create the AuthContext
const AuthContext = createContext<any | null>(null);

// Define the AuthProvider component
const AuthProvider = ({children}: ContextType) => {
  // Create a state for authentication data
  const [authData, setAuthData] = useState<AuthData>({
    user: null,
    token: '',
  });
  axios.defaults.baseURL = 'http://192.168.29.111:8000/api/v1';
  useEffect(() => {
    const getAsyncStorageData = async () => {
      try {
        const userData: any = await AsyncStorage.getItem('@auth');
        // console.log('local storage data ====>', userData);
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

  // Provide the authentication data and functions to the context
  return (
    <AuthContext.Provider value={[authData, setAuthData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export {AuthContext};
