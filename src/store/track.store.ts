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
  // setPositionMs: (value: number) => void;
  // setVolume: (value: number) => void;

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
      // positionMs: 0,
      // volume: 0,

      isPlaying: false,
      isLoop: false,
      isShuffle: false,

      // setPositionMs: (positionMs) => set({ positionMs }),
      // setVolume: (volume) => set({ volume }),
      setAudioElement: (audio) => set({ audioElement: audio }),
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlayling: (audioPlayState) =>
        set(() => ({ isPlaying: audioPlayState })),

      togglePlayBack: () => {
        const { audioElement, isPlaying, currentTrack } = get();
        if (!currentTrack) return;

        if (audioElement!.paused) {
          audioElement!.play();
        } else {
          audioElement!.pause();
        }
        set({ isPlaying: !isPlaying });
      },
      toggleLoop: () => {
        const { audioElement, isLoop } = get();
        if (!audioElement) return;

        if (!isLoop) {
          audioElement.loop = true;
        } else {
          audioElement.loop = false;
        }
        set({ isLoop: !isLoop });
      },
      toggleShuffle: () => {
        const { audioElement, isShuffle } = get();
        if (!audioElement) return;
        set({ isShuffle: !isShuffle });
      },
      playTrack: (track) => {
        const { audioElement } = get();
        if (!audioElement) return;

        set({ currentTrack: track });

        audioElement.oncanplay = () => {
          audioElement.play();
          set({ isPlaying: true });
        };
      },
      handlePlayTrack: (track) => {
        if (!track) return;

        const { currentTrack, togglePlayBack, playTrack } = get();
        const isSameTrack = currentTrack?._id === track._id;
        if (isSameTrack) {
          togglePlayBack();
        } else {
          playTrack(track);
        }
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
