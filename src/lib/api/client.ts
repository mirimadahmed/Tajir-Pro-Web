import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiError } from './types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Get token from localStorage or your auth state management
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && originalRequest) {
          // Clear token and redirect to login
          localStorage.removeItem('auth_token');
          window.location.href = '/auth/login';
        }

        // Handle other errors
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const apiError: ApiError = {
            message: error.response.data?.message || 'An error occurred',
            code: error.response.data?.code,
            status: error.response.status,
            errors: error.response.data?.errors,
          };
          return Promise.reject(apiError);
        } else if (error.request) {
          // The request was made but no response was received
          return Promise.reject({
            message: 'Network error occurred',
            status: 0,
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          return Promise.reject({
            message: error.message,
            status: 0,
          });
        }
      }
    );
  }

  // Generic GET request
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // Generic POST request
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Generic PUT request
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  // Generic DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Generic PATCH request
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(); 