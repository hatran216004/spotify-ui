import { Song } from '@/types/song.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SongState = {
  currentSong: Song | null;
  audioElement: HTMLAudioElement | null;
  currentTime: number;
  volume: number;

  isPlaying: boolean;
  isMute: boolean;
  isLoop: boolean;
};

type SongAction = {
  setCurrentSong: (song: Song | null) => void;
  setIsPlayling: (audioPlayState: boolean) => void;
  setAudioElement: (audio: HTMLAudioElement) => void;
  setCurrentTime: (curretTime: number) => void;
  setVolume: (volume: number) => void;

  togglePlayBack: () => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  playSong: (song: Song) => void;
  handlePlaySong: (song: Song) => void;
};

type SongStore = SongState & SongAction;

export const useSong = create<SongStore>()(
  persist(
    (set, get) => ({
      currentSong: null,
      audioElement: null,
      currentTime: 0,
      volume: 0,

      isPlaying: false,
      isMute: false,
      isLoop: false,

      setAudioElement: (audio) => set({ audioElement: audio }),
      setCurrentSong: (song) => set({ currentSong: song }),
      setCurrentTime: (currentTime) => set({ currentTime }),
      setVolume: (volume) => set({ volume, isMute: volume <= 0 }),
      setIsPlayling: (audioPlayState) =>
        set(() => ({ isPlaying: audioPlayState })),

      togglePlayBack: () => {
        const { audioElement, isPlaying, currentSong } = get();
        if (!currentSong) return;

        if (audioElement!.paused) {
          audioElement!.play();
        } else {
          audioElement!.pause();
        }
        set({ isPlaying: !isPlaying });
      },
      toggleMute: () => {
        const { audioElement, isMute, volume } = get();
        if (!audioElement) return;

        if (isMute) {
          audioElement.volume = volume || 1;
        } else {
          audioElement.volume = 0;
        }
        set({ isMute: !isMute, volume: volume || 1 });
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
      playSong: (song) => {
        const { audioElement } = get();
        if (!audioElement) return;

        set({ currentSong: song });

        audioElement.oncanplay = () => {
          audioElement.play();
          set({ isPlaying: true });
        };
      },
      handlePlaySong: (song: Song) => {
        if (!song) return;
        const { currentSong, togglePlayBack, playSong } = get();

        const isSameSong = currentSong?._id === song?._id;
        if (isSameSong) {
          togglePlayBack();
        } else {
          playSong(song);
        }
      }
    }),
    {
      name: 'track-storage',
      partialize: ({ isMute, currentSong, currentTime, volume, isLoop }) => ({
        isMute,
        currentSong,
        currentTime,
        isLoop,
        volume
      })
    }
  )
);
