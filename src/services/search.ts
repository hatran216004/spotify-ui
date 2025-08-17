import { SuccessResponseApi } from '@/types/response.type';
import { SearchAll } from '@/types/search.type';
import { http } from '@/utils/http';

export const searchServices = {
  searchAll: (query: string) =>
    http.get<SuccessResponseApi<SearchAll>>('/search', {
      params: {
        q: query
      }
    })
};
