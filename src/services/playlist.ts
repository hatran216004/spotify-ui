/* eslint-disable @typescript-eslint/no-explicit-any */
import { LibraryItemList, LibraryItemPlaylist } from '@/types/libraryItem.type';
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
  addTrackToLiked: (trackId: string) =>
    http.patch<SuccessResponseApi<{ track: Track }>>('me/liked-tracks', {
      trackId
    }),
  moveTrackFromLiked: (trackId: string) =>
    http.delete<SuccessResponseApi<{ track: Track }>>(
      `me/liked-tracks/${trackId}`
    ),
  getAllPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/playlists'),
  getPopularPlaylists: () =>
    http.get<SuccessResponseApi<PlaylistList>>('/playlists/popular'),
  getMyPlaylists: (queryConfig: any) =>
    http.get<SuccessResponseApi<LibraryItemList<LibraryItemPlaylist>>>(
      '/me/playlists',
      {
        params: queryConfig
      }
    ),
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
  updatePlaylist: ({ id, data }: { id: string; data: any }) =>
    http.patch<SuccessResponseApi<{ playlist: Playlist }>>(
      `/playlists/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ),
  visibilityPlaylist: ({ id, isPublic }: { id: string; isPublic: boolean }) =>
    http.patch<SuccessResponseApi<{ playlist: Playlist }>>(`/playlists/${id}`, {
      isPublic
    }),
  followPlaylist: (id: string) =>
    http.post<SuccessResponseApi<{ playlist: Playlist }>>(
      `/playlists/${id}/follow`
    ),
  unfollowPlaylist: (id: string) => http.delete(`/playlists/${id}/unfollow`)
};
