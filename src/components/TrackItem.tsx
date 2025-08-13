import { trackTimeFormat } from '@/utils/datetime';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Pause, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useSong } from '@/store/song.store';
import PlayingBarIcon from './PlayingBarIcon';
import TrackItemMenu from './menu/TrackItemMenu';
import { PlaylistItem } from '@/types/playlist.type';
import { ParamsStartDragType } from './TrackListContent';

type TrackItemType = {
  track: PlaylistItem;
  order: number;
  ref?: (ele: HTMLLIElement | null) => void;
  onMouseDown: ({ e, trackId, trackIndex }: ParamsStartDragType) => void;
};

export default function TrackItem({
  track,
  order,
  ref,
  onMouseDown
}: TrackItemType) {
  const viewMode = localStorage.getItem('playlist_view_mode') || 'list';
  const isViewCompact = viewMode === 'compact';
  const { playlistId } = useParams();

  const {
    currentPlaylistItemId,
    isPlaying,
    currentSong,
    setCurrentPlaylistItemId,
    togglePlayBack,
    handlePlaySong,
    setCurrentPlaylistId
  } = useSong();

  const isItemPlaying =
    isPlaying &&
    track?._id === currentPlaylistItemId &&
    track?.songId._id === currentSong?._id;
  const Icon = isItemPlaying ? Pause : Play;

  const handlePlayItem = () => {
    // Nếu bài hát đang phát là bài hát click và ở 1 playlist khác thì phát lại từ đầu, ngược lại toggle
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
    setCurrentPlaylistId(playlistId!);
  };

  return (
    <li
      data-track-row
      onMouseDown={(e) =>
        onMouseDown({
          e,
          trackId: track.songId._id!,
          trackIndex: order
        })
      }
      ref={ref}
      className="group p-1 grid grid-cols-12 items-center hover:bg-[#2b2b2b] rounded-sm select-none"
    >
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
          {!isViewCompact && (
            <img
              className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
              src={track?.songId.imageUrl}
              alt={track?.songId.title}
            />
          )}

          <div className="flex flex-col text-[1rem] capitalize">
            <Link
              to={`/songs/${track?.songId._id}`}
              className="hover:underline font-medium text-[1rem]"
            >
              {track?.songId.title}
            </Link>
            {!isViewCompact && (
              <h3 className="text-[#b3b3b3] text-sm">
                {track?.songId.artists?.[0].name}
              </h3>
            )}
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
        </div>
      </div>
    </li>
  );
}
