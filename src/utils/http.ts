/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios';
import { getClerkToken } from './auth';
import { useUserStore } from '@/store/ui.store';

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      // baseURL: 'http://127.0.0.1:3000/api/v1',
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await getClerkToken();
        const tokenFromStore = useUserStore.getState().token; //  for first login /signup

        if (token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        } else if (tokenFromStore) {
          config.headers.Authorization = `Bearer ${tokenFromStore}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }
}

export const http = new Http().instance;
