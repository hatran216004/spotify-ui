import { artistServices } from '@/services/artist';
import { useUserStore } from '@/store/ui.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUnfollowArtist() {
  const queryClient = useQueryClient();
  const userId = useUserStore().user?._id;

  const {
    mutate: unfollow,
    isPending: isUnfollowing,
    isError
  } = useMutation({
    mutationFn: artistServices.unFollowArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['artists-followed', userId]
      });
    }
  });

  return { unfollow, isUnfollowing, isError };
}

export default useUnfollowArtist;
