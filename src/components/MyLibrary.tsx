import RenderList from './RenderList';
import LibraryItem from './LibraryItem';
import { Playlist as PlaylistType } from '@/types/playlist.type';
import useMyPlaylists from '@/hooks/useMyPlaylists';
import CollectionTracks from './CollectionTracks';

export default function MyLibrary() {
  const { myPlaylists, isLoading } = useMyPlaylists();

  if (isLoading) return null;

  return (
    <div className="mt-5 mx-[6px] px-[6px] overflow-y-auto">
      <CollectionTracks />
      {myPlaylists && myPlaylists.length > 0 && (
        <RenderList
          data={myPlaylists}
          render={(playlist: PlaylistType) => (
            <LibraryItem key={playlist._id} playlist={playlist} />
          )}
        />
      )}
    </div>
  );
}
