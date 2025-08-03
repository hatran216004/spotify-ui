import {
  Maximize,
  MicVocal,
  Shrink,
  SquarePlay,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function PlayerActions() {
  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip>
        <TooltipTrigger className="p-2 cursor-pointer hover:opacity-80">
          <SquarePlay size={18} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Now playing view</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger className="p-2 cursor-pointer hover:opacity-80">
          <MicVocal size={18} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Lyrics</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex items-center cursor-pointer">
        <Tooltip>
          <TooltipTrigger className="p-2 hover:opacity-80">
            <Volume2 size={18} />
            <VolumeX size={18} className="hidden" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Mute</p>
          </TooltipContent>
        </Tooltip>
        <div className="h-1 w-[94px] max-w-full rounded-full bg-white">
          <div className="h-1 w-1/2 bg-[#1db954] relative rounded-full">
            <span className="absolute w-3 h-3 rounded-full bg-white translate-x-1/2 -translate-y-1/2 top-1/2 right-0 shadow-2xl"></span>
          </div>
        </div>
      </div>

      <Tooltip>
        <TooltipTrigger className="p-2 cursor-pointer hover:opacity-80">
          <Maximize size={18} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Enter full screen</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger className="hidden p-2 cursor-pointer hover:opacity-80">
          <Shrink size={18} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Exit full screen</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
