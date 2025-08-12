import { trackTimeFormat } from '@/utils/datetime';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Grip, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSong } from '@/store/song.store';
import PlayingBarIcon from './PlayingBarIcon';
import TrackItemMenu from './menu/TrackItemMenu';
import { PlaylistItem } from '@/types/playlist.type';

export default function TrackItem({
  track,
  order = 0
}: {
  playlistId?: string;
  track?: PlaylistItem;
  order?: number;
}) {
  const {
    currentPlaylistItemId,
    isPlaying,
    currentSong,
    setCurrentPlaylistItemId,
    togglePlayBack,
    handlePlaySong
  } = useSong();

  const isItemPlaying =
    isPlaying &&
    track?._id === currentPlaylistItemId &&
    track?.songId._id === currentSong?._id;
  const Icon = isItemPlaying ? Pause : Play;

  const handlePlayItem = () => {
    // TODO: Nếu bài hát đang phát là bài hát click và ở 1 playlist khác thì phát lại từ đầu, ngược lại toggle
    if (!currentPlaylistItemId) {
      handlePlaySong(track!.songId);
      setCurrentPlaylistItemId(track!._id);
      return;
    }

    const isSamePlaylistItem = track?._id === currentPlaylistItemId;
    if (isSamePlaylistItem) {
      togglePlayBack();
    } else {
      handlePlaySong(track!.songId, true);
    }
    setCurrentPlaylistItemId(track!._id);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log('start drag');
  };

  const handleDragging = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log('dragging');
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log('end drag');
  };

  return (
    <li className="group p-1 grid grid-cols-12 items-center hover:bg-[#2b2b2b] rounded-sm">
      <div className="col-span-1 text-sm text-[#b3b3b3] flex justify-center">
        <div className="group-hover:hidden">
          {isItemPlaying ? <PlayingBarIcon /> : order + 1}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="hidden group-hover:block p-1"
              onClick={handlePlayItem}
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
            className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
            src={track?.songId.imageUrl}
            alt={track?.songId.title}
          />
          <div className="flex flex-col text-[1rem] capitalize">
            <Link
              to={`/songs/${track?.songId._id}`}
              className="hover:underline font-medium text-[1rem]"
            >
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
          <TrackItemMenu
            tooltipText={track?.songId.title}
            songId={track?.songId._id}
          />
          <button className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
            <Grip
              size={18}
              className="text-[#929092] group-hover:text-white cursor-pointer"
            />
          </button>
        </div>
      </div>
    </li>
  );
}
