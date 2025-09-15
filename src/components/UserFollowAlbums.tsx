import useUrl from '@/hooks/useUrl';
import { albumServices } from '@/services/album';
import { LibraryItemAlbum } from '@/types/libraryItem.type';
import { useQuery } from '@tanstack/react-query';
import RenderList from './RenderList';
import LibraryAlbumItem from './LibraryAlbumItem';

export default function UserFollowAlbums() {
  const { data, isLoading } = useQuery({
    queryKey: ['follow-albums'],
    queryFn: albumServices.getUserFollowAlbums
  });

  const { currentValue: itemType } = useUrl({
    field: 'item_type',
    defaultValue: 'all'
  });

  const show = itemType === 'albums' || itemType === 'all';
  const albums = data?.data?.data?.items ?? [];

  const renderAlbums = (item: LibraryItemAlbum) => (
    <LibraryAlbumItem key={item.album_metadata._id} item={item} />
  );

  if (isLoading) return null;

  return (
    <section>
      {show && <RenderList data={albums} render={renderAlbums} />}
    </section>
  );
  return;
}
