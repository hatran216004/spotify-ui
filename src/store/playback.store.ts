import { ContextType } from '@/services/player';
import { CurrentPlayback } from '@/types/player.type';
import { Track } from '@/types/track.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PlaybackContext = {
  type: ContextType | null;
  id: string | null;
  tracks: Track[];
  totalTracks: number;

  setPlaybackContext: (
    contextType: ContextType,
    contextId: string | null
  ) => void;
  setPlaybackTracks: (tracks: Track[], totalTracks: number) => void;
};

type CurrentPlaybackStore = {
  currentPlayback: CurrentPlayback | null;
  setCurrentPlayback: (currentPlayback: CurrentPlayback) => void;
};

export const useCurrentPlayback = create<CurrentPlaybackStore>((set) => ({
  currentPlayback: null,
  setCurrentPlayback: (currentPlayback) => set({ currentPlayback })
}));

export const usePlaybackContext = create<PlaybackContext>()(
  persist(
    (set) => ({
      type: null,
      id: null,
      tracks: [],
      totalTracks: 0,
      setPlaybackContext: (contextType, contextId) =>
        set({ id: contextId, type: contextType }),
      setPlaybackTracks: (tracks, totalTracks) => set({ tracks, totalTracks })
    }),
    {
      name: 'current-playback',
      partialize: ({ id, type }) => ({ id, type })
    }
  )
);
