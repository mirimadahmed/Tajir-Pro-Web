import type { ApiError } from '../types';

export class ApiException extends Error {
  public status: number;
  public code?: string;
  public errors?: Record<string, string[]>;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiException';
    this.status = error.status;
    this.code = error.code;
    this.errors = error.errors;
  }
}

export const handleApiError = (error: unknown): ApiException => {
  if (error instanceof ApiException) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiException({
      message: error.message,
      status: 500,
    });
  }

  return new ApiException({
    message: 'An unexpected error occurred',
    status: 500,
  });
};

export const isApiError = (error: unknown): error is ApiException => {
  return error instanceof ApiException;
}; 