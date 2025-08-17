import { MdPushPin } from 'react-icons/md';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Play } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu';

export default function CollectionTracks({
  isPin,
  onPin
}: {
  isPin: boolean;
  onPin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === '/collection/tracks';

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onClick={() => {
            navigate('/collection/tracks');
          }}
          className={clsx(
            'group/playlist flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2a2a] relative',
            isActive && 'bg-[#333]'
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute left-[22px] z-1 hidden group-hover/playlist:block">
                <Play className="fill-white text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent sideOffset={20}>
              <p>Play </p>
            </TooltipContent>
          </Tooltip>

          <Avatar className="w-[48px] h-[48px] rounded-[4px] group-hover/playlist:opacity-60">
            <AvatarImage
              src="https://misc.scdn.co/liked-songs/liked-songs-64.png"
              className="object-cover"
            />
          </Avatar>

          <div>
            <h4
              className={clsx(
                'font-medium',
                isActive ? 'text-[#1db954]' : 'text-[#eee]'
              )}
            >
              Liked Songs
            </h4>
            <div className="text-[#929092] text-sm capitalize flex items-center gap-1">
              <MdPushPin
                size={18}
                className={`rotate-50 ${
                  isPin ? 'text-green-500' : 'text-[#eee]'
                }`}
              />{' '}
              Playlist . 2 songs
            </div>
          </div>

          {/* {hasItemPlaying && (
            <Volume2
              size={18}
              className="absolute right-2.5"
              fill="#1db954"
              stroke="#1db954"
            />
          )} */}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() =>
            onPin((prev) => {
              localStorage.setItem('pin-playlist', `${!prev}`);
              return !prev;
            })
          }
        >
          <MdPushPin
            className={`rotate-50 ${
              isPin ? 'text-green-500' : 'text-[#eee] size-5'
            }`}
          />
          {isPin ? 'Unpin playlist' : 'Pin playlist'}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
