import useArtistFollows from '@/hooks/useArtistFollows';
import useUrl from '@/hooks/useUrl';
import { ArtistFollowItem } from '@/types/artist.type';
import LibraryArtistItem from './LibraryArtistItem';
import RenderList from './RenderList';

export default function UserFollowArtists() {
  const { artistFollows } = useArtistFollows();
  const { currentValue: itemType } = useUrl({
    field: 'item_type',
    defaultValue: 'all'
  });

  const show = itemType === 'artists' || itemType === 'all';
  const artists = artistFollows ?? [];

  const renderArtists = (artist: ArtistFollowItem) => (
    <LibraryArtistItem key={artist._id} artist={artist} />
  );

  return (
    <section>
      {show && <RenderList data={artists} render={renderArtists} />}
    </section>
  );
}
