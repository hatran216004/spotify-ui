import RenderList from './RenderList';
import LibraryItem from './LibraryItem';
import { Playlist as PlaylistType } from '@/types/playlist.type';
import useMyPlaylists from '@/hooks/useMyPlaylists';
import CollectionTracks from './CollectionTracks';
import useArtistFollows from '@/hooks/useArtistFollows';
import LibraryArtistItem from './LibraryArtistItem';
import { ArtistFollowItem } from '@/types/artist.type';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

export default function MyLibrary() {
  const { isSignedIn } = useAuth();
  const { myPlaylists } = useMyPlaylists();
  const { artistFollows } = useArtistFollows();

  const [isPin, setIsPin] = useState(
    localStorage.getItem('pin-playlist') === 'true'
  );

  return (
    <>
      {isSignedIn && (
        <div className="mt-5 mx-[6px] px-[6px] overflow-y-auto">
          {isPin && <CollectionTracks onPin={setIsPin} isPin={isPin} />}

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
          {!isPin && <CollectionTracks onPin={setIsPin} isPin={isPin} />}
        </div>
      )}
      {!isSignedIn && (
        <div className="text-center text-gray-400 font-bold text-2xl mt-10">
          Login to create Your Library
        </div>
      )}
    </>
  );
}
