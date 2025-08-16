import RenderList from './RenderList';
import LibraryItem from './LibraryItem';
import { Playlist as PlaylistType } from '@/types/playlist.type';
import useMyPlaylists from '@/hooks/useMyPlaylists';
import CollectionTracks from './CollectionTracks';
import useArtistFollows from '@/hooks/useArtistFollows';
import LibraryArtistItem from './LibraryArtistItem';
import { ArtistFollowItem } from '@/types/artist.type';

export default function MyLibrary() {
  const { myPlaylists } = useMyPlaylists();
  const { artistFollows } = useArtistFollows();

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
      {artistFollows && artistFollows.length > 0 && (
        <RenderList
          data={artistFollows}
          render={(artist: ArtistFollowItem) => (
            <LibraryArtistItem key={artist._id} artist={artist} />
          )}
        />
      )}
    </div>
  );
}
