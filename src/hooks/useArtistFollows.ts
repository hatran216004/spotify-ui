import { artistServices } from '@/services/artist';
import { useUserStore } from '@/store/ui.store';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

function useArtistFollows() {
  const { user } = useUserStore();
  const { isSignedIn, userId } = useAuth();
  const { data, isPending, isError } = useQuery({
    queryKey: ['artists-followed', userId],
    queryFn: artistServices.getUserFollowedArtists,
    enabled: isSignedIn && !!user
  });

  const artistFollows = data?.data?.data?.artistFollows;
  return { artistFollows, isPending, isError };
}

export default useArtistFollows;
