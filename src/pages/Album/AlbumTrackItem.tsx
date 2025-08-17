import TrackItemMenu from '@/components/menu/TrackItemMenu';
import PlayingBarIcon from '@/components/PlayingBarIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import usePlayContext from '@/hooks/usePlayContext';
import { useTrack } from '@/store/track.store';
import { Track } from '@/types/track.type';
import { trackTimeFormat } from '@/utils/datetime';
import { formatPlayCount } from '@/utils/number';
import { Pause, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function AlbumTrackItem({
  track,
  order
}: {
  track: Track;
  order: number;
}) {
  const { albumId } = useParams();
  const { isSameTrack, handlePlayTrackItem } = usePlayContext({
    id: albumId!,
    type: 'album',
    data: track
  });

  const { isPlaying } = useTrack();
  const itemPlaying = isPlaying && isSameTrack;
  const Icon = itemPlaying ? Pause : Play;

  return (
    <div
      key={track._id}
      className="group p-2 grid grid-cols-12 items-center hover:bg-[#2b2b2b] rounded-sm select-none"
    >
      <div className="col-span-1 text-sm text-[#b3b3b3] flex justify-center">
        <div className="group-hover:hidden">
          {itemPlaying ? <PlayingBarIcon /> : order}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="hidden group-hover:block p-1"
              onClick={handlePlayTrackItem}
            >
              <Icon size={16} fill="#fff" stroke="#fff" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Play {track.title}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="col-span-5">
        <div className="flex items-center gap-4">
          <img
            className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
            src={track.imageUrl}
            alt={track.title}
          />

          <div className="flex flex-col text-[1rem] capitalize">
            <Link
              to={`/tracks/${track._id}`}
              className="hover:underline font-medium text-[1rem]"
            >
              {track.title}
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        {/* Placeholder for album name */}
        <span className="px-4 text-[#b3b3b3] text-sm">
          {formatPlayCount(track.playCount || 0)}
        </span>
      </div>
      <div className="col-span-3">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-[#b3b3b3] text-sm">
            {trackTimeFormat(track.duration || 0)}
          </span>
          <TrackItemMenu tooltipText={track.title} trackId={track._id} />
        </div>
      </div>
    </div>
  );
}
