import { playlistServices } from '@/services/playlist';
import { useUserStore } from '@/store/ui.store';
import { ErrorResponseApi } from '@/types/response.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

function useRemoveTrackFromLiked() {
  const { mutate, isPending } = useMutation({
    mutationFn: playlistServices.moveTrackFromLiked
  });

  const queryClient = useQueryClient();
  const userId = useUserStore().user?._id;

  const handleRemoveTrackFromLiked = (trackId: string) => {
    if (!trackId) return;

    mutate(trackId, {
      onSuccess: () => {
        toast.success('Track removed from liked songs');
        queryClient.invalidateQueries({
          queryKey: ['liked-tracks', userId]
        });
      },
      onError: (error) => {
        const errorMessage = (error as AxiosError<ErrorResponseApi>).response
          ?.data.message;
        toast.error(
          errorMessage || 'Failed to remove from track. Please try again.'
        );
      }
    });
  };

  return { isPending, handleRemoveTrackFromLiked };
}

export default useRemoveTrackFromLiked;
