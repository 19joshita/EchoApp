import {ScrollView, StyleSheet, Text, View, RefreshControl} from 'react-native';
import React, {useContext, useState, useCallback} from 'react';
import FooterMenu from '../../components/Menus/Footer/FooterMenu';
import {PostContext} from '../../context/postContext';
import PostCards from '../../components/cards/PostCards';
const Home = ({navigation}: any) => {
  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  console.log('posts============================', posts);
  //refred

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <PostCards posts={posts} onDelete={() => {}} />
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
