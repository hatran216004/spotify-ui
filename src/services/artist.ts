import { Artist, ArtistList } from '@/types/artist.type';
import { SuccessResponseApi } from '@/types/response.type';
import { ListSongs } from '@/types/song.type';
import { http } from '@/utils/http';

export const artistServices = {
  getPopularArtists: () =>
    http.get<SuccessResponseApi<ArtistList>>('/artists/popular'),
  getArtist: (id: string) =>
    http.get<SuccessResponseApi<{ artist: Artist }>>(`/artists/${id}`),
  getPopularArtistSongs: (id: string) =>
    http.get<SuccessResponseApi<ListSongs>>(`/artists/${id}/popular-songs`)
};
