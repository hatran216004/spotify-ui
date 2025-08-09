import { PlaylistList } from '@/types/playlist.type';
import { SuccessResponseApi } from '@/types/response.type';
import { http } from '@/utils/http';

export const playlistServices = {
  getMyPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/me/playlists')
};
