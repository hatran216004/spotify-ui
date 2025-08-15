import { Track } from '@/types/track.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TrackState = {
  currentTrack: Track | null;
  audioElement: HTMLAudioElement | null;
  // positionMs: number;
  // volume: number;

  isPlaying: boolean;
  isLoop: boolean;
  isShuffle: boolean;
};

type TrackAction = {
  setCurrentTrack: (track: Track | null) => void;
  setIsPlayling: (audioPlayState: boolean) => void;
  setAudioElement: (audio: HTMLAudioElement) => void;

  togglePlayBack: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playTrack: (track: Track) => void;
  handlePlayTrack: (track: Track) => void;
};

type TrackStore = TrackState & TrackAction;

export const useTrack = create<TrackStore>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      audioElement: null,

      isPlaying: false,
      isLoop: false,
      isShuffle: false,

      setAudioElement: (audio) => set({ audioElement: audio }),
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlayling: (audioPlayState) =>
        set(() => ({ isPlaying: audioPlayState })),

      toggleLoop: () => {
        const { audioElement, isLoop } = get();
        if (!audioElement) return;
        set({ isLoop: !isLoop });
      },
      toggleShuffle: () => {
        const { audioElement, isShuffle } = get();
        if (!audioElement) return;
        set({ isShuffle: !isShuffle });
      },
      togglePlayBack: () => {
        const { audioElement, currentTrack } = get();
        if (!currentTrack || !audioElement) return;

        if (audioElement.paused) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      },
      playTrack: (track) => {
        const { audioElement } = get();
        if (!audioElement) return;

        set({ currentTrack: track });

        audioElement.oncanplay = () => {
          audioElement.play();
        };
      },
      handlePlayTrack: (track) => {
        if (!track) return;

        const { playTrack } = get();
        playTrack(track);

        // if (isSameContext && isSameTrack) {
        //   togglePlayBack();
        // } else {
        //   audioElement!.currentTime = 0;
        //   playTrack(track);
        // }
      }
    }),
    {
      name: 'track-storage',
      partialize: ({ currentTrack, isLoop, isShuffle }) => ({
        currentTrack,
        isLoop,
        isShuffle
      })
    }
  )
);
