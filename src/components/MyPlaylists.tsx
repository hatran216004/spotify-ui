import { playlistServices } from '@/services/playlist';
import { useQuery } from '@tanstack/react-query';
import RenderList from './RenderList';
import Playlist from './Playlist';
import { Playlist as PlaylistType } from '@/types/playlist.type';

export default function MyPlaylists() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-playlists'],
    queryFn: playlistServices.getMyPlaylists
  });

  if (isLoading) return null;

  const playlists = data?.data.data.playlists;

  return (
    <div className="mt-5 mx-[6px] px-[6px] overflow-y-auto">
      {!!playlists && (
        <RenderList
          data={playlists}
          render={(playlist: PlaylistType) => (
            <Playlist key={playlist._id} playlist={playlist} />
          )}
        />
      )}
    </div>
  );
}
