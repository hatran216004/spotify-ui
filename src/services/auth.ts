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
  callbackSSO: (data: AuthData) =>
    http.post<SuccessResponseApi<{ user: User }>>('/auth/callback-sso', data)
};
