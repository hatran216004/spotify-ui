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
import ColorThief from 'colorthief';
import { Check, Ellipsis } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TfiMenuAlt } from 'react-icons/tfi';
import { HiMenu } from 'react-icons/hi';
import MenuItem from '@/components/MenuItem';
import { PlaylistViewMode as PlaylistViewModeType } from '@/types/utils.type';
import TrackListHeader from '@/components/TrackListHeader';
import TrackList from '@/components/TrackList';
import TrackListContent from '@/components/TrackListContent';
import RenderList from '@/components/RenderList';
import TrackItem from '@/components/TrackItem';
import { useSong } from '@/store/song.store';
import { Song } from '@/types/song.type';
import InfoFooter from '@/layout/InfoFooter';
import usePlaylistById from '@/hooks/usePlaylistById';

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [bgColor, setBgColor] = useState<[number, number, number]>();
  const [playlistViewMode, setPlaylistViewMode] =
    useState<PlaylistViewModeType>(() => {
      const viewMode = JSON.parse(
        localStorage.getItem('playlist_view-mode') as PlaylistViewModeType
      );
      return viewMode ? viewMode : 'list';
    });

  const {
    isPlaying,
    currentPlaylistItemId,
    handlePlaySong,
    togglePlayBack,
    setCurrentPlaylistItemId
  } = useSong();

  const { playlist, isLoading } = usePlaylistById(playlistId!);

  const handleChangeViewMode = () => {
    setPlaylistViewMode((prevMode) =>
      prevMode === 'list' ? 'compact' : 'list'
    );
  };

  useEffect(() => {
    if (!playlist) return;

    const firstTrack = playlist.songs?.[0];
    const imgElement = imgRef.current;
    if (!firstTrack || !imgElement) return;

    const colorThief = new ColorThief();

    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(imgElement);
      setBgColor([r, g, b]);
    };

    imgElement.addEventListener('load', handleLoad);
    return () => {
      imgElement.removeEventListener('load', handleLoad);
    };
  }, [playlist]);

  if (isLoading) return null;
  const itemPlaying = playlist!.songs?.some(
    (entry) => entry._id === currentPlaylistItemId
  );

  const hasItemPlaying = isPlaying && itemPlaying;

  return (
    <div className="h-full overflow-auto rounded-[10px]">
      {playlist && (
        <div
          style={{
            background: `linear-gradient(to bottom, rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0.6) 0%, rgba(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]},0) 70%)`
          }}
        >
          <div className="px-4 shadow-2xl py-[18px] rounded-tl-[10px] rounded-tr-[10px]">
            <div className="grid grid-cols-12 gap-5 items-end">
              <div className="col-span-3">
                <div className="pt-[100%] relative rounded-sm overflow-hidden">
                  <img
                    ref={imgRef}
                    crossOrigin="anonymous"
                    src={playlist.coverImage}
                    className="absolute w-full h-full top-0 left-0 object-cover"
                    alt={playlist.name}
                  />
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
                      src="https://i.pinimg.com/736x/5a/8b/4a/5a8b4ad79109e1c3d21d29cbd0a23ac8.jpg"
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <h1 className="hover:underline">
                      {playlist.userId?.username}
                    </h1>
                    <span>
                      • {playlist.songs!.length} song
                      {playlist.songs!.length > 1 && 's'}
                    </span>
                    <span>• {trackTimeFormat(playlist.totalDuration!)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="p-4">
            <div className="flex items-center gap-4">
              <TogglePlayBackAudio
                isPlaying={isPlaying && hasItemPlaying}
                onPlayAudio={() => {
                  if (itemPlaying) {
                    togglePlayBack();
                  } else {
                    handlePlaySong(playlist.songs?.[0].songId as Song);
                    setCurrentPlaylistItemId(playlist.songs![0]?._id);
                  }
                }}
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
                    List <TfiMenuAlt />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end">
                  <span className="block p-2 text-xs">View as</span>
                  <MenuItem
                    icon={<HiMenu />}
                    iconSide="start"
                    onClick={handleChangeViewMode}
                    className={`${
                      playlistViewMode === 'compact' ? 'text-green-500' : ''
                    }`}
                  >
                    Compact
                    {playlistViewMode === 'compact' && (
                      <Check className="ml-auto" size={18} />
                    )}
                  </MenuItem>
                  <MenuItem
                    icon={<TfiMenuAlt />}
                    iconSide="start"
                    onClick={handleChangeViewMode}
                    className={`${
                      playlistViewMode === 'list' ? 'text-green-500' : ''
                    }`}
                  >
                    List
                    {playlistViewMode === 'list' && (
                      <Check className="ml-auto" size={18} />
                    )}
                  </MenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* Tracks list */}
          {playlist.songs!.length > 0 && (
            <TrackList>
              <TrackListHeader />
              <TrackListContent>
                <RenderList
                  data={playlist.songs || []}
                  render={(track) => (
                    <TrackItem
                      playlistId={playlist._id}
                      track={track}
                      order={track.order}
                      key={track._id}
                    />
                  )}
                />
              </TrackListContent>
            </TrackList>
          )}
        </div>
      )}
      <InfoFooter />
    </div>
  );
}
