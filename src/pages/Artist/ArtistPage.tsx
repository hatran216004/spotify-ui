import InfoFooter from '@/layout/InfoFooter';
import { artistServices } from '@/services/artist';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import ArtistTrackItem from './ArtistTrackItem';
import { useDominantColor } from '@/hooks/useDominantColor';
import usePlayContext from '@/hooks/usePlayContext';
import { Track } from '@/types/track.type';

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
          <img
            src={artist.coverUrl}
            alt=""
            hidden
            ref={imgRef}
            crossOrigin="anonymous"
          />
          <div
            className="p-4 h-80 shadow-2xl flex rounded-t-[10px]"
            style={{
              background: `url(${artist.coverUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <div className="space-y-5 mt-auto">
              <span className="text-sm text-white font-medium">Artist</span>
              <h1 className="text-7xl text-white font-bold truncate uppercase">
                {artist.name}
              </h1>
            </div>
          </div>
          {/* Actions */}
          {tracksList!.length > 0 && (
            <>
              <div
                className="p-4"
                style={{
                  background: `linear-gradient(to bottom, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0.6) 0%, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0) 90%)`
                }}
              >
                <div className="flex items-center gap-4">
                  <TogglePlayBackAudio
                    isPlaying={hasTrackPlaying}
                    onPlayAudio={handleStartPlay}
                    hasTooltip={false}
                    variant="primary"
                    size="lg"
                    iconClassname="size-6"
                    className="hover:opacity-100 hover:scale-[1.02]"
                  />
                </div>
              </div>
              <h4 className="text-2xl text-white font-semibold px-4">
                Popular
              </h4>
              <div className="p-4">
                {tracksList!.length > 0 && (
                  <>
                    {tracksList?.map((track, index) => (
                      <ArtistTrackItem
                        index={index + 1}
                        key={track._id}
                        track={track}
                      />
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
      <InfoFooter />
    </div>
  );
}
