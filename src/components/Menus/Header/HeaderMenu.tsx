import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import AuthProvider, {AuthContext} from '../../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {tokens} from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
const HeaderMenu = ({navigation}: any) => {
  return (
    <View>
      <TouchableOpacity>
        <Image
          source={require('./../../../assets/iconImage/logout.png')}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
  },
});
