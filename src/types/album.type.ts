import { ListTracks } from './track.type';

export type Album = {
  _id: string;
  title: string;
  artist: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  releaseDate: string;
  coverImage: string;
  genre: string[];
  createdAt: string;
  updatedAt: string;
};

export type ListAlbums = {
  albums: Album[];
};

export type AlbumDetail = Album & ListTracks;
