import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FooterMenu from '../../components/Menus/Footer/FooterMenu';
import {Formik, FormikHelpers} from 'formik';
import ATMInput from '../../atoms/ATMInput/ATMInput';
import {
  createPostInitialValue,
  createPostSchema,
} from '../../schema/AuthSchema';
import {RegiterType, createPostType} from '../../model/auth.model';
import ATMButton from '../../atoms/ATMButton/ATMButton';
import theme from '../../defaultCss/Theme';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Post = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const handleSubmit = async (
    values: createPostType,
    {resetForm, setSubmitting}: FormikHelpers<createPostType>,
  ) => {
    try {
      setSubmitting(true);
      const response = await axios.post(`/createPost`, values);
      if (response?.data?.message) {
        toast.show(response?.data?.message, {
          type: 'success',
        });
        setSubmitting(false);
        resetForm();
      }
    } catch (error: any) {
      console.log('error', error);
      toast.show(error?.response?.data?.message, {
        type: 'danger',
      });
      setSubmitting(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.createText}>Create Post</Text>
          <View style={styles.formView}>
            <Formik
              initialValues={createPostInitialValue}
              validationSchema={createPostSchema}
              onSubmit={handleSubmit}>
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                handleBlur,
                touched,
                isSubmitting,
              }) => (
                <View style={styles.formBody}>
                  <View>
                    <TextInput
                      placeholderTextColor={'gray'}
                      style={styles.inputBox}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values?.title}
                      placeholder="Add Post title."
                    />
                    {touched.title && errors.title && (
                      <Text style={styles.error}>{errors.title}</Text>
                    )}
                  </View>
                  <View>
                    <TextInput
                      style={styles.inputBox}
                      placeholderTextColor={'gray'}
                      placeholder="Add Post description."
                      multiline={true}
                      numberOfLines={5}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    {touched.description && errors.description && (
                      <Text style={styles.error}>{errors.description}</Text>
                    )}
                  </View>
                  <View style={styles.button}>
                    {/* <FontAwesome name="home" style={{fontSize: 30}} /> */}
                    <TouchableOpacity onPress={() => handleSubmit()}>
                      <Text
                        style={{
                          color: 'white',
                          backgroundColor: theme.colors.darkYellowGreen,
                          padding: 10,
                          borderRadius: 10,
                        }}>
                        {isSubmitting ? (
                          <ActivityIndicator size="small" color={''} />
                        ) : (
                          <Text> Create</Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formView: {},
  formBody: {
    marginLeft: 20,
    marginRight: 20,
    gap: 20,
  },

  inputBox: {
    backgroundColor: 'white',
    padding: 10,
    textAlignVertical: 'top',
    borderWidth: 0.2,
    borderColor: 'gray',
    borderRadius: 5,
  },
  createText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.darkYellowGreen,
    padding: 20,
  },
  button: {
    alignItems: 'center',
    color: theme.colors.white,
  },
  error: {
    color: 'red',
  },
});
