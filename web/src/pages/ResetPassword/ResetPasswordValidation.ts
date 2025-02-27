import * as Yup from 'yup';

export const ResetPasswordValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});