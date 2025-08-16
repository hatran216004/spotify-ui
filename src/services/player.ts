import { CurrentPlayback } from '@/types/player.type';
import { SuccessResponseApi } from '@/types/response.type';
import { http } from '@/utils/http';

export type RepeatMode = 'off' | 'track' | 'playlist';
export type ContextType = 'artist' | 'playlist' | 'search' | 'album' | 'liked';

type StartPlayTrack = {
  trackId: string;
  contextType?: ContextType;
  contextId?: string;
  progress?: number;
  volume?: number;
  shuffle?: boolean;
  repeatMode?: RepeatMode;
};

export const playerServices = {
  getCurrentPlayback: () =>
    http.get<SuccessResponseApi<{ currentPlayback: CurrentPlayback }>>(
      '/me/player'
    ),
  startPlayTrack: (data: StartPlayTrack) =>
    http.patch<SuccessResponseApi<{ updatedPlayback: CurrentPlayback }>>(
      'me/player/play',
      data
    ),
  pauseTrack: () =>
    http.patch<SuccessResponseApi<{ updatedPlayback: CurrentPlayback }>>(
      'me/player/pause'
    ),
  controlVolume: (volume: number) =>
    http.patch<SuccessResponseApi<{ updatedPlayback: CurrentPlayback }>>(
      'me/player/volume',
      { volume }
    ),
  controlProgress: (progress: number) =>
    http.patch<SuccessResponseApi<{ updatedPlayback: CurrentPlayback }>>(
      'me/player/seek',
      { progress }
    ),
  controlShuffle: () =>
    http.patch<SuccessResponseApi<{ updatedPlayback: CurrentPlayback }>>(
      'me/player/shuffle'
    ),
  controlRepeat: (repeatMode: RepeatMode) =>
    http.patch<SuccessResponseApi<{ updatedPlayback: CurrentPlayback }>>(
      'me/player/repeat',
      { repeatMode }
    )
};
