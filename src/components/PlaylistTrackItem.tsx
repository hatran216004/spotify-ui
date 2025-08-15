import { trackTimeFormat } from '@/utils/datetime';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Pause, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTrack } from '@/store/track.store';
import PlayingBarIcon from './PlayingBarIcon';
import TrackItemMenu from './menu/TrackItemMenu';
import { ParamsStartDragType } from './PlaylistTracksContent';
import { Track } from '@/types/track.type';
import { useMutation } from '@tanstack/react-query';
import { playerServices } from '@/services/player';

type TrackItemType = {
  track: Track;
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
  const { playlistId } = useParams();
  const { mutate: playTrack, isPending } = useMutation({
    mutationFn: playerServices.startPlayTrack
  });
  const { handlePlayTrack } = useTrack();

  const handlePlayTrackItem = () => {
    handlePlayTrack(track);
    playTrack(
      {
        contextId: playlistId!,
        contextType: 'playlist',
        trackId: track._id
      },
      {
        onError: (error) => {
          console.log(error);
        }
      }
    );
  };

  const viewMode = localStorage.getItem('playlist_view_mode') || 'list';
  const isViewCompact = viewMode === 'compact';

  return (
    <li
      data-track-row
      onMouseDown={(e) =>
        onMouseDown({
          e,
          trackId: track._id,
          trackIndex: order
        })
      }
      ref={ref}
      className="group p-1 grid grid-cols-12 items-center hover:bg-[#2b2b2b] rounded-sm select-none"
    >
      <div className="col-span-1 text-sm text-[#b3b3b3] flex justify-center">
        <div className="group-hover:hidden">
          {/* {isItemPlaying ? <PlayingBarIcon /> : order + 1} */}
          {order + 1}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              disabled={isPending}
              className="hidden group-hover:block p-1"
              onClick={handlePlayTrackItem}
            >
              <Play size={16} fill="#fff" stroke="#fff" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Play {track.title}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="col-span-5">
        <div className="flex items-center gap-4">
          {!isViewCompact && (
            <img
              className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
              src={track.imageUrl}
              alt={track.title}
            />
          )}

          <div className="flex flex-col text-[1rem] capitalize">
            <Link
              to={`/tracks/${track._id}`}
              className="hover:underline font-medium text-[1rem]"
            >
              {track.title}
            </Link>
            {!isViewCompact && (
              <h3 className="text-[#b3b3b3] text-sm">
                {track.artists?.[0].name}
              </h3>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-3">
        {/* Placeholder for album name */}
        <h3 className="px-4 text-[#b3b3b3] text-sm">
          {track.artists?.[0].name}
        </h3>
      </div>
      <div className="col-span-3">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-[#b3b3b3] text-sm">
            {trackTimeFormat(track.duration || 0)}
          </span>
          <TrackItemMenu tooltipText={track.title} trackId={track._id} />
        </div>
      </div>
    </li>
  );
}
