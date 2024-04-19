import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import theme from '../../../defaultCss/Theme';

const FooterMenu = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity>
        {/* <AntDesign name="home" style={styles.icon} /> */}
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>About</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>WishList</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterMenu;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    // backgroundColor: theme.colors.darkYellowGreen,
    // color: theme.colors.white,
  },
  icon: {},
});
