import { Playlist, PlaylistList } from '@/types/playlist.type';
import { SuccessResponseApi } from '@/types/response.type';
import { Track } from '@/types/track.type';
import { http } from '@/utils/http';

type TrackInfo = {
  trackId: string;
  playlistId: string;
};

export type LikedTrack = {
  track: Track;
  addedAt: string;
};

export const playlistServices = {
  getMeLikedTracks: () =>
    http.get<SuccessResponseApi<{ tracks: LikedTrack[] }>>('me/liked-tracks'),
  addTrackToLiked: (trackId: string) =>
    http.patch<SuccessResponseApi<{ track: Track }>>('me/liked-tracks', {
      trackId
    }),
  getAllPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/playlists'),
  getMyPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/me/playlists'),
  getPlaylist: (id: string) =>
    http.get<SuccessResponseApi<{ playlist: Playlist }>>(`/playlists/${id}`),
  addTrackToPlaylist: ({ trackId, playlistId }: TrackInfo) =>
    http.patch<SuccessResponseApi<{ playlist: Playlist }>>(
      `me/playlists/${playlistId}/tracks`,
      { trackId }
    ),
  removeTrackFromPlaylist: ({ trackId, playlistId }: TrackInfo) =>
    http.delete(`me/playlists/${playlistId}/tracks/${trackId}`),
  createNewPlaylist: () => http.post('/me/playlists'),
  deletePlaylist: (id: string) => http.delete(`/me/playlists/${id}`),
  reorderPlaylist: ({
    id,
    body
  }: {
    id: string;
    body: { fromIndex: number; toIndex: number; trackId: string };
  }) => http.patch(`/me/playlists/${id}/reorder`, body),
  updatePlaylist: ({ id, data }: { id: string; data: FormData }) =>
    http.patch<SuccessResponseApi<{ playlist: Playlist }>>(
      `me/playlists/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
};
