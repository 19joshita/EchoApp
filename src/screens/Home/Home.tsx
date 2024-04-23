import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import FooterMenu from '../../components/Menus/Footer/FooterMenu';
import {PostContext} from '../../context/postContext';
import PostCards from '../../components/cards/PostCards';
const Home = ({navigation}: any) => {
  const [posts] = useContext(PostContext);
  console.log('posts============================', posts);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCards posts={posts} />
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
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
