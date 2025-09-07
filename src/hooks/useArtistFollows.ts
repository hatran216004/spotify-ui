import { artistServices } from '@/services/artist';
import { useUserStore } from '@/store/ui.store';
import { useQuery } from '@tanstack/react-query';

function useArtistFollows() {
  const { isLogin, user } = useUserStore();

  const { data, isPending, isError } = useQuery({
    queryKey: ['artists-followed', user?._id],
    queryFn: artistServices.getUserFollowedArtists,
    enabled: isLogin
  });

  const artistFollows = data?.data?.data?.artistFollows;
  return { artistFollows, isPending, isError };
}

export default useArtistFollows;
