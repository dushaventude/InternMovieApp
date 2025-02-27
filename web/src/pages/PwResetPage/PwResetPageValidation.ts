import * as Yup from 'yup';

export const LoginPageValidation = Yup.object({
  username: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export const PwResetPageValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});