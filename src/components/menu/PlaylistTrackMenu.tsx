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
import useAddTrackToLiked from '@/hooks/useAddTrackToLiked';
import useAddTrackToPlaylist from '@/hooks/useAddTrackToPlaylist';
import useMyPlaylists from '@/hooks/useMyPlaylists';
import useRemoveTrackFromLiked from '@/hooks/useRemoveTrackFromLiked';
import useRemoveTrackFromPlaylist from '@/hooks/useRemoveTrackFromPlaylist';
import {
  CirclePlus,
  Ellipsis,
  LibraryBig,
  ListEnd,
  Plus,
  Trash
} from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function PlaylistTrackMenu({
  tooltipText,
  trackId,
  hiddenItems = []
}: {
  tooltipText?: string;
  trackId: string;
  hiddenItems?: string[];
}) {
  const { myPlaylists } = useMyPlaylists();
  const { playlistId } = useParams();
  const { handleAddToPlaylist } = useAddTrackToPlaylist();
  const { handleRemoveFromPlaylist } = useRemoveTrackFromPlaylist();
  const { handleAddTrackToLiked } = useAddTrackToLiked();
  const { handleRemoveTrackFromLiked } = useRemoveTrackFromLiked();

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
        <DropdownMenuItem onClick={() => handleAddTrackToLiked(trackId)}>
          <CirclePlus />
          Add to liked songs
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
                      handleAddToPlaylist({ playlistId: item._id, trackId })
                    }
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {!hiddenItems.includes('remove-playlist') && (
          <DropdownMenuItem
            onClick={() => handleRemoveFromPlaylist({ trackId, playlistId })}
          >
            <Trash />
            Remove from this playlist
          </DropdownMenuItem>
        )}
        {!hiddenItems.includes('remove-liked') && (
          <DropdownMenuItem onClick={() => handleRemoveTrackFromLiked(trackId)}>
            <Trash />
            Remove from liked songs
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
