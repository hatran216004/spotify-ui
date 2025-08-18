import { playlistServices } from '@/services/playlist';
import { useQuery } from '@tanstack/react-query';

function usePlaylistById(playlistId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: () => playlistServices.getPlaylist(playlistId!),
    enabled: !!playlistId
  });

  const tracks = data?.data.data.playlist.tracks?.map((entry) => ({
    ...entry.track,
    order: entry.order
  }));

  return { playlist: data?.data.data.playlist, isLoading, isError, tracks };
}

export default usePlaylistById;
