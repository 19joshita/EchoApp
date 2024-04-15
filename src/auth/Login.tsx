import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import theme from '../defaultCss/Theme';
import ATMInput from '../atoms/ATMInput/ATMInput';
import ATMButton from '../atoms/ATMButton/ATMButton';
import {Formik, FormikHelpers} from 'formik';
import {authSchema, loginInitialValues} from '../schema/AuthSchema';
import {LoginType} from '../model/auth.model';

const Login = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = (
    values: LoginType,
    {resetForm, setSubmitting}: FormikHelpers<LoginType>,
  ) => {
    console.log(values, 'values');
    resetForm();
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
          validationSchema={authSchema}
          onSubmit={handleSubmit}>
          {({handleSubmit, handleChange, values, errors, touched}) => (
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
                loading={isLoading}
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
