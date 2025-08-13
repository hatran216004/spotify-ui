import { useSong } from '@/store/song.store';
import { TooltipTrigger, Tooltip, TooltipContent } from '../ui/tooltip';
import { useEffect, useRef } from 'react';
import useAudioSeeking from '@/hooks/useAudioSeeking';
import { Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';

export default function VolumeControl() {
  const { isMute, volume, toggleMute } = useSong();
  const volumeProgressRef = useRef<HTMLDivElement | null>(null);
  const {
    isSeeking,
    progressValue,
    setProgressValue,
    handleSeeking,
    setIsSeeking
  } = useAudioSeeking(volumeProgressRef, 'volume');

  const Icon = !isMute ? Volume2 : VolumeX;

  useEffect(() => {
    if (isMute) {
      setProgressValue(0);
    } else {
      setProgressValue(volume * 100);
    }
  }, [volume, isMute, setProgressValue]);
  return (
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
            <Icon size={18} color="#eee" />
          </button>
        </TooltipTrigger>
        <TooltipContent>{!isMute ? <p>Mute</p> : <p>Unmute</p>}</TooltipContent>
      </Tooltip>
      <div
        className="group py-1 flex-1"
        onMouseDown={() => setIsSeeking(true)}
        onMouseUp={(e) => handleSeeking(e.clientX)}
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
            style={{ width: `${progressValue}%` }}
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
