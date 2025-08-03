import { Play, Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function PlaybackControls() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger className="p-2 cursor-pointer hover:opacity-80">
            <Shuffle size={18} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable shuffle</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="p-2 cursor-pointer hover:opacity-80">
            <SkipBack size={18} fill="#fff" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Previous</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Tooltip>
        <TooltipTrigger className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80">
          <Play size={18} fill="#000" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Play</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger className="p-2 cursor-pointer hover:opacity-80">
            <SkipForward size={18} fill="#fff" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Next</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="p-2 cursor-pointer hover:opacity-80">
            <Repeat size={18} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable repeat</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
