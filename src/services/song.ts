import { SuccessResponseApi } from '@/types/response.type';
import { ListSongs, Song } from '@/types/song.type';
import { http } from '@/utils/http';

export const songServices = {
  getRecommendedSongs: () =>
    http.get<SuccessResponseApi<ListSongs>>('/songs/recommended'),
  getTopTrendingSongs: () =>
    http.get<SuccessResponseApi<ListSongs>>('/songs/trending'),
  getSong: (id: string) =>
    http.get<SuccessResponseApi<{ song: Song }>>(`/songs/${id}`)
};
