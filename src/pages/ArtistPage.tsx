import InfoFooter from '@/layout/InfoFooter';
import { artistServices } from '@/services/artist';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import ColorThief from 'colorthief';
import { useEffect, useRef, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Pause, Play } from 'lucide-react';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import { formatPlayCount } from '@/utils/number';
import TrackItemMenu from '@/components/menu/TrackItemMenu';
import { trackTimeFormat } from '@/utils/datetime';
import { useSong } from '@/store/song.store';
import PlayingBarIcon from '@/components/PlayingBarIcon';

export default function ArtistPage() {
  const { isPlaying, currentSong, handlePlaySong, togglePlayBack } = useSong();
  const { artistId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => artistServices.getArtist(artistId!),
    enabled: !!artistId
  });

  const { data: data2, isPending } = useQuery({
    queryKey: ['artist-popular-songs', artistId],
    queryFn: () => artistServices.getPopularArtistSongs(artistId!)
  });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [bgColor, setBgColor] = useState<[number, number, number]>();

  const handlePlay = () => {
    if (hasSongPlaying) {
      togglePlayBack();
    } else {
      const firstSong = popularSongs![0];
      handlePlaySong(firstSong);
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
  const popularSongs = data2?.data.data.songs.map((song) => ({
    ...song,
    artists: [artist!]
  }));
  const hasSongPlaying =
    isPlaying && popularSongs?.some((ele) => ele._id === currentSong?._id);

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
          {popularSongs!.length > 0 && (
            <>
              <div
                className="p-4"
                style={{
                  background: `linear-gradient(to bottom, rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0.6) 0%, rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0) 90%)`
                }}
              >
                <div className="flex items-center gap-4">
                  <TogglePlayBackAudio
                    isPlaying={hasSongPlaying}
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
                {popularSongs!.length > 0 && (
                  <>
                    {popularSongs?.map((song, index) => {
                      const itemPlaying =
                        isPlaying && currentSong?._id === song._id;
                      return (
                        <div
                          key={song._id}
                          className="group p-2 grid grid-cols-12 items-center hover:bg-[#2b2b2b] rounded-sm select-none"
                        >
                          <div className="col-span-1 text-sm text-[#b3b3b3] flex justify-center">
                            <div className="group-hover:hidden">
                              {itemPlaying ? <PlayingBarIcon /> : index + 1}
                            </div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="hidden group-hover:block p-1"
                                  onClick={() => handlePlaySong(song)}
                                >
                                  {itemPlaying ? (
                                    <Pause
                                      size={16}
                                      fill="#fff"
                                      stroke="#fff"
                                    />
                                  ) : (
                                    <Play size={16} fill="#fff" stroke="#fff" />
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Play {song.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="col-span-5">
                            <div className="flex items-center gap-4">
                              <img
                                className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                                src={song.imageUrl}
                                alt={song.title}
                              />

                              <div className="flex flex-col text-[1rem] capitalize">
                                <Link
                                  to={`/songs/${song._id}`}
                                  className="hover:underline font-medium text-[1rem]"
                                >
                                  {song.title}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3">
                            {/* Placeholder for album name */}
                            <span className="px-4 text-[#b3b3b3] text-sm">
                              {formatPlayCount(song.playCount || 0)}
                            </span>
                          </div>
                          <div className="col-span-3">
                            <div className="flex items-center gap-2 justify-end">
                              <span className="text-[#b3b3b3] text-sm">
                                {trackTimeFormat(song.duration || 0)}
                              </span>
                              <TrackItemMenu
                                tooltipText={song.title}
                                songId={song._id}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
