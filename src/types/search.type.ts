import { Artist } from './artist.type';
import { Playlist } from './playlist.type';
import { Track } from './track.type';

export type SearchAll = {
  result: Track[] | Artist[] | Playlist[];
  type: 'artists' | 'albums' | 'playlists' | 'tracks' | 'none';
};
