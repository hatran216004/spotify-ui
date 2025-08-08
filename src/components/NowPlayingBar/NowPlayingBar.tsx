import { useEffect, useRef } from 'react';
import PlaybackControls from './PlaybackControls';
import PlayerActions from './PlayerActions ';
import ProgressBar from './ProgressBar';
import TrackInfo from './TrackInfo';
import { useSong } from '@/store/song.store';
import useAudioSeeking from '@/hooks/useAudioSeeking';

export default function NowPlayingBar() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { audioElement, setCurrentTime, setIsPlayling } = useSong();
  const {
    isSeeking,
    progressValue,
    setProgressValue,
    handleSeeking,
    setIsSeeking
  } = useAudioSeeking(progressRef);

  useEffect(() => {
    if (!audioElement) return;

    const handleTimeupdate = () => {
      if (isSeeking) return;

      const value =
        (audioElement.currentTime / audioElement.duration) * 100 || 0;
      setProgressValue(value);
      setCurrentTime(audioElement.currentTime);
    };

    const handlePause = () => {
      setIsPlayling(false);
      setCurrentTime(0);
      setProgressValue(0);
    };

    audioElement.addEventListener('timeupdate', handleTimeupdate);
    audioElement.addEventListener('pause', handlePause);
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeupdate);
        audioElement.removeEventListener('pause', handlePause);
      }
    };
  }, [
    audioElement,
    isSeeking,
    setCurrentTime,
    setIsPlayling,
    setProgressValue
  ]);

  return (
    <div className="h-[var(--now-playing-bar-height)] p-2 bg-black absolute z-1 bottom-0 left-0 right-0">
      <div className="grid grid-cols-12 items-center h-full">
        <div className="col-span-3">
          <TrackInfo />
        </div>
        <div className="col-span-6">
          <div className="flex flex-col items-center space-y-2">
            <PlaybackControls />
            <ProgressBar
              progressValue={progressValue}
              progressRef={progressRef}
              isSeeking={isSeeking}
              onSeeking={handleSeeking}
              onStartSeeking={() => setIsSeeking(true)}
            />
          </div>
        </div>
        <div className="col-span-3">
          <PlayerActions />
        </div>
      </div>
    </div>
  );
}
