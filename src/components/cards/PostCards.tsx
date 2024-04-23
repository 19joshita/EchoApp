import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import theme from '../../defaultCss/Theme';
import ATMInput from '../../atoms/ATMInput/ATMInput';
import {Formik, FormikHelpers} from 'formik';
import {createPostType} from '../../model/auth.model';
import {createPostSchema} from '../../schema/AuthSchema';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import PostProvider from '../../context/postContext';

type Props = {
  posts?: any[];
  onDelete: (postId: string) => void;
};
const PostCards = ({posts, onDelete}: Props) => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const [postId, setPostId] = useState<string>('');
  const [singlePostDetail, setSinglePostDetail] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>('');
  const [updatedDescription, setUpdatedDescription] = useState<string>('');
  const handleDelete = (postId: string) => {
    onDelete(postId);
  };
  const handleGetDetails = async (postId: string) => {
    try {
      const response: any = await axios.get(`/post/${postId}`);
      setPostId(postId);
      setSinglePostDetail(response?.data?.post);
      console.log('get resonse ================>', response?.data?.post);
    } catch (error) {
      console.log(error, 'error during get api');
    }
  };
  const updatePostInitialValue: createPostType = {
    title: singlePostDetail?.title || '',
    description: singlePostDetail?.description || '',
  };

  const handleSubmit = async (
    values: createPostType,
    {resetForm, setSubmitting}: FormikHelpers<createPostType>,
  ) => {
    try {
      setSubmitting(true);
      const response = await axios.put(
        `/post/${singlePostDetail?._id}`,
        values,
      );
      if (response?.data?.message) {
        toast.show(response?.data?.message, {
          type: 'success',
        });
        setSubmitting(false);
        resetForm();
        setIsModalVisible(false);
        navigation.navigate('About');
      }
    } catch (error: any) {
      console.log('error', error);
      toast.show(error?.response?.data?.message, {
        type: 'danger',
      });
      setSubmitting(false);
    }
  };
  useEffect(() => {
    handleGetDetails(postId);
  }, []);

  return (
    <View>
      <View style={styles.container}>
        {posts?.map((item: any) => (
          <View style={styles.cardView} key={item._id}>
            <View style={styles.titleView}>
              <Text style={styles.title}>{item?.title}</Text>
              <View style={styles.buttonView}>
                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(true), handleGetDetails(item._id);
                  }}>
                  <Text style={styles.updateText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.description}>
              {' '}
              {item?.description?.length > 300
                ? item?.description?.substring(0, 300) + '...'
                : item?.description}
            </Text>
            <View style={styles.footer}>
              <Text style={styles.footerText}>{item?.postedBy?.name}</Text>
              <Text style={styles.footerText}>
                {moment(item?.createdAt).format('DD:MM:YYYY')}
              </Text>
            </View>
          </View>
        ))}
        {/* <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        /> */}
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.formTitle}> Update Post</Text>
          <Formik
            initialValues={updatePostInitialValue}
            validationSchema={createPostSchema}
            onSubmit={handleSubmit}
            enableReinitialize>
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={styles.modalColor}>
                <View>
                  <ATMInput
                    label="Name"
                    value={values.title}
                    setValue={handleChange('title')}
                    placeholder="Enter your title"
                    error={errors.title}
                    touched={touched.title}
                  />
                  <ATMInput
                    label="Description"
                    value={values.description}
                    setValue={handleChange('description')}
                    placeholder="Enter description"
                    error={errors.description}
                    touched={touched.description}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <Text style={styles.updateText}>cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text style={styles.updateText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};

export default PostCards;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteText: {
    color: 'red',
  },
  updateText: {
    fontWeight: 'bold',
  },
  cardView: {
    backgroundColor: 'white',
    // borderWidth: 0.1,
    padding: 10,
    margin: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.darkYellowGreen,
    borderBottomWidth: 0.2,
    paddingBottom: 4,
  },
  description: {
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '',
  },
  footerText: {
    fontSize: 16,
    color: theme.colors.darkYellowGreen,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    // alignItems: 'center',
    // margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalColor: {
    margin: 20,
    // backgroundColor: 'gray',
  },
  formTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: theme.colors.darkYellowGreen,
  },
});
