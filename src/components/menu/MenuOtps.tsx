import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import useAddTrackToPlaylist from '@/hooks/useAddTrackToPlaylist';
import useMyPlaylists from '@/hooks/useMyPlaylists';
import { Ellipsis, LibraryBig, ListEnd, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function MenuOtps({ tooltipText }: { tooltipText?: string }) {
  const { myPlaylists } = useMyPlaylists();
  const { songId } = useParams();
  const { handleAddToPlaylist } = useAddTrackToPlaylist();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="group p-1 cursor-pointer outline-none">
              <Ellipsis
                size={32}
                className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
              />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>More options for {tooltipText}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <LibraryBig />
          Add to Your Library
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ListEnd />
          Add to queue
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Plus className="opacity-40 mx-1" size={18} /> Add to playlist
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Plus /> New playlist
              </DropdownMenuItem>
              {!!myPlaylists &&
                myPlaylists.map((item) => (
                  <DropdownMenuItem
                    key={item._id}
                    onClick={() =>
                      handleAddToPlaylist({ playlistId: item._id, songId })
                    }
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
