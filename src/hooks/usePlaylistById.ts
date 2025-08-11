import { playlistServices } from '@/services/playlist';
import { useQuery } from '@tanstack/react-query';

function usePlaylistById(playlistId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: () => playlistServices.getPlaylist(playlistId!),
    enabled: !!playlistId
  });

  return { playlist: data?.data.data.playlist, isLoading, isError };
}

export default usePlaylistById;
