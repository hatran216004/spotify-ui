import { useAuth } from '@clerk/clerk-react';
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios';

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://127.0.0.1:3000/api/v1',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const { getToken } = useAuth();
        const token = await getToken();
        if (token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }
}

export const http = new Http().instance;
