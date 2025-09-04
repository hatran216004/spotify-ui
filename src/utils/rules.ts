import * as yup from 'yup';
import { isEmailOrUserName, isUsername, isValidFileType } from './helpers';
import { MAX_FILE_SIZE } from '@/config/constant';

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
    .test('is-username', 'Invalid username', isUsername)
    .trim(),
  email: yup
    .string()
    .required('This field is required')
    .email('Please enter a valid email')
    .trim(),
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password need at least 8 characters')
    .trim(),
  confirm_password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password confirm need at least 8 characters')
    .trim()
    .oneOf(
      [yup.ref('password')],
      'Password and confirm password does not match'
    )
});

export const updatePlaylistSchema = yup.object().shape({
  name: yup.string().required('Playlist name is required').trim(),
  description: yup.string().notRequired().defined().nullable().trim(),
  coverImage: yup
    .mixed<FileList>()
    .notRequired()
    .defined()
    .nullable()
    .test('is-valid-type', 'Not a valid type image', (value) => {
      const file = (value as FileList).item(0);
      return !file || isValidFileType(file.name, 'image');
    })
    .test('is-valid-size', 'Max allowed size is 1 Mega byte', (value) => {
      const file = (value as FileList).item(0);
      return !file || file.size <= MAX_FILE_SIZE;
    })
});

export type UpdatePlaylistSchema = yup.InferType<typeof updatePlaylistSchema>;
export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type LoginSchema = yup.InferType<typeof loginSchema>;
