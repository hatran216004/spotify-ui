import InfoFooter from '@/layout/InfoFooter';
import { useUserStore } from '@/store/ui.store';
import { useQuery } from '@tanstack/react-query';
import { playlistServices } from '@/services/playlist';
import usePlayContext from '@/hooks/usePlayContext';
import CollectionHeader from './CollectionHeader';
import CollectionActions from './CollectionActions';
import CollectionTracksTable from './CollectionTracksTable';

export default function CollectionPage() {
  const { user } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ['liked-tracks', user?._id],
    queryFn: playlistServices.getMeLikedTracks
  });

  const likedTracks = data?.data?.data?.tracks;
  const likedTracksLength = likedTracks?.length ?? 0;

  const { handleStartPlay, hasTrackPlaying } = usePlayContext({
    id: null,
    type: 'liked_tracks',
    data: likedTracks?.map((entry) => entry.track)
  });

  if (isLoading || !likedTracks) return null;

  return (
    <div className="h-full overflow-auto rounded-[10px] bg-gradient-to-b from-[#4c3894] from-0% to-60%">
      <div>
        <CollectionHeader likedTracksLength={likedTracksLength} />
        {likedTracksLength > 0 && (
          <>
            <CollectionActions
              hasTrackPlaying={hasTrackPlaying}
              handleStartPlay={handleStartPlay}
            />
            <CollectionTracksTable likedTracks={likedTracks} />
          </>
        )}
      </div>
      <InfoFooter />
    </div>
  );
}
