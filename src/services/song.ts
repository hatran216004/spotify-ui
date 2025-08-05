import { SuccessResponseApi } from '@/types/response.type';
import { ListSongs } from '@/types/song.type';
import { http } from '@/utils/http';

export const songServices = {
  getRecommendedSongs: () =>
    http.get<SuccessResponseApi<ListSongs>>('/songs/recommended')
};
