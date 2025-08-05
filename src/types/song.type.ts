import { Artist } from './artist.type';

export type Song = {
  _id?: string;
  title?: string;
  imageUrl?: string;
  artists?: Artist[];
  albumId?: string;
  audioUrl?: string;
  duration?: number;
  // genres: never[];
  playCount?: number;
  releaseDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ListSongs = {
  songs: Song[];
};
