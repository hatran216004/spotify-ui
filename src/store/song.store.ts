import { Song } from '@/types/song.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SongState = {
  currentSong: Song | null;
  isPlaying: boolean;
  audioElement: HTMLAudioElement | null;
  currentTime: number;
  sound: number;
};

type SongAction = {
  setCurrentSong: (song: Song | null) => void;
  setIsPlayling: (audioPlayState: boolean) => void;
  setAudioElement: (audio: HTMLAudioElement) => void;
  setCurrentTime: (curretTime: number) => void;
  setSound: (sound: number) => void;

  togglePlayBack: () => void;
  playSong: (song: Song) => void;
  handlePlaySong: (song: Song) => void;
};

type SongStore = SongState & SongAction;

export const useSong = create<SongStore>()(
  persist(
    (set, get) => ({
      currentSong: null,
      isPlaying: false,
      audioElement: null,
      currentTime: 0,
      sound: 0,

      setAudioElement: (audio) => set({ audioElement: audio }),
      setCurrentSong: (song) => set({ currentSong: song }),
      setCurrentTime: (currentTime) => set({ currentTime }),
      setSound: (sound) => set({ sound }),
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
      partialize: ({ currentSong, currentTime, sound }) => ({
        currentSong,
        currentTime,
        sound
      })
    }
  )
);
