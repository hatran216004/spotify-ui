import { CurrentPlayback } from '@/types/player.type';
import { create } from 'zustand';

type CurrentPlaybackState = {
  currentPlayback: CurrentPlayback | null;
};

type CurrentPlaybackAction = {
  setCurrentPlayback: (currentPlayback: CurrentPlayback) => void;
};

type CurrentPlaybackStore = CurrentPlaybackState & CurrentPlaybackAction;

export const useCurrentPlayback = create<CurrentPlaybackStore>((set) => ({
  currentPlayback: null,
  setCurrentPlayback: (currentPlayback) => set({ currentPlayback })
}));
