import { Maximize, MicVocal, Shrink, SquarePlay } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useSidebar } from '@/store/ui.store';
import VolumeControl from './VolumeControl';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

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

      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <button className="p-2 cursor-pointer hover:opacity-80">
                <MicVocal size={18} color="#eee" />
              </button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Lyrics</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="bg-blue-50 border border-blue-300 shadow-md rounded-xl p-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-500 animate-spin shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-blue-600 font-medium text-center">
              Function is under development...
            </span>
          </div>
        </PopoverContent>
      </Popover>

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
