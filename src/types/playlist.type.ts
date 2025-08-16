import { Track } from './track.type';

export type Playlist = {
  _id: string;
  name: string;
  user: {
    _id: string;
    username: string;
  };
  isPublic: boolean;
  tracks: PlaylistTrack[];
  totalDuration: number;
  coverImage: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type PlaylistList = {
  playlists: Playlist[];
  pagination: {
    playCount: number;
    currentPage: number;
  };
};

export type PlaylistTrack = {
  track: Track;
  order: number;
  addedAt: string;
};
