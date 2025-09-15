import { Track } from './track.type';
import { User } from './user.type';

export type LibraryItem = {
  _id: string;
  userId: string;
  itemType: string;
  itemId: string;
  addedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type PlaylistMetadata = {
  _id: string;
  name: string;
  coverImage: string;
  isPublic: boolean;
  description: string;
  user: Pick<User, '_id' | 'username'>;
};

export type AlbumMetadata = {
  _id: string;
  title: string;
  coverImage: string;
};

export type LibraryItemTrack = {
  track: Track;
} & LibraryItem;

export type LibraryItemPlaylist = {
  playlist_metadata: PlaylistMetadata;
} & LibraryItem;

export type LibraryItemAlbum = {
  album_metadata: AlbumMetadata;
} & LibraryItem;

export type LibraryItemList<T> = {
  items: T[];
  pagination: {
    pageCount: number;
    currentPage: number;
  };
};
