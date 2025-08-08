export type Song = {
  _id?: string;
  title?: string;
  imageUrl?: string;
  artists?: {
    _id: string;
    name: string;
    bio: string;
    avatarUrl: string;
  }[];
  albumId?: {
    _id: string;
    title: string;
    id: string;
  };
  audioUrl?: string;
  duration?: number;
  genres?: string[];
  playCount?: number;
  releaseDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ListSongs = {
  songs: Song[];
};
