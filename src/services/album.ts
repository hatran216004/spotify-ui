/* eslint-disable @typescript-eslint/no-explicit-any */
import { Album, AlbumDetail, ListAlbums } from '@/types/album.type';
import { LibraryItemAlbum, LibraryItemList } from '@/types/libraryItem.type';
import { SuccessResponseApi } from '@/types/response.type';
import { http } from '@/utils/http';

export const albumServices = {
  getPopularAlbums: () =>
    http.get<SuccessResponseApi<ListAlbums>>('/albums/popular'),
  getAlbum: (id: string) =>
    http.get<SuccessResponseApi<{ album: AlbumDetail }>>(`/albums/${id}`),
  followAlbum: (id: string) =>
    http.post<SuccessResponseApi<{ album: Album }>>(`/albums/${id}/follow`),
  unfollowAlbum: (id: string) => http.delete(`/albums/${id}/unfollow`),
  getUserFollowAlbums: () =>
    http.get<SuccessResponseApi<LibraryItemList<LibraryItemAlbum>>>(
      '/me/albums'
    )
};
