import InfoFooter from '@/layout/InfoFooter';
import { artistServices } from '@/services/artist';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ColorThief from 'colorthief';
import { useEffect, useRef, useState } from 'react';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import { useTrack } from '@/store/track.store';
import Item from './Item';

export default function ArtistPage() {
  const { isPlaying, currentTrack, handlePlayTrack, togglePlayBack } =
    useTrack();
  const { artistId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => artistServices.getArtist(artistId!),
    enabled: !!artistId
  });

  const { data: data2, isPending } = useQuery({
    queryKey: ['artist-popular-tracks', artistId],
    queryFn: () => artistServices.getPopularArtistTracks(artistId!)
  });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [bgColor, setBgColor] = useState<[number, number, number]>();

  const handlePlay = () => {
    if (hasTrackPlaying) {
      togglePlayBack();
    } else {
      const firstTrack = popularTracks![0];
      handlePlayTrack(firstTrack);
    }
  };

  useEffect(() => {
    if (!data2) return;

    const imgElement = imgRef.current;
    if (!imgElement) return;

    const colorThief = new ColorThief();

    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(imgElement);
      setBgColor([r, g, b]);
    };

    imgElement.addEventListener('load', handleLoad);
    return () => {
      imgElement.removeEventListener('load', handleLoad);
    };
  }, [data2]);

  if (isLoading || isPending) return null;
  const artist = data?.data.data.artist;
  const popularTracks = data2?.data.data.tracks.map((track) => ({
    ...track,
    artists: [artist!]
  }));
  const hasTrackPlaying =
    isPlaying && popularTracks?.some((ele) => ele._id === currentTrack?._id);

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
          {popularTracks!.length > 0 && (
            <>
              <div
                className="p-4"
                style={{
                  background: `linear-gradient(to bottom, rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0.6) 0%, rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0) 90%)`
                }}
              >
                <div className="flex items-center gap-4">
                  <TogglePlayBackAudio
                    isPlaying={hasTrackPlaying}
                    onPlayAudio={handlePlay}
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
                {popularTracks!.length > 0 && (
                  <>
                    {popularTracks?.map((track, index) => (
                      <Item index={index} key={track._id} track={track} />
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
