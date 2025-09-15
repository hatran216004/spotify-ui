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
import useFollowAlbum from '@/hooks/useFollowAlbum';
import useFollowPlaylist from '@/hooks/useFollowPlaylist';
import useMyPlaylists from '@/hooks/useMyPlaylists';
import useRemoveTrackFromLiked from '@/hooks/useRemoveTrackFromLiked';
import useRemoveTrackFromPlaylist from '@/hooks/useRemoveTrackFromPlaylist';
import useUnFollowAlbum from '@/hooks/useUnFollowAlbum';
import useUnfollowPlaylist from '@/hooks/useUnfollowPlaylist';
import {
  CirclePlus,
  Ellipsis,
  LibraryBig,
  ListEnd,
  Plus,
  Trash
} from 'lucide-react';
import { MdOutlinePlaylistAdd, MdOutlinePlaylistRemove } from 'react-icons/md';
import { useParams } from 'react-router-dom';

type MenuKey =
  | 'add-library'
  | 'add-queue'
  | 'add-liked'
  | 'follow-album'
  | 'unfollow-album'
  | 'follow-playlist'
  | 'unfollow-playlist'
  | 'add-playlist'
  | 'remove-playlist'
  | 'remove-liked';

export default function PlaylistMenu({
  tooltipText,
  trackId = null,
  albumId = null,
  hiddenItems = []
}: {
  tooltipText?: string;
  albumId?: string | null;
  trackId?: string | null;
  hiddenItems?: MenuKey[];
}) {
  const { myPlaylists } = useMyPlaylists();
  const { playlistId } = useParams();
  const { handleAddToPlaylist } = useAddTrackToPlaylist();
  const { handleRemoveFromPlaylist } = useRemoveTrackFromPlaylist();
  const { handleAddTrackToLiked } = useAddTrackToLiked();
  const { handleRemoveTrackFromLiked } = useRemoveTrackFromLiked();
  const { mutate: followPlaylist } = useFollowPlaylist();
  const { mutate: unfollowPlaylist } = useUnfollowPlaylist();
  const { mutate: followAlbum } = useFollowAlbum();
  const { mutate: unfollowAlbum } = useUnFollowAlbum();

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
        {!hiddenItems.includes('add-queue') && (
          <DropdownMenuItem>
            <ListEnd />
            Add to queue
          </DropdownMenuItem>
        )}

        {!hiddenItems.includes('follow-album') && (
          <DropdownMenuItem onClick={() => followAlbum(albumId as string)}>
            <MdOutlinePlaylistAdd />
            Follow album
          </DropdownMenuItem>
        )}

        {!hiddenItems.includes('unfollow-album') && (
          <DropdownMenuItem onClick={() => unfollowAlbum(albumId as string)}>
            <MdOutlinePlaylistRemove />
            Unfollow album
          </DropdownMenuItem>
        )}

        {!hiddenItems.includes('add-liked') && (
          <DropdownMenuItem onClick={() => handleAddTrackToLiked(trackId)}>
            <CirclePlus />
            Add to liked songs
          </DropdownMenuItem>
        )}
        {!hiddenItems.includes('follow-playlist') && (
          <DropdownMenuItem
            onClick={() => followPlaylist(playlistId as string)}
          >
            <MdOutlinePlaylistAdd />
            Follow playlist
          </DropdownMenuItem>
        )}
        {!hiddenItems.includes('unfollow-playlist') && (
          <DropdownMenuItem
            onClick={() => unfollowPlaylist(playlistId as string)}
          >
            <MdOutlinePlaylistRemove />
            Unfollow playlist
          </DropdownMenuItem>
        )}
        {!hiddenItems.includes('add-playlist') && (
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
                      {item.playlist_metadata.name}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )}

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
