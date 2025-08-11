import { playlistServices } from '@/services/playlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useRemoveTrackFromPlaylist() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: playlistServices.removeTrackFromPlaylist
  });
  const queryClient = useQueryClient();

  const handleRemoveFromPlaylist = ({
    songId,
    playlistId
  }: {
    songId?: string;
    playlistId?: string;
  }) => {
    if (!playlistId || !songId) return;

    mutate(
      { songId, playlistId },
      {
        onSuccess: (data) => {
          const playlistName = data.data.data.playlist.name;
          toast.success(`Track removed from this ${playlistName}!`);
          queryClient.invalidateQueries({
            queryKey: ['playlist', playlistId]
          });
        },
        onError: () => {
          toast.error('Failed to remove the track. Please try again.');
        }
      }
    );
  };

  return { isPending, isError, handleRemoveFromPlaylist };
}

export default useRemoveTrackFromPlaylist;
