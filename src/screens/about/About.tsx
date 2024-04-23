import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FooterMenu from '../../components/Menus/Footer/FooterMenu';
import axios from 'axios';
import PostCards from '../../components/cards/PostCards';

const About = () => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [userPost, setUserPost] = useState<any[]>([]);
  useEffect(() => {
    getUserPost();
  }, []);
  const getUserPost = async () => {
    setIsLoading(true);
    try {
      const response: any = await axios.get('/user-post');
      console.log('my post resonse ================>', response);
      setUserPost(response?.data?.UserPost);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleDelete = async (postId: any) => {
    // Show alert to confirm deletion
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await axios.delete(`/delete-post/${postId}`);
              if (response.status === 200) {
                // Filter out the deleted post from the userPost array
                const updatedPosts = userPost.filter(
                  post => post._id !== postId,
                );
                setUserPost(updatedPosts);
              }
            } catch (error) {
              console.error('Error deleting post:', error);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCards posts={userPost} onDelete={handleDelete} />
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
