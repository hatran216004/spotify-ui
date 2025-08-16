import InfoFooter from '@/layout/InfoFooter';
import { artistServices } from '@/services/artist';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useDominantColor } from '@/hooks/useDominantColor';
import usePlayContext from '@/hooks/usePlayContext';
import { Track } from '@/types/track.type';
import ArtistHeader from './ArtistHeader';
import ArtistActions from './ArtistActions';
import ArtistTable from './ArtistTable';

export default function ArtistPage() {
  const { artistId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => artistServices.getArtist(artistId!),
    enabled: !!artistId
  });

  const { data: artistPopularTracks, isPending } = useQuery({
    queryKey: ['artist-popular-tracks', artistId],
    queryFn: () => artistServices.getPopularArtistTracks(artistId!)
  });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const { color } = useDominantColor(imgRef, artistPopularTracks);

  const artist = data?.data?.data?.artist;
  const tracksList = artistPopularTracks?.data?.data?.tracks.map(
    (track) => track
  ) as Track[];

  const { handleStartPlay, hasTrackPlaying } = usePlayContext({
    id: artistId!,
    type: 'artist',
    data: tracksList
  });

  if (isLoading || isPending) return null;

  return (
    <div className="h-full overflow-auto rounded-[10px]">
      {artist && (
        <div>
          <ArtistHeader
            artistName={artist.name}
            coverUrl={artist.coverUrl}
            imgRef={imgRef}
          />
          {/* Actions */}
          {tracksList && tracksList.length > 0 && (
            <>
              <div
                className="p-4"
                style={{
                  background: `linear-gradient(to bottom, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0.6) 0%, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0) 90%)`
                }}
              >
                <ArtistActions
                  handleStartPlay={handleStartPlay}
                  hasTrackPlaying={hasTrackPlaying}
                />
              </div>
              <h4 className="text-2xl text-white font-semibold px-4">
                Popular
              </h4>
              <ArtistTable tracksList={tracksList} />
            </>
          )}
        </div>
      )}
      <InfoFooter />
    </div>
  );
}
