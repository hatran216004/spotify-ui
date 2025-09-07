import DotIndicator from '@/components/DotIndicator';
import { trackServices } from '@/services/track';
import { formatDate } from '@/utils/datetime';
import { formatPlayCount } from '@/utils/number';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { CirclePlus } from 'lucide-react';
import { useTrack } from '@/store/track.store';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';

import InfoFooter from '@/layout/InfoFooter';
import { useDominantColor } from '@/hooks/useDominantColor';
import usePlayContext from '@/hooks/usePlayContext';
import TrackItemMenu from '@/components/menu/TrackItemMenu';
import useMyPlaylists from '@/hooks/useMyPlaylists';
import useAddTrackToPlaylist from '@/hooks/useAddTrackToPlaylist';

export default function TrackPage() {
  const { trackId } = useParams();
  const { myPlaylists } = useMyPlaylists();

  const { data, isLoading } = useQuery({
    queryKey: ['track', trackId],
    queryFn: () => trackServices.getTrack(trackId!)
  });

  const { handleAddToPlaylist } = useAddTrackToPlaylist();

  const imgRef = useRef<HTMLImageElement | null>(null);
  const { color } = useDominantColor(imgRef, data);

  const { isPlaying } = useTrack();

  const track = data?.data?.data?.track;
  const { isSameTrack, handlePlayTrackItem } = usePlayContext({
    type: 'search',
    id: trackId || (track?._id as string),
    data: track
  });

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <DotIndicator />
      </div>
    );

  return (
    <div className="h-full overflow-auto rounded-[10px]">
      {track && (
        <div
          style={{
            background: `linear-gradient(to bottom, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0.6), rgba(${color?.[0]},${color?.[1]},${color?.[2]},0))`
          }}
        >
          <div className="px-4 shadow-2xl py-[28px] rounded-tl-[10px] rounded-tr-[10px]">
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
                  <span className="text-sm text-white font-medium">Song</span>
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
                onPlayAudio={handlePlayTrackItem}
                isPlaying={isPlaying && isSameTrack}
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

              <TrackItemMenu
                preset="search"
                context={{
                  children:
                    myPlaylists?.map((p) => ({
                      id: 'add-to-playlist',
                      label: p.name,
                      onClick: () =>
                        handleAddToPlaylist({ trackId, playlistId: p._id })
                    })) ?? []
                }}
                tooltipText={track.title}
                trackId={trackId}
              />
            </div>
          </div>
        </div>
      )}
      <InfoFooter />
    </div>
  );
}
