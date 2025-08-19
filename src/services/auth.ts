/* eslint-disable @typescript-eslint/no-explicit-any */
import { SuccessResponseApi } from '@/types/response.type';
import { User } from '@/types/user.type';
import { http } from '@/utils/http';

type AuthData = {
  email: string | null;
  username: string | null;
  clerkId: string | undefined;
  avatarUrl?: string;
};

export const authServices = {
  callbackRegister: (data: AuthData) =>
    http.post<SuccessResponseApi<{ user: User }>>(
      '/auth/callback-register',
      data
    ),
  callbackLogin: (data: Omit<AuthData, 'clerkId'>) =>
    http.post<SuccessResponseApi<{ user: User }>>('/auth/callback-login', data),
  callbackSSO: (data: AuthData) =>
    http.post<SuccessResponseApi<{ user: User }>>('/auth/callback-sso', data)
};
