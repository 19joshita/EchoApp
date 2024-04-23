import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
const PostContext = createContext<any | null>(null);

const PostProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  console.log('posts', posts);
  // initiaPost
  useEffect(() => {
    const getAllPosts = async () => {
      setIsLoading(true);
      try {
        const response: any = await axios.get('/allPost');
        console.log('data', response);
        setIsLoading(false);
        setPosts(response?.data?.posts);
      } catch (error) {
        console.log(error, 'Error occured during post creation');
        setIsLoading(false);
      }
    };
    getAllPosts();
  }, []);
  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};
export default PostProvider;
export {PostContext};
