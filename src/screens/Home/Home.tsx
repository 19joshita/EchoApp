import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import FooterMenu from '../../components/Menus/Footer/FooterMenu';
const Home = ({navigation}: any) => {
  // const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Screen</Text>
      <FooterMenu />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    backgroundColor: 'yellow',
  },
  center: {
    backgroundColor: 'blue',
  },
  botton: {
    backgroundColor: 'red',
  },
});
