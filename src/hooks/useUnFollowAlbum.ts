import { albumServices } from '@/services/album';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useUnFollowAlbum() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: albumServices.unfollowAlbum,
    onSuccess: () => {
      toast.success('Album has been unfollowed');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['follow-albums']
      });
    }
  });

  return { mutate, isPending };
}

export default useUnFollowAlbum;
