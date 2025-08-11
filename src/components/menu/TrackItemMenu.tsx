import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import useRemoveTrackFromPlaylist from '@/hooks/useRemoveTrackFromPlaylist';
import { Ellipsis, LibraryBig, ListEnd, Trash } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function TrackItemMenu({
  tooltipText,
  songId
}: {
  tooltipText?: string;
  songId?: string;
}) {
  const { playlistId } = useParams();
  const { handleRemoveFromPlaylist } = useRemoveTrackFromPlaylist();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="group p-1 cursor-pointer outline-none">
              <Ellipsis
                size={24}
                className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
              />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>More options for {tooltipText}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="center">
        <DropdownMenuItem>
          <LibraryBig />
          Add to Your Library
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ListEnd />
          Add to queue
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleRemoveFromPlaylist({ songId, playlistId })}
        >
          <Trash /> Remove from this playlist
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
