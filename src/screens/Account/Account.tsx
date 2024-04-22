import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import FooterMenu from '../../components/Menus/Footer/FooterMenu';
import {AuthContext} from '../../context/authContext';
import {Formik, FormikHelpers} from 'formik';
import ATMInput from '../../atoms/ATMInput/ATMInput';
import {
  authInitialValues,
  registerSchema,
  updateSchema,
} from '../../schema/AuthSchema';
import axios from 'axios';
import {RegiterType} from '../../model/auth.model';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import ATMButton from '../../atoms/ATMButton/ATMButton';

const Account = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const [authData] = useContext(AuthContext);
  const updateUserInitialValues: any = {
    name: authData?.user?.name,
    email: authData?.user?.email,
    password: '',
  };
  const handleSubmit = async (
    values: RegiterType,
    {resetForm, setSubmitting}: FormikHelpers<RegiterType>,
  ) => {
    try {
      setSubmitting(true);
      const response = await axios.put(
        `http://192.168.29.111:8000/api/v1/auth/updateUser`,
        values,
      );
      if (response?.data?.message) {
        toast.show(response?.data?.message, {
          type: 'success',
        });
        setSubmitting(false);
        resetForm();
        navigation.navigate('Home');
      }
    } catch (error: any) {
      toast.show(error.response.data.message, {
        type: 'danger',
      });
      setSubmitting(false);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/profile.png')}
        style={styles.profile}
      />
      <Text style={styles.warningText}>
        Certainly! you can only update your name and password.
      </Text>
      <View style={styles.formbody}>
        <Formik
          initialValues={updateUserInitialValues}
          validationSchema={updateSchema}
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
            <View style={styles.inputView}>
              <ATMInput
                label="Name"
                value={values.name}
                setValue={handleChange('name')}
                placeholder="Enter your name"
                error={errors.name}
                touched={touched.name}
              />
              <ATMInput
                label="Email"
                keyboardType="email-address"
                autoComplete={'email'}
                value={values.email}
                setValue={handleChange('email')}
                error={errors.email}
                touched={touched.email}
                placeholder="Enter Your Email"
              />
              <ATMInput
                label={'Password'}
                value={values?.password}
                secureTextEntry={true}
                setValue={handleChange('password')}
                autoComplete={'password'}
                error={errors.password}
                touched={touched.password}
                placeholder="Set your password"
              />
              {/* <ATMInput
                label={'Confirm Password'}
                value={values?.confirmpassword}
                secureTextEntry={true}
                setValue={handleChange('confirmpassword')}
                // autoComplete={''}
                error={errors.confirmpassword}
                touched={touched.confirmpassword}
                placeholder="Set Password same as password"
              /> */}
              <ATMButton
                title={'Submit'}
                loading={isSubmitting}
                handleSubmit={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
      <FooterMenu />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    width: 200,
    height: 200,
    margin: 10,
  },
  inputView: {},
  formbody: {
    margin: 20,
  },
  warningText: {
    color: 'red',
    margin: 10,
    fontSize: 20,
  },
});
