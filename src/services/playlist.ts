import { Playlist, PlaylistList } from '@/types/playlist.type';
import { SuccessResponseApi } from '@/types/response.type';
import { http } from '@/utils/http';

type Data = {
  songId: string;
  playlistId: string;
};

export const playlistServices = {
  getAllPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/playlists'),
  getMyPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/me/playlists'),
  getPlaylist: (id: string) =>
    http.get<SuccessResponseApi<{ playlist: Playlist }>>(`/playlists/${id}`),
  addTrackToPlaylist: ({ songId, playlistId }: Data) =>
    http.patch<SuccessResponseApi<{ playlist: Playlist }>>(
      `me/playlists/${playlistId}/songs`,
      { songId }
    ),
  removeTrackFromPlaylist: ({ songId, playlistId }: Data) =>
    http.delete(`me/playlists/${playlistId}/songs/${songId}`),
  createNewPlaylist: () => http.post('/me/playlists'),
  deletePlaylist: (id: string) => http.delete(`/me/playlists/${id}`),
  reorderPlaylist: ({
    id,
    body
  }: {
    id: string;
    body: { fromIndex: number; toIndex: number; songId: string };
  }) => http.patch(`/me/playlists/${id}/reorder`, body)
};
