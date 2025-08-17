import InfoFooter from '@/layout/InfoFooter';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import usePlayContext from '@/hooks/usePlayContext';
import AlbumHeader from './AlbumHeader';
import AlbumActions from './AlbumActions';
import AlbumTable from './AlbumTable';
import { albumServices } from '@/services/album';

export default function ArtistPage() {
  const { albumId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['album', albumId],
    queryFn: () => albumServices.getAlbum(albumId!),
    enabled: !!albumId
  });

  const album = data?.data?.data?.album;
  const tracksList = album?.tracks;

  console.log(tracksList);

  const { handleStartPlay, hasTrackPlaying } = usePlayContext({
    id: albumId!,
    type: 'album',
    data: tracksList
  });

  if (isLoading) return null;

  return (
    <div className="h-full overflow-auto rounded-[10px]">
      {album && (
        <div>
          <AlbumHeader album={album} />
          {/* Actions */}
          {tracksList && tracksList.length > 0 && (
            <>
              <AlbumActions
                handleStartPlay={handleStartPlay}
                hasTrackPlaying={hasTrackPlaying}
                albumName={album.title}
              />

              <AlbumTable tracksList={tracksList} />
            </>
          )}
        </div>
      )}
      <InfoFooter />
    </div>
  );
}
