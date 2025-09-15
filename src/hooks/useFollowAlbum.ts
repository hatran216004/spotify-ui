import { albumServices } from '@/services/album';
import { ErrorResponseApi } from '@/types/response.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

function useFollowAlbum() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: albumServices.followAlbum,
    onSuccess: () => {
      toast.success('Album has been followed');
    },
    onError: (err) => {
      const errorMsg = (err as AxiosError<ErrorResponseApi>).response?.data
        .message;
      toast.error(errorMsg || 'Failed to follow album, try again later');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['follow-albums']
      });
    }
  });

  return { mutate, isPending };
}

export default useFollowAlbum;
