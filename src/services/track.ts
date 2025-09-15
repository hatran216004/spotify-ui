import { LibraryItemList, LibraryItemTrack } from '@/types/libraryItem.type';
import { SuccessResponseApi } from '@/types/response.type';
import { ListTracks, Track } from '@/types/track.type';
import { http } from '@/utils/http';

export const trackServices = {
  getRecommendedTracks: () =>
    http.get<SuccessResponseApi<ListTracks>>('/tracks/recommended'),
  getTopTrendingTracks: () =>
    http.get<SuccessResponseApi<ListTracks>>('/tracks/trending'),
  getTrack: (id: string) =>
    http.get<SuccessResponseApi<{ track: Track }>>(`/tracks/${id}`),
  getMeLikedTracks: () =>
    http.get<SuccessResponseApi<LibraryItemList<LibraryItemTrack>>>(
      '/me/tracks/liked'
    )
};
