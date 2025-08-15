import { Artist } from './artist.type';

export type Track = {
  _id: string;
  title: string;
  imageUrl: string;
  artists: Artist[];
  audioUrl: string;
  duration: number;
  genres: string[];
  playCount: number;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  album: {
    title: string;
    _id: string;
  };
};

export type ListTracks = {
  tracks: Track[];
};
