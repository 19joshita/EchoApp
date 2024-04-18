import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContextType, AuthData, ContextType} from '../model/auth.model';
import axios from 'axios';
// Create the AuthContext
const AuthContext = createContext<any | null>(null);

// Define the AuthProvider component
const AuthProvider = ({children}: ContextType) => {
  const initialAuthData: AuthData = {
    user: null,
    token: '',
  };
  // Create a state for authentication data
  const [authData, setAuthData] = useState<AuthData>(initialAuthData);
  axios.defaults.baseURL = 'http://192.168.29.101:8000/api/v1';
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

  // Function to handle logout
  const logout = async () => {
    try {
      // Clear authentication data from AsyncStorage
      await AsyncStorage.removeItem('@auth');
      // Reset the state
      setAuthData(initialAuthData);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Provide the authentication data and functions to the context
  return (
    <AuthContext.Provider value={[authData, setAuthData, logout]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export {AuthContext};
