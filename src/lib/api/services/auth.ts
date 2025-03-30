import { apiClient } from '../client';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authService = {
  // Login user
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post('/auth/login', data);
  },

  // Register new user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post('/auth/register', data);
  },

  // Logout user
  async logout(): Promise<void> {
    return apiClient.post('/auth/logout');
  },

  // Get current user
  async getCurrentUser(): Promise<AuthResponse['user']> {
    return apiClient.get('/auth/me');
  },

  // Update user profile
  async updateProfile(data: Partial<RegisterRequest>): Promise<AuthResponse['user']> {
    return apiClient.put('/auth/profile', data);
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    return apiClient.post('/auth/forgot-password', { email });
  },

  // Reset password
  async resetPassword(token: string, password: string): Promise<void> {
    return apiClient.post('/auth/reset-password', { token, password });
  },

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    return apiClient.post('/auth/verify-email', { token });
  },

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    return apiClient.post('/auth/resend-verification');
  },

  // Update password
  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    return apiClient.put('/auth/password', { currentPassword, newPassword });
  },
}; 