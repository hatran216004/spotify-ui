import DotIndicator from '@/components/DotIndicator';
import { songServices } from '@/services/song';
import { formatDate } from '@/utils/date';
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
import { CirclePlus, Ellipsis } from 'lucide-react';
import { useSong } from '@/store/song.store';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';

export default function SongPage() {
  const { songId } = useParams();

  const imgRef = useRef<HTMLImageElement | null>(null);

  const { isPlaying, currentSong, setCurrentSong, handlePlaySong } = useSong();
  const [bgColor, setBgColor] = useState<[number, number, number]>();

  const { data, isLoading } = useQuery({
    queryKey: ['track', songId],
    queryFn: () => songServices.getSong(songId!)
  });

  // Set song data from api
  useEffect(() => {
    if (currentSong) return;

    const songData = data?.data.data?.song;
    if (songData) {
      setCurrentSong(songData);
    }
  }, [data, currentSong, setCurrentSong]);

  // Set background with main color of song image
  useEffect(() => {
    if (!currentSong && !data?.data.data.song.imageUrl) return;

    const imgElement = imgRef.current;
    if (!imgElement) return;

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
  }, [data, currentSong]);

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <DotIndicator />
      </div>
    );

  const song = data?.data.data.song || currentSong;

  return (
    <>
      {song && (
        <div>
          <div
            className="px-4 shadow-2xl py-[18px] rounded-tl-[10px] rounded-tr-[10px]"
            style={{
              background: `linear-gradient(to bottom, rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0.8), rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0))`
            }}
          >
            <div className="grid grid-cols-12 gap-5 items-end">
              <div className="col-span-3">
                <div className="pt-[100%] relative rounded-sm overflow-hidden">
                  <img
                    crossOrigin="anonymous"
                    ref={imgRef}
                    src={song.imageUrl}
                    className="absolute w-full h-full top-0 left-0 object-cover"
                    alt={song.title}
                  />
                </div>
              </div>
              <div className="col-span-9">
                <div className="space-y-5">
                  <span className="text-sm text-white font-medium">Song</span>
                  <h1 className="text-7xl text-white font-bold truncate">
                    {song.title}
                  </h1>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <img
                      src="https://i.pinimg.com/736x/5a/8b/4a/5a8b4ad79109e1c3d21d29cbd0a23ac8.jpg"
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    {song.artists?.map((artist) => (
                      <Link to="#" className="hover:underline" key={artist._id}>
                        {artist.name}
                      </Link>
                    ))}
                    <span>• {formatDate(song.releaseDate!)}</span>
                    <span>• {formatPlayCount(song.playCount!)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="p-4">
            <div className="flex items-center gap-4">
              <TogglePlayBackAudio
                onPlayAudio={() => handlePlaySong(song)}
                isPlaying={isPlaying && currentSong?._id === song._id}
                hasTooltip={false}
                variant="primary"
                size="lg"
                iconClassname="size-6"
                className="hover:opacity-100 hover:scale-[1.02]"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="group p-1 cursor-pointer">
                    <CirclePlus
                      size={24}
                      className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save to your library</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="group p-1 cursor-pointer">
                    <Ellipsis
                      size={24}
                      className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More options for {song.title}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
