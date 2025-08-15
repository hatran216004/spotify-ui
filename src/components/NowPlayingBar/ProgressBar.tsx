import useAudioProgressAndVolume from '@/hooks/useAudioProgressAndVolume';
import useControlsPlayer from '@/hooks/useControlsPlayer';
import { useTrack } from '@/store/track.store';
import { trackTimeFormat } from '@/utils/datetime';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { audioElement, currentTrack, isShuffle, setIsPlayling } = useTrack();

  const {
    isSeeking,
    positionMs,
    handleControlMouseUp,
    setIsSeeking,
    setPositionMs
  } = useAudioProgressAndVolume(progressRef, 'position_ms');

  const { handleShuffle } = useControlsPlayer();

  useEffect(() => {
    if (!audioElement) return;

    const handleTimeupdate = () => {
      if (isSeeking) return;

      const value =
        (audioElement.currentTime / audioElement.duration) * 100 || 0;
      setPositionMs(value);
    };

    const handleAudioEnded = () => {
      setIsPlayling(false);
      if (isShuffle) handleShuffle();
    };

    audioElement.addEventListener('timeupdate', handleTimeupdate);
    audioElement.addEventListener('ended', handleAudioEnded);
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeupdate);
        audioElement.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [
    audioElement,
    isSeeking,
    currentTrack,
    isShuffle,
    setIsPlayling,
    setPositionMs,
    handleShuffle
  ]);

  return (
    <>
      <span className="text-xs text-[#929092] min-w-[30px]">
        {trackTimeFormat(audioElement?.currentTime || 0)}
      </span>
      <div
        className="group py-1 flex-1"
        onMouseDown={() => setIsSeeking(true)}
        onMouseUp={(e) => handleControlMouseUp(e.clientX)}
      >
        <div ref={progressRef} className="h-1 rounded-full bg-gray-500">
          <div
            className={clsx(
              'h-1 relative rounded-full group-hover:bg-[#1db954]',
              isSeeking ? 'bg-[#1db954]' : 'bg-white'
            )}
            style={{ width: `${positionMs}%` }}
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
      <span className="text-xs text-[#929092] min-w-[30px] text-center">
        {trackTimeFormat(audioElement?.duration || 0)}
      </span>
    </>
  );
}
