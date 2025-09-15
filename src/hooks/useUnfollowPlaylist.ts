import { playlistServices } from '@/services/playlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

function useUnfollowPlaylist() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: playlistServices.unfollowPlaylist,
    onSuccess: () => {
      toast.success('Playlist has been unfollowed');
    },
    onError: (err) => {
      const errorMsg = (err as AxiosError<{ message: string }>).response?.data
        .message;
      toast.error(errorMsg || 'Something went wrong, try again later');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-playlists']
      });
    }
  });

  return { mutate, isPending };
}

export default useUnfollowPlaylist;
