import { Artist, ArtistList } from '@/types/artist.type';
import { SuccessResponseApi } from '@/types/response.type';
import { ListTracks } from '@/types/track.type';
import { http } from '@/utils/http';

export const artistServices = {
  getPopularArtists: () =>
    http.get<SuccessResponseApi<ArtistList>>('/artists/popular'),
  getArtist: (id: string) =>
    http.get<SuccessResponseApi<{ artist: Artist }>>(`/artists/${id}`),
  getPopularArtistTracks: (id: string) =>
    http.get<SuccessResponseApi<ListTracks>>(`/artists/${id}/tracks/popular`)
};
