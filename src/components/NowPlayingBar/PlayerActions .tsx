import {
  Maximize,
  MicVocal,
  Shrink,
  SquarePlay,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ProgressBar from './ProgressBar';
import { useSong } from '@/store/song.store';
import { useEffect, useRef } from 'react';
import useAudioSeeking from '@/hooks/useAudioSeeking';

export default function PlayerActions() {
  const { isMute, volume, toggleMute } = useSong();
  const volumeProgressRef = useRef<HTMLDivElement | null>(null);
  const {
    isSeeking,
    setIsSeeking,
    handleSeeking,
    setProgressValue,
    progressValue
  } = useAudioSeeking(volumeProgressRef, 'volume');

  useEffect(() => {
    if (isMute) {
      setProgressValue(0);
    } else {
      setProgressValue(volume * 100);
    }
  }, [volume, isMute, setProgressValue]);

  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 cursor-pointer hover:opacity-80">
            <SquarePlay size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Now playing view</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 cursor-pointer hover:opacity-80">
            <MicVocal size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Lyrics</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex items-center cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="p-2 hover:opacity-80"
              onClick={() => {
                toggleMute();
                if (!isMute) {
                  setProgressValue(0);
                } else {
                  setProgressValue(volume * 100);
                }
              }}
            >
              {!isMute ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {!isMute ? <p>Mute</p> : <p>Unmute</p>}
          </TooltipContent>
        </Tooltip>
        <ProgressBar
          type="volume"
          isSeeking={isSeeking}
          progressValue={progressValue}
          progressRef={volumeProgressRef}
          onSeeking={handleSeeking}
          onStartSeeking={() => setIsSeeking(true)}
        />
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 cursor-pointer hover:opacity-80">
            <Maximize size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Enter full screen</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="hidden p-2 cursor-pointer hover:opacity-80">
            <Shrink size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Exit full screen</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
