import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
const PostContext = createContext<any | null>(null);

const PostProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  console.log('posts', posts);
  // initiaPost
  const getAllPosts = async () => {
    setIsLoading(true);
    try {
      const response: any = await axios.get('/allPost');
      console.log('data', response);
      setPosts(response?.data?.posts);
      setIsLoading(false);
    } catch (error) {
      console.log(error, 'Error occured during post creation');
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};
export default PostProvider;
export {PostContext};
