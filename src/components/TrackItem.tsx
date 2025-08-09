import { trackTimeFormat } from '@/utils/datetime';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Ellipsis, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Song } from '@/types/song.type';
import { useSong } from '@/store/song.store';

export default function TrackItem({
  track,
  order = 0
}: {
  track?: { songId: Song };
  order?: number;
}) {
  const { currentSong, isPlaying, handlePlaySong } = useSong();

  const isCurrentTrackPlaying =
    isPlaying && currentSong?._id === track?.songId._id;
  const Icon = isCurrentTrackPlaying ? Pause : Play;

  return (
    <li className="group p-1 grid grid-cols-12 items-center hover:bg-[#2b2b2b] rounded-sm">
      <div className="col-span-1 text-sm text-[#b3b3b3] flex justify-center">
        <span className="group-hover:hidden">{order + 1}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="hidden group-hover:block p-1"
              onClick={() => handlePlaySong(track?.songId as Song)}
            >
              <Icon size={16} fill="#fff" stroke="#fff" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Play {track?.songId.title}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="col-span-5">
        <div className="flex items-center gap-4">
          <img
            className="w-10 h-10 object-cover rounded-sm"
            src={track?.songId.imageUrl}
            alt={track?.songId.title}
          />
          <div className="flex flex-col text-[1rem] capitalize">
            <Link to={`songs/`} className="hover:underline font-light">
              {track?.songId.title}
            </Link>
            <h3 className="text-[#b3b3b3] text-sm">
              {track?.songId.artists?.[0].name}
            </h3>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        {/* Placeholder for album name */}
        <h3 className="px-4 text-[#b3b3b3] text-sm">
          {track?.songId.artists?.[0].name}
        </h3>
      </div>
      <div className="col-span-3">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-[#b3b3b3] text-sm">
            {trackTimeFormat(track?.songId.duration || 0)}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="group p-1 cursor-pointer">
                <Ellipsis
                  size={18}
                  className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options for {track?.songId.title}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </li>
  );
}
