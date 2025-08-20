import { artistServices } from '@/services/artist';
import { useUserStore } from '@/store/ui.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useFollowArtist() {
  const queryClient = useQueryClient();
  const userId = useUserStore().user?._id;

  const {
    mutate: follow,
    isPending: isFollowing,
    isError
  } = useMutation({
    mutationFn: artistServices.followArtist,
    onSuccess: () => {
      toast.success('Follow artist successfully');
      queryClient.invalidateQueries({
        queryKey: ['artists-followed', userId]
      });
    }
  });

  return { isFollowing, isError, follow };
}

export default useFollowArtist;
