import { artistServices } from '@/services/artist';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

function useArtistFollows() {
  const { userId, isSignedIn } = useAuth();
  const { data, isPending, isError } = useQuery({
    queryKey: ['artists-followed', userId],
    queryFn: artistServices.getUserFollowedArtists,
    enabled: isSignedIn
  });

  const artistFollows = data?.data?.data?.artistFollows;
  return { artistFollows, isPending, isError };
}

export default useArtistFollows;
