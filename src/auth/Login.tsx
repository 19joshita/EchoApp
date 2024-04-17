import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import theme from '../defaultCss/Theme';
import ATMInput from '../atoms/ATMInput/ATMInput';
import ATMButton from '../atoms/ATMButton/ATMButton';
import {Formik, FormikHelpers} from 'formik';
import {loginInitialValues, loginSchema} from '../schema/AuthSchema';
import {LoginType} from '../model/auth.model';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';

const Login = ({navigation}: any) => {
  const toast = useToast();

  const handleSubmit = async (
    values: LoginType,
    {resetForm, setSubmitting}: FormikHelpers<LoginType>,
  ) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        `http://192.168.29.111:8000/api/v1/auth/login`,
        values,
      );
      console.log(response);
      if (response?.data?.message) {
        toast.show(response?.data?.message, {
          type: 'success',
        });
        setSubmitting(false);
        resetForm();
      }
    } catch (error: any) {
      console.log(error.response.data.message, 'error');
      toast.show(error.response.data.message, {
        type: 'danger',
      });
      setSubmitting(false);
    }
  };
  return (
    <ImageBackground
      style={styles.imagebackground}
      source={require('./../assets/book/bookImage01.jpg')}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}>
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
              <ATMButton
                title={'Submit'}
                loading={isSubmitting}
                handleSubmit={handleSubmit}
              />
            </View>
          )}
        </Formik>
        <Text style={styles.paragraph}>
          For Register Please{' '}
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.loginText}>
            REGISTER
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};
``;

export default Login;

const styles = StyleSheet.create({
  imagebackground: {
    flex: 1,
    // resizeMode: 'cover',
  },
  container: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.darkYellowGreen,
    marginBottom: 10,
  },
  inputView: {
    marginHorizontal: 30,
  },
  text: {
    color: 'white',
  },
  paragraph: {
    textAlign: 'center',
    paddingTop: 10,
    color: theme.colors.darkYellowGreen,
  },
  loginText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: theme.colors.yellowPrimary,
  },
});