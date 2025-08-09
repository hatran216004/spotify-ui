import { Playlist, PlaylistList } from '@/types/playlist.type';
import { SuccessResponseApi } from '@/types/response.type';
import { http } from '@/utils/http';

export const playlistServices = {
  getAllPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/playlists'),
  getMyPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/me/playlists'),
  getPlaylist: (id: string) =>
    http.get<SuccessResponseApi<{ playlist: Playlist }>>(`/playlists/${id}`)
};
