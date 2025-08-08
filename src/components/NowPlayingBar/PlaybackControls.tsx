import { Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import TogglePlayBackAudio from '../TogglePlayBackAudio';
import { useSong } from '@/store/song.store';

export default function PlaybackControls() {
  const { isPlaying, isLoop, togglePlayBack, toggleLoop } = useSong();

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 cursor-pointer hover:opacity-80">
              <Shuffle size={18} color="#eee" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable shuffle</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 cursor-pointer hover:opacity-80">
              <SkipBack size={18} fill="#eee" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Previous</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <TogglePlayBackAudio
        variant="secondary"
        isPlaying={isPlaying}
        onPlayAudio={togglePlayBack}
      />

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 cursor-pointer hover:opacity-80">
              <SkipForward size={18} fill="#eee" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Next</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="p-2 cursor-pointer hover:opacity-80"
              onClick={toggleLoop}
            >
              <Repeat size={18} color={isLoop ? '#1db954' : '#eee'} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable repeat</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
