import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu';
import { X } from 'lucide-react';
import useUnFollowAlbum from '@/hooks/useUnFollowAlbum';
import { LibraryItemAlbum } from '@/types/libraryItem.type';

export default function LibraryAlbumItem({ item }: { item: LibraryItemAlbum }) {
  const { mutate: unfollow, isPending: isUnfollowing } = useUnFollowAlbum();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          to={`/albums/${item.itemId}`}
          className="group/artist flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2a2a] relative"
        >
          <Avatar className="w-[48px] h-[48px] rounded-full group-hover/artist:opacity-70">
            <AvatarImage
              src={item.album_metadata.coverImage}
              className="object-cover"
            />
          </Avatar>
          <div>
            <h4 className="font-medium capitalize text-[#eee]">
              {item.album_metadata.title}
            </h4>
            <span className="text-[#929092] text-sm capitalize">Album</span>
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          disabled={isUnfollowing}
          onClick={() => unfollow(item.itemId)}
        >
          <X className="text-green-500" /> Unfollow
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
