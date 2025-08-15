import { ContextType } from '@/services/player';
import { CurrentPlayback } from '@/types/player.type';
import { Track } from '@/types/track.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrentContextStore = {
  contextType: ContextType | null;
  contextId: string | null;

  setCurrentContext: (context: {
    contextType: ContextType;
    contextId: string;
  }) => void;
};

type CurrentTracksStore = {
  currentTracks: Track[];
  setCurrentTracks: (tracks: Track[]) => void;
};

type CurrentPlaybackStore = {
  currentPlayback: CurrentPlayback | null;

  setCurrentPlayback: (currentPlayback: CurrentPlayback) => void;
};

export const useCurrentTracks = create<CurrentTracksStore>((set) => ({
  currentTracks: [],
  setCurrentTracks: (currentTracks) => set({ currentTracks })
}));

export const useCurrentPlayback = create<CurrentPlaybackStore>((set) => ({
  currentPlayback: null,
  setCurrentPlayback: (currentPlayback) => set({ currentPlayback })
}));

export const useCurrentContext = create<CurrentContextStore>()(
  persist(
    (set) => ({
      contextType: null,
      contextId: null,
      setCurrentContext: ({ contextId, contextType }) =>
        set({ contextId, contextType })
    }),
    {
      name: 'current-playback',
      partialize: ({ contextId, contextType }) => ({ contextId, contextType })
    }
  )
);
