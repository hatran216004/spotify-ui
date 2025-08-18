import { artistServices } from '@/services/artist';
import { useUserStore } from '@/store/ui.store';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

function useArtistFollows() {
  const { token } = useUserStore();
  const { userId } = useAuth();
  const { data, isPending, isError } = useQuery({
    queryKey: ['artists-followed', userId],
    queryFn: artistServices.getUserFollowedArtists,
    enabled: !!token
  });

  const artistFollows = data?.data?.data?.artistFollows;
  return { artistFollows, isPending, isError };
}

export default useArtistFollows;
