import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Play, Volume2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Playlist as PlaylistType } from '@/types/playlist.type';
import { useSong } from '@/store/song.store';

export default function Playlist({ playlist }: { playlist: PlaylistType }) {
  const { playlistId } = useParams();
  const { currentSong, isPlaying } = useSong();

  const isActive = playlistId === playlist._id;
  const hasSongPlaying =
    isPlaying && playlist.songs?.some((s) => s.songId._id === currentSong?._id);

  return (
    <Link
      to={`/playlists/${playlist._id}`}
      className={clsx(
        'group/playlist flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2a2a] relative',
        isActive && 'bg-[#333]'
      )}
    >
      {isActive && (
        <Tooltip>
          <TooltipTrigger className="absolute left-[22px] z-1">
            <Play className="fill-white text-white" />
          </TooltipTrigger>
          <TooltipContent sideOffset={20}>
            <p>Play {playlist.name}</p>
          </TooltipContent>
        </Tooltip>
      )}

      <Avatar className="w-[48px] h-[48px] rounded-[4px] group-hover/playlist:opacity-60">
        <AvatarImage src={playlist.coverImage} className="object-cover" />
      </Avatar>
      <div>
        <h4
          className={clsx(
            'font-medium',
            isActive ? 'text-[#1db954]' : 'text-[#eee]'
          )}
        >
          {playlist.name}
        </h4>
        <span className="text-[#929092] text-sm capitalize">
          Playlist . {playlist.userId?.username}
        </span>
      </div>

      {hasSongPlaying && (
        <Volume2
          size={18}
          className="absolute right-2.5"
          fill="#1db954"
          stroke="#1db954"
        />
      )}
    </Link>
  );
}
