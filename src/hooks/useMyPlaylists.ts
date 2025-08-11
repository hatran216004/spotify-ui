import { playlistServices } from '@/services/playlist';
import { useQuery } from '@tanstack/react-query';

function useMyPlaylists() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-playlists'],
    queryFn: playlistServices.getMyPlaylists
  });

  return {
    myPlaylists: data?.data.data.playlists,
    pagination: data?.data.data.playlists,
    isLoading
  };
}

export default useMyPlaylists;
