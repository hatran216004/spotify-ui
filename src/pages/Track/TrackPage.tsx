import DotIndicator from '@/components/DotIndicator';
import { trackServices } from '@/services/track';
import { formatDate } from '@/utils/datetime';
import { formatPlayCount } from '@/utils/number';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ColorThief from 'colorthief';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { CirclePlus } from 'lucide-react';
import { useTrack } from '@/store/track.store';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';

import InfoFooter from '@/layout/InfoFooter';
import MenuOtps from '@/components/menu/MenuOtps';

export default function TrackPage() {
  const { trackId } = useParams();
  const imgRef = useRef<HTMLImageElement | null>(null);

  const { isPlaying, currentTrack, setCurrentTrack, handlePlayTrack } =
    useTrack();
  const [bgColor, setBgColor] = useState<[number, number, number]>();

  const { data, isLoading } = useQuery({
    queryKey: ['track', trackId],
    queryFn: () => trackServices.getTrack(trackId!)
  });

  // Set track data from api
  useEffect(() => {
    if (currentTrack) return;

    const trackData = data?.data.data?.track;
    if (trackData) {
      setCurrentTrack(trackData);
    }
  }, [data, currentTrack, setCurrentTrack]);

  // Set background with main color of track image
  useEffect(() => {
    const imgElement = imgRef.current;
    if ((!currentTrack && !data?.data.data.track.imageUrl) || !imgElement)
      return;

    const colorThief = new ColorThief();

    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(imgElement);
      setBgColor([r, g, b]);
    };

    if (imgElement.complete) {
      handleLoad();
    } else {
      imgElement.addEventListener('load', handleLoad);
    }
    return () => imgElement.removeEventListener('load', handleLoad);
  }, [data, currentTrack]);

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <DotIndicator />
      </div>
    );

  const track = data?.data.data.track || currentTrack;
  return (
    <div className="h-full overflow-auto rounded-[10px]">
      {track && (
        <div
          style={{
            background: `linear-gradient(to bottom, rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0.6), rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0))`
          }}
        >
          <div className="px-4 shadow-2xl py-[18px] rounded-tl-[10px] rounded-tr-[10px]">
            <div className="grid grid-cols-12 gap-5 items-end">
              <div className="col-span-3">
                <div className="pt-[100%] relative rounded-sm overflow-hidden">
                  <img
                    crossOrigin="anonymous"
                    ref={imgRef}
                    src={track.imageUrl}
                    className="absolute w-full h-full top-0 left-0 object-cover"
                    alt={track.title}
                  />
                </div>
              </div>
              <div className="col-span-9">
                <div className="space-y-5">
                  <span className="text-sm text-white font-medium">Track</span>
                  <h1 className="text-6xl text-white font-bold truncate uppercase">
                    {track.title}
                  </h1>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <img
                      src="https://i.pinimg.com/736x/5a/8b/4a/5a8b4ad79109e1c3d21d29cbd0a23ac8.jpg"
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    {track.artists?.map((artist) => (
                      <Link to="#" className="hover:underline" key={artist._id}>
                        {artist.name}
                      </Link>
                    ))}
                    <span>• {formatDate(track.releaseDate!)}</span>
                    <span>• {formatPlayCount(track.playCount!)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="p-4">
            <div className="flex items-center gap-4">
              <TogglePlayBackAudio
                onPlayAudio={() => handlePlayTrack(track, true)}
                isPlaying={isPlaying && currentTrack?._id === track._id}
                hasTooltip={false}
                variant="primary"
                size="lg"
                iconClassname="size-6"
                className="hover:opacity-100 hover:scale-[1.02]"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="group p-1 cursor-pointer outline-none">
                    <CirclePlus
                      size={32}
                      className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save to your library</p>
                </TooltipContent>
              </Tooltip>

              <MenuOtps tooltipText={track.title} />
            </div>
          </div>
        </div>
      )}
      <InfoFooter />
    </div>
  );
}
