import { Playlist, PlaylistList } from '@/types/playlist.type';
import { SuccessResponseApi } from '@/types/response.type';
import { http } from '@/utils/http';

type Data = {
  trackId: string;
  playlistId: string;
};

export const playlistServices = {
  getAllPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/playlists'),
  getMyPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/me/playlists'),
  getPlaylist: (id: string) =>
    http.get<SuccessResponseApi<{ playlist: Playlist }>>(`/playlists/${id}`),
  addTrackToPlaylist: ({ trackId, playlistId }: Data) =>
    http.patch<SuccessResponseApi<{ playlist: Playlist }>>(
      `me/playlists/${playlistId}/tracks`,
      { trackId }
    ),
  removeTrackFromPlaylist: ({ trackId, playlistId }: Data) =>
    http.delete(`me/playlists/${playlistId}/tracks/${trackId}`),
  createNewPlaylist: () => http.post('/me/playlists'),
  deletePlaylist: (id: string) => http.delete(`/me/playlists/${id}`),
  reorderPlaylist: ({
    id,
    body
  }: {
    id: string;
    body: { fromIndex: number; toIndex: number; trackId: string };
  }) => http.patch(`/me/playlists/${id}/reorder`, body)
};
