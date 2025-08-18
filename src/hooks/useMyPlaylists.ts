import { playlistServices } from '@/services/playlist';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

function useMyPlaylists() {
  const { isSignedIn } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ['my-playlists'],
    queryFn: playlistServices.getMyPlaylists,
    enabled: isSignedIn
  });

  return {
    myPlaylists: data?.data.data.playlists,
    pagination: data?.data.data.playlists,
    isLoading
  };
}

export default useMyPlaylists;
