// Common API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone?: string;
  };
}

// Business Types
export interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  category: string;
  images: string[];
  rating: number;
  reviews: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessCreateRequest {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  category: string;
  images?: string[];
}

export interface BusinessUpdateRequest extends Partial<BusinessCreateRequest> {
  id: string;
}

// Review Types
export interface Review {
  id: string;
  businessId: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewCreateRequest {
  businessId: string;
  rating: number;
  comment: string;
  images?: string[];
}

// Search Types
export interface SearchParams {
  query?: string;
  category?: string;
  location?: string;
  page?: number;
  limit?: number;
  sort?: 'rating' | 'reviews' | 'newest' | 'oldest';
}

export interface SearchResponse {
  businesses: Business[];
  total: number;
  page: number;
  totalPages: number;
} 