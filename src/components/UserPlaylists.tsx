import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useMyPlaylists from '@/hooks/useMyPlaylists';
import useUrl from '@/hooks/useUrl';
import { LibraryItemPlaylist } from '@/types/libraryItem.type';
import LibraryItem from './LibraryItem';
import RenderList from './RenderList';
import { InfiniteScrollTrigger, LoadingSpinner } from './MyLibrary';

export default function UserPlaylists() {
  const {
    myPlaylists,
    loading: playlistLoading,
    hasMore: hasMorePlaylists,
    error: playlistError,
    loadMore: loadMorePlaylists
  } = useMyPlaylists();

  const { currentValue: itemType } = useUrl({
    field: 'item_type',
    defaultValue: 'all'
  });

  const playlistScrollRef = useInfiniteScroll({
    loading: playlistLoading,
    hasMore: hasMorePlaylists,
    rootMargin: '200px',
    onLoadMore: loadMorePlaylists
  });

  const renderPlaylists = (entry: LibraryItemPlaylist) => (
    <LibraryItem
      key={entry.playlist_metadata._id}
      playlistPreview={entry.playlist_metadata}
    />
  );

  const playlists = myPlaylists ?? [];

  const show = itemType === 'playlists' || itemType === 'all';

  return (
    <section>
      {show && (
        <>
          {playlists.length && (
            <RenderList data={myPlaylists} render={renderPlaylists} />
          )}

          {playlistLoading && <LoadingSpinner />}

          {!playlistError && hasMorePlaylists && !playlistLoading && (
            <InfiniteScrollTrigger ref={playlistScrollRef} />
          )}
        </>
      )}
    </section>
  );
}
