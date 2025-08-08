import { Maximize, MicVocal, Shrink, SquarePlay } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useSidebar } from '@/store/ui.store';
import VolumeControl from './VolumeControl';

export default function PlayerActions() {
  const { isSidebarRightExpanded, onExpandedRightSidebar } = useSidebar();

  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="p-2 cursor-pointer hover:opacity-80"
            onClick={onExpandedRightSidebar}
          >
            <SquarePlay
              size={18}
              color={isSidebarRightExpanded ? '#1db954' : '#eee'}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Now playing view</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 cursor-pointer hover:opacity-80">
            <MicVocal size={18} color="#eee" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Lyrics</p>
        </TooltipContent>
      </Tooltip>

      <VolumeControl />

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 cursor-pointer hover:opacity-80">
            <Maximize size={18} color="#eee" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Enter full screen</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="hidden p-2 cursor-pointer hover:opacity-80">
            <Shrink size={18} color="#eee" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Exit full screen</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
