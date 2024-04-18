import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import FooterMenu from '../Footer/FooterMenu';
import {AuthContext} from '../../context/authContext';

const Home = () => {
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.top}>Top</Text>
      <Text style={styles.center}>{JSON.stringify(state)}</Text>
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
