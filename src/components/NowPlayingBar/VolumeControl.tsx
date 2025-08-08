import { useSong } from '@/store/song.store';
import { TooltipTrigger, Tooltip, TooltipContent } from '../ui/tooltip';
import ProgressBar from './ProgressBar';
import { useEffect, useRef } from 'react';
import useAudioSeeking from '@/hooks/useAudioSeeking';
import { Volume2, VolumeX } from 'lucide-react';

export default function VolumeControl() {
  const { isMute, volume, toggleMute } = useSong();
  const volumeProgressRef = useRef<HTMLDivElement | null>(null);
  const {
    isSeeking,
    setIsSeeking,
    handleSeeking,
    setProgressValue,
    progressValue
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
      <ProgressBar
        type="volume"
        isSeeking={isSeeking}
        progressValue={progressValue}
        progressRef={volumeProgressRef}
        onSeeking={handleSeeking}
        onStartSeeking={() => setIsSeeking(true)}
      />
    </div>
  );
}
