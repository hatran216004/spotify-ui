import { CurrentPlayback } from '@/types/player.type';
import { SuccessResponseApi } from '@/types/response.type';
import { http } from '@/utils/http';

type RepeatMode = 'off' | 'track' | 'playlist';
type ContextType = 'artist' | 'playlist' | 'search' | 'album';

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
  startPlayTrack: (data: StartPlayTrack) => http.patch('me/player/play', data),
  pauseTrack: () => http.patch('me/player/pause'),
  controlVolume: (volume: number) => http.patch('me/player/volume', { volume }),
  controlProgress: (progress: number) =>
    http.patch('me/player/seek', { progress }),
  controlShuffle: () => http.patch('me/player/shuffle'),
  controlRepeat: (repeatMode: RepeatMode) =>
    http.patch('me/player/repeat', { repeatMode })
};
