/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from '@/utils/http';

export const searchServices = {
  // Smart search - tìm kiếm thông minh theo priority
  search: (query: any, options = {}) => {
    const params = new URLSearchParams({
      q: query,
      ...options
    });
    return http.get(`/search?${params}`);
  },

  // Search all types - tìm kiếm tất cả loại cùng lúc
  searchAll: (query: any, limit = 5) => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      includeAll: 'true'
    });
    return http.get(`/search?${params}`);
  },

  // Advanced search - tìm kiếm nâng cao
  advancedSearch: (
    criteria:
      | string
      | string[][]
      | Record<string, string>
      | URLSearchParams
      | undefined,
    limit = 20
  ) => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(criteria as any)
    });
    return http.get(`/search/advanced?${params}`);
  },

  // Autocomplete suggestions
  autocomplete: (query: any, options = {}) => {
    const params = new URLSearchParams({
      q: query,
      limit: '5',
      ...options
    });
    return http.get(`/search/autocomplete?${params}`);
  },

  // Get search statistics
  getStats: () => {
    return http.get('/search/stats');
  },

  // Clear search cache
  clearCache: (pattern = '*') => {
    const params = new URLSearchParams({ pattern });
    return http.delete(`/search/cache?${params}`);
  }
};
