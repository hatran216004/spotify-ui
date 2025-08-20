import { artistServices } from '@/services/artist';
import { useUserStore } from '@/store/ui.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
      toast.success('Unfollow artist successfully');
      queryClient.invalidateQueries({
        queryKey: ['artists-followed', userId]
      });
    }
  });

  return { unfollow, isUnfollowing, isError };
}

export default useUnfollowArtist;
