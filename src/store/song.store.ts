import { Song } from '@/types/song.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Context = {
  type: 'album' | 'playlist' | 'tracks' | 'none';
  id: string | null;
};

type SongState = {
  currentSong: Song | null;
  audioElement: HTMLAudioElement | null;
  volume: number;
  currentPlaylistItemId: string | null;
  currentPlaylistId: string | null;
  context: Context;

  isPlaying: boolean;
  isMute: boolean;
  isLoop: boolean;
  isShuffle: boolean;
};

type SongAction = {
  setCurrentSong: (song: Song | null) => void;
  setIsPlayling: (audioPlayState: boolean) => void;
  setAudioElement: (audio: HTMLAudioElement) => void;
  setVolume: (volume: number) => void;
  setCurrentPlaylistItemId: (id: string) => void;
  setCurrentPlaylistId: (id: string) => void;
  setContext: (context: Context) => void;

  togglePlayBack: () => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playSong: (song: Song) => void;
  handlePlaySong: (song: Song, isPlayingExternalPlaylist?: boolean) => void;
};

type SongStore = SongState & SongAction;

export const useSong = create<SongStore>()(
  persist(
    (set, get) => ({
      currentSong: null,
      audioElement: null,
      volume: 0,
      currentPlaylistItemId: null,
      currentPlaylistId: null,
      context: { type: 'none', id: null },

      isPlaying: false,
      isMute: false,
      isLoop: false,
      isShuffle: false,

      setAudioElement: (audio) => set({ audioElement: audio }),
      setCurrentSong: (song) => set({ currentSong: song }),
      setVolume: (volume) => set({ volume, isMute: volume <= 0 }),
      setIsPlayling: (audioPlayState) =>
        set(() => ({ isPlaying: audioPlayState })),
      setCurrentPlaylistItemId: (currentPlaylistItemId) =>
        set({ currentPlaylistItemId }),
      setCurrentPlaylistId: (currentPlaylistId) => set({ currentPlaylistId }),
      setContext: (context) => set({ context }),

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
      toggleShuffle: () => {
        const { audioElement, isShuffle } = get();
        if (!audioElement) return;
        set({ isShuffle: !isShuffle });
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
      handlePlaySong: (song, isPlayingExternalPlaylist = false) => {
        if (!song) return;

        const { currentSong, audioElement, togglePlayBack, playSong } = get();

        const isSameSong = currentSong?._id === song?._id;

        if (isSameSong && isPlayingExternalPlaylist) {
          audioElement!.currentTime = 0;
          playSong(song);
          return;
        }

        if (isSameSong) {
          togglePlayBack();
        } else {
          playSong(song);
        }
      }
    }),
    {
      name: 'track-storage',
      partialize: ({
        isMute,
        currentSong,
        volume,
        isLoop,
        isShuffle,
        currentPlaylistId,
        currentPlaylistItemId,
        context
      }) => ({
        isMute,
        currentSong,
        isLoop,
        isShuffle,
        volume,
        currentPlaylistId,
        currentPlaylistItemId,
        context
      })
    }
  )
);
