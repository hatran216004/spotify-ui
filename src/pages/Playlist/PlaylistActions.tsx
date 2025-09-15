import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

import { Check } from 'lucide-react';
import { TfiMenuAlt } from 'react-icons/tfi';
import { HiMenu } from 'react-icons/hi';
import MenuItem from '@/components/MenuItem';
import useViewMode from '@/hooks/useViewMode';
import PlaylistMenu from '@/components/menu/PlaylistMenu';

export default function PlaylistActions({
  playlistName,
  hasTrackPlaying,
  handleStartPlay
}: {
  playlistName: string;
  hasTrackPlaying: boolean;
  handleStartPlay: () => void;
}) {
  const { handleChangeViewMode, isViewCompact, isViewList } = useViewMode();

  return (
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
        <PlaylistMenu
          tooltipText={playlistName}
          trackId={null}
          hiddenItems={[
            'add-liked',
            'add-playlist',
            'remove-liked',
            'remove-playlist'
          ]}
        />
        <Popover>
          <PopoverTrigger asChild>
            <button className="font-semibold flex items-center gap-2 text-sm text-[#929092] hover:text-white cursor-pointer ml-auto">
              {isViewList ? 'List' : 'Compact'} <TfiMenuAlt />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <span className="block p-2 text-xs">View as</span>
            <MenuItem
              icon={<HiMenu />}
              iconSide="start"
              onClick={() => handleChangeViewMode('compact')}
              className={`${isViewCompact ? 'text-green-500' : ''}`}
            >
              Compact
              {isViewCompact && <Check className="ml-auto" size={18} />}
            </MenuItem>
            <MenuItem
              icon={<TfiMenuAlt />}
              iconSide="start"
              onClick={() => handleChangeViewMode('list')}
              className={`${isViewList ? 'text-green-500' : ''}`}
            >
              List
              {isViewList && <Check className="ml-auto" size={18} />}
            </MenuItem>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
