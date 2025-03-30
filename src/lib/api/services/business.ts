import { apiClient } from '../client';
import type {
  Business,
  BusinessCreateRequest,
  BusinessUpdateRequest,
  PaginatedResponse,
  SearchParams,
  SearchResponse,
} from '../types';

export const businessService = {
  // Get all businesses with pagination
  async getBusinesses(params: SearchParams): Promise<PaginatedResponse<Business[]>> {
    return apiClient.get('/businesses', { params });
  },

  // Get a single business by ID
  async getBusiness(id: string): Promise<Business> {
    return apiClient.get(`/businesses/${id}`);
  },

  // Create a new business
  async createBusiness(data: BusinessCreateRequest): Promise<Business> {
    return apiClient.post('/businesses', data);
  },

  // Update an existing business
  async updateBusiness(data: BusinessUpdateRequest): Promise<Business> {
    return apiClient.put(`/businesses/${data.id}`, data);
  },

  // Delete a business
  async deleteBusiness(id: string): Promise<void> {
    return apiClient.delete(`/businesses/${id}`);
  },

  // Search businesses
  async searchBusinesses(params: SearchParams): Promise<SearchResponse> {
    return apiClient.get('/businesses/search', { params });
  },

  // Get businesses by category
  async getBusinessesByCategory(category: string, page = 1): Promise<PaginatedResponse<Business[]>> {
    return apiClient.get('/businesses/category', {
      params: { category, page },
    });
  },

  // Get businesses by location
  async getBusinessesByLocation(location: string, page = 1): Promise<PaginatedResponse<Business[]>> {
    return apiClient.get('/businesses/location', {
      params: { location, page },
    });
  },

  // Get featured businesses
  async getFeaturedBusinesses(): Promise<Business[]> {
    return apiClient.get('/businesses/featured');
  },

  // Get trending businesses
  async getTrendingBusinesses(): Promise<Business[]> {
    return apiClient.get('/businesses/trending');
  },
}; 