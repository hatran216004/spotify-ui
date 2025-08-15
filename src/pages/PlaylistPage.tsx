import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { trackTimeFormat } from '@/utils/datetime';
import { Check, Ellipsis } from 'lucide-react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TfiMenuAlt } from 'react-icons/tfi';
import { HiMenu } from 'react-icons/hi';
import MenuItem from '@/components/MenuItem';
import { type ViewMode } from '@/types/utils.type';
import PlaylistTracksHeading from '@/components/PlaylistTracksHeading';
import PlaylistTracks from '@/components/PlaylistTracks';
import PlaylistTracksContent from '@/components/PlaylistTracksContent';
import InfoFooter from '@/layout/InfoFooter';
import usePlaylistById from '@/hooks/usePlaylistById';
import { FaMusic } from 'react-icons/fa';
import { useUserStore } from '@/store/ui.store';
import { useUser } from '@clerk/clerk-react';
import { useDominantColor } from '@/hooks/useDominantColor';
import usePlayContext from '@/hooks/usePlayContext';
import { Track } from '@/types/track.type';

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const { playlist, isLoading } = usePlaylistById(playlistId!);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const { color } = useDominantColor(imgRef, playlist);

  const { user } = useUserStore();
  const { user: clerkUser } = useUser();

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const value = localStorage.getItem('playlist_view_mode') as ViewMode;
    return value ? value : 'list';
  });

  const { handleStartPlay, hasTrackPlaying } = usePlayContext({
    id: playlistId!,
    type: 'playlist',
    data: playlist?.tracks?.map((entry) => entry.track) as Track[]
  });

  const handleChangeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('playlist_view_mode', mode);
  };

  if (isLoading) return null;

  const playlistTrackLength = playlist?.tracks.length ?? 0;
  const viewList = viewMode === 'list';
  const viewCompact = viewMode === 'compact';

  return (
    <div className="h-full overflow-auto rounded-[10px]">
      {playlist && (
        <div
          style={{
            background: `linear-gradient(to bottom, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0.6) 0%, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0) 70%)`
          }}
        >
          <div className="px-4 shadow-2xl py-[18px] rounded-tl-[10px] rounded-tr-[10px]">
            <div className="grid grid-cols-12 gap-5 items-end">
              <div className="col-span-3">
                <div className="pt-[100%] relative rounded-sm overflow-hidden">
                  {playlist.coverImage ? (
                    <img
                      ref={imgRef}
                      crossOrigin="anonymous"
                      src={playlist.coverImage}
                      className="absolute w-full h-full top-0 left-0 object-cover"
                      alt={playlist.name}
                    />
                  ) : (
                    <div className="absolute w-full h-full top-0 left-0 bg-[#282828] flex items-center justify-center">
                      <FaMusic color="#929092" size={72} />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-9">
                <div className="space-y-5">
                  <span className="text-sm text-white font-medium">
                    Playlist
                  </span>
                  <h1 className="text-7xl text-white font-bold truncate uppercase">
                    {playlist.name}
                  </h1>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <img
                      src={
                        user?.avatarUrl ? user.avatarUrl : clerkUser?.imageUrl
                      }
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <h1 className="hover:underline">
                      {playlist.user.username}
                    </h1>
                    <span>
                      • {playlist.tracks!.length} track
                      {playlist.tracks!.length > 1 && 's'}
                    </span>
                    <span>• {trackTimeFormat(playlist.totalDuration!)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          {playlistTrackLength > 0 && (
            <>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <TogglePlayBackAudio
                    isPlaying={hasTrackPlaying}
                    onPlayAudio={handleStartPlay}
                    hasTooltip={false}
                    variant="primary"
                    size="lg"
                    iconClassname="size-6"
                    className="hover:opacity-100 hover:scale-[1.02]"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="group p-1 cursor-pointer">
                        <Ellipsis
                          size={32}
                          className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More options for {playlist.name}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="font-semibold flex items-center gap-2 text-sm text-[#929092] hover:text-white cursor-pointer ml-auto">
                        {viewMode === 'list' ? 'List' : 'Compact'}{' '}
                        <TfiMenuAlt />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end">
                      <span className="block p-2 text-xs">View as</span>
                      <MenuItem
                        icon={<HiMenu />}
                        iconSide="start"
                        onClick={() => handleChangeViewMode('compact')}
                        className={`${viewCompact ? 'text-green-500' : ''}`}
                      >
                        Compact
                        {viewCompact && <Check className="ml-auto" size={18} />}
                      </MenuItem>
                      <MenuItem
                        icon={<TfiMenuAlt />}
                        iconSide="start"
                        onClick={() => handleChangeViewMode('list')}
                        className={`${viewList ? 'text-green-500' : ''}`}
                      >
                        List
                        {viewList && <Check className="ml-auto" size={18} />}
                      </MenuItem>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <PlaylistTracks>
                <PlaylistTracksHeading />
                <PlaylistTracksContent
                  playlistTracks={playlist.tracks}
                  playlistId={playlist._id as string}
                />
              </PlaylistTracks>
            </>
          )}
        </div>
      )}
      <InfoFooter />
    </div>
  );
}
