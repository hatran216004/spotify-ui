import { playlistServices } from '@/services/playlist';
import { useUserStore } from '@/store/ui.store';
import { ErrorResponseApi } from '@/types/response.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

function useAddTrackToLiked() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: playlistServices.addTrackToLiked
  });

  const queryClient = useQueryClient();
  const userId = useUserStore().user?._id;

  const handleAddTrackToLiked = (trackId: string) => {
    if (!trackId) return;

    mutate(trackId, {
      onSuccess: () => {
        toast.success('Track added to liked songs 😁');
        queryClient.invalidateQueries({
          queryKey: ['liked-tracks', userId]
        });
      },
      onError: (error) => {
        const errorMessage = (error as AxiosError<ErrorResponseApi>).response
          ?.data.message;
        toast.error(
          errorMessage || 'Failed to add the track. Please try again.'
        );
      }
    });
  };

  return { handleAddTrackToLiked, isPending, isError };
}

export default useAddTrackToLiked;
