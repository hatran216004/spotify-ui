import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ArtistFollowItem } from '@/types/artist.type';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu';
import { X } from 'lucide-react';
import useUnfollowArtist from '@/hooks/useUnfollowArtist';

export default function LibraryArtistItem({
  artist
}: {
  artist: ArtistFollowItem;
}) {
  const { unfollow, isUnfollowing } = useUnfollowArtist();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          to={`/artists/${artist._id}`}
          className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2a2a] relative"
        >
          <Avatar className="w-[48px] h-[48px] rounded-full group-hover:opacity-70">
            <AvatarImage src={artist.avatarUrl} className="object-cover" />
          </Avatar>
          <div>
            <h4 className="font-medium capitalize text-[#eee]">
              {artist.name}
            </h4>
            <span className="text-[#929092] text-sm capitalize">Artist</span>
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          disabled={isUnfollowing}
          onClick={() => unfollow(artist._id)}
        >
          <X className="text-green-500" /> Unfollow
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
