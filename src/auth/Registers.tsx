import {Alert, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import theme from '../defaultCss/Theme';
import ATMInput from '../atoms/ATMInput/ATMInput';
import ATMButton from '../atoms/ATMButton/ATMButton';
import {Formik, FormikHelpers} from 'formik';
import {authInitialValues, registerSchema} from '../schema/AuthSchema';
import {RegiterType} from '../model/auth.model';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';

const Register = ({navigation}: any) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const Baseurl = process.env.BASE_URL;
  const handleSubmit = async (
    values: RegiterType,
    {resetForm, setSubmitting}: FormikHelpers<RegiterType>,
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/auth/register`, values);
      if (response?.data?.message) {
        toast.show(response?.data?.message, {
          type: 'success',
        });
        setIsLoading(false);
        resetForm();
        navigation.navigate('Login');
      }
    } catch (error: any) {
      console.log(error.response.data.message, 'error');
      toast.show(error.response.data.message, {
        type: 'danger',
      });
      setIsLoading(false);
    }
  };
  return (
    <ImageBackground
      style={styles.imagebackground}
      source={require('./../assets/book/bookImage01.jpg')}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Formik
          initialValues={authInitialValues}
          // validationSchema={registerSchema}`
          onSubmit={handleSubmit}>
          {({handleSubmit, handleChange, values, errors, touched}) => (
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
              <ATMInput
                label={'Confirm Password'}
                value={values?.confirmpassword}
                secureTextEntry={true}
                setValue={handleChange('confirmpassword')}
                // autoComplete={''}
                error={errors.confirmpassword}
                touched={touched.confirmpassword}
                placeholder="Set Password same as password"
              />
              <ATMButton
                title={'Submit'}
                loading={isLoading}
                handleSubmit={handleSubmit}
              />
            </View>
          )}
        </Formik>
        <Text style={styles.paragraph}>
          Already Register Please{' '}
          <Text
            onPress={() => navigation.push('Login')}
            style={styles.loginText}>
            LOGIN
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};
export default Register;

const styles = StyleSheet.create({
  imagebackground: {
    flex: 1,
    resizeMode: 'cover',
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
