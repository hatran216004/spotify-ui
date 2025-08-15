export type CurrentPlayback = {
  _id: string;
  userId: string;
  trackId: string;
  progress?: number;
  isPlaying: boolean;
  volume?: number;
  shuffle?: boolean;
  repeatMode: string;
  playlistId?: null;
  contextType?: string;
  contextId?: string;
  createdAt: string;
  updatedAt: string;
  track: {
    _id: string;
    title: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    genres: never[];
    playCount: number;
    releaseDate: string;
    createdAt: string;
    updatedAt: string;
    artists: {
      _id: string;
      name: string;
      avatarUrl: string;
      createdAt: string;
      updatedAt: string;
    }[];
    album: {
      _id: string;
      title: string;
      coverImage: string;
    };
  };
  context: {
    name: string;
    imageUrl: string;
    totalTracks: number;
  };
};
