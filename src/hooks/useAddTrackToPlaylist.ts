import { playlistServices } from '@/services/playlist';
import { ErrorResponseApi } from '@/types/response.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

function useAddTrackToPlaylist() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: playlistServices.addTrackToPlaylist
  });
  const queryClient = useQueryClient();

  const handleAddToPlaylist = ({
    trackId,
    playlistId
  }: {
    trackId?: string;
    playlistId?: string;
  }) => {
    if (!playlistId || !trackId) return;

    mutate(
      { trackId, playlistId },
      {
        onSuccess: (data) => {
          const playlistName = data.data.data.playlist.name;
          toast.success(`Track added to your ${playlistName}!`);
          queryClient.invalidateQueries({
            queryKey: ['playlist', playlistId]
          });
        },
        onError: (error) => {
          const errorMessage = (error as AxiosError<ErrorResponseApi>).response
            ?.data.message;
          toast.error(
            errorMessage || 'Failed to add the track. Please try again.'
          );
        }
      }
    );
  };

  return { isPending, isError, handleAddToPlaylist };
}

export default useAddTrackToPlaylist;
