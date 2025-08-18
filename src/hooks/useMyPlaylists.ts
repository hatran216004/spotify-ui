import { playlistServices } from '@/services/playlist';
import { useUserStore } from '@/store/ui.store';
import { useQuery } from '@tanstack/react-query';

function useMyPlaylists() {
  const { token } = useUserStore();
  const { data, isLoading } = useQuery({
    queryKey: ['my-playlists'],
    queryFn: playlistServices.getMyPlaylists,
    enabled: !!token
  });

  return {
    myPlaylists: data?.data.data.playlists,
    pagination: data?.data.data.playlists,
    isLoading
  };
}

export default useMyPlaylists;
