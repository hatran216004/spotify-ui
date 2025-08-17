import { AlbumDetail, ListAlbums } from '@/types/album.type';
import { SuccessResponseApi } from '@/types/response.type';
import { http } from '@/utils/http';

export const albumServices = {
  getPopularAlbums: () =>
    http.get<SuccessResponseApi<ListAlbums>>('/albums/popular'),
  getAlbum: (id: string) =>
    http.get<SuccessResponseApi<{ album: AlbumDetail }>>(`/albums/${id}`)
};
