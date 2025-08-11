import RenderList from './RenderList';
import Playlist from './Playlist';
import { Playlist as PlaylistType } from '@/types/playlist.type';
import useMyPlaylists from '@/hooks/useMyPlaylists';

export default function MyPlaylists() {
  const { myPlaylists, isLoading } = useMyPlaylists();

  if (isLoading) return null;

  return (
    <div className="mt-5 mx-[6px] px-[6px] overflow-y-auto">
      {!!myPlaylists && (
        <RenderList
          data={myPlaylists}
          render={(playlist: PlaylistType) => (
            <Playlist key={playlist._id} playlist={playlist} />
          )}
        />
      )}
    </div>
  );
}
