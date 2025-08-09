import { Song } from './song.type';

export type Playlist = {
  _id?: string;
  name?: string;
  userId?: {
    _id?: string;
    username?: string;
  };
  isPublic?: boolean;
  songs?: Song[];
  totalDuration?: number;
  coverImage?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PlaylistList = {
  playlists: Playlist[];
  pagination: {
    playCount: number;
    currentPage: number;
  };
};
