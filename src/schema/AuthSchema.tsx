import * as Yup from 'yup';
import {LoginType, RegiterType, createPostType} from '../model/auth.model';

//Register
export const authInitialValues: RegiterType = {
  name: '',
  email: '',
  password: '',
  confirmpassword: '',
};
export const updateUserInitialValues = {
  name: '',
  email: '',
  password: '',
  confirmpassword: '',
};
export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
//Login
export const loginInitialValues: LoginType = {
  email: '',
  password: '',
};
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
export const updateSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
export const createPostInitialValue: createPostType = {
  title: '',
  description: '',
};
export const createPostSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});
