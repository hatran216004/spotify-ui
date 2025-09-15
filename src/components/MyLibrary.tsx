import CollectionTracks from './CollectionTracks';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Loading from './Loading';
import UserPlaylists from './UserPlaylists';
import UserFollowArtists from './UserFollowArtists';
import UserFollowAlbums from './UserFollowAlbums';
import useUrl from '@/hooks/useUrl';

export function InfiniteScrollTrigger({
  ref
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return <div ref={ref} className="h-4 w-full" aria-hidden="true" />;
}

export function LoadingSpinner() {
  return (
    <div className="flex justify-center py-4">
      <Loading />
    </div>
  );
}

export default function MyLibrary() {
  const { isSignedIn } = useAuth();
  const [isPin, setIsPin] = useState(true);

  const { currentValue: itemType } = useUrl({
    field: 'item_type',
    defaultValue: 'all'
  });

  if (!isSignedIn) {
    return (
      <div className="text-center text-gray-400 font-bold text-2xl mt-10">
        Login to create Your Library
      </div>
    );
  }

  const showLiked = itemType === 'all';

  return (
    <>
      <div className="mt-5 mx-[6px] px-[6px] overflow-y-auto">
        {isPin && showLiked && (
          <CollectionTracks onPin={setIsPin} isPin={isPin} />
        )}

        <UserPlaylists />
        <UserFollowArtists />
        <UserFollowAlbums />

        {!isPin && showLiked && (
          <CollectionTracks onPin={setIsPin} isPin={isPin} />
        )}
      </div>
    </>
  );
}
