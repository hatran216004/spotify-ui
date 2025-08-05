/* eslint-disable @typescript-eslint/no-explicit-any */
import { SuccessResponseApi } from '@/types/response.type';
import { User } from '@/types/user.type';
import { http } from '@/utils/http';

type LoginRegisterTypes = {
  email: string | null;
  username: string | null;
  clerkId: string | undefined;
};

export const authServices = {
  callbackRegister: (data: LoginRegisterTypes) =>
    http.post<SuccessResponseApi<{ user: User }>>(
      '/auth/callback-register',
      data
    ),
  callbackLogin: (data: Omit<LoginRegisterTypes, 'clerkId'>) =>
    http.post<SuccessResponseApi<{ user: User }>>('/auth/callback-login', data)
};
