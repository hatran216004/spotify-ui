import * as yup from 'yup';
import { isEmailOrUserName, isUsername } from './helpers';

export const loginSchema = yup.object().shape({
  email_username: yup
    .string()
    .required('This field is required')
    .test(
      'is-email-or-username',
      'Invalid email or username',
      isEmailOrUserName
    ),
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password need at least 8 characters')
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('This field is required')
    .test('is-username', 'Invalid username', isUsername),
  email: yup
    .string()
    .required('This field is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password need at least 8 characters'),
  confirm_password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password confirm need at least 8 characters')
    .oneOf(
      [yup.ref('password')],
      'Password and confirm password does not match'
    )
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type LoginSchema = yup.InferType<typeof loginSchema>;
