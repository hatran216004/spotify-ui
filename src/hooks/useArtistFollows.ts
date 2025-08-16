import { artistServices } from '@/services/artist';
import { useUserStore } from '@/store/ui.store';
import { useQuery } from '@tanstack/react-query';

function useArtistFollows() {
  const userId = useUserStore().user?._id;
  const { data, isPending, isError } = useQuery({
    queryKey: ['artists-followed', userId],
    queryFn: artistServices.getUserFollowedArtists,
    enabled: !!userId
  });

  const artistFollows = data?.data?.data?.artistFollows;
  return { artistFollows, isPending, isError };
}

export default useArtistFollows;
