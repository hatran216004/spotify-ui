import { TooltipTrigger, Tooltip, TooltipContent } from '../ui/tooltip';
import { useRef } from 'react';
import useAudioProgressAndVolume from '@/hooks/useAudioProgressAndVolume';
import { Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';

export default function VolumeControl() {
  const volumeProgressRef = useRef<HTMLDivElement | null>(null);
  const {
    isSeeking,
    volume,
    handleControlMouseUp,
    setIsSeeking,
    toggleVolume
  } = useAudioProgressAndVolume(volumeProgressRef, 'volume');

  const isMute = volume === 0;
  const Icon = isMute ? VolumeX : Volume2;

  return (
    <div className="flex items-center cursor-pointer">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 hover:opacity-80" onClick={toggleVolume}>
            <Icon size={18} color="#eee" />
          </button>
        </TooltipTrigger>
        <TooltipContent>{isMute ? <p>Mute</p> : <p>Unmute</p>}</TooltipContent>
      </Tooltip>
      <div
        className="group py-1 flex-1"
        onMouseDown={() => setIsSeeking(true)}
        onMouseUp={(e) => handleControlMouseUp(e.clientX)}
      >
        <div
          ref={volumeProgressRef}
          className="h-1 rounded-full bg-gray-500 w-[94px]"
        >
          <div
            className={clsx(
              'h-1 relative rounded-full group-hover:bg-[#1db954]',
              isSeeking ? 'bg-[#1db954]' : 'bg-white'
            )}
            style={{ width: `${isMute ? 0 : volume}%` }}
          >
            <span
              className={clsx(
                'absolute w-3 h-3 bg-transparent rounded-full group-hover:bg-white translate-x-1/2 -translate-y-1/2 top-1/2 right-0 shadow-2xl',
                isSeeking && 'bg-white'
              )}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
