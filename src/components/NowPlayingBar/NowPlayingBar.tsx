import { useEffect, useRef } from 'react';
import PlaybackControls from './PlaybackControls';
import PlayerActions from './PlayerActions ';
import ProgressBar from './ProgressBar';
import TrackInfo from './TrackInfo';
import { useSong } from '@/store/song.store';
import useAudioSeeking from '@/hooks/useAudioSeeking';
import { trackTimeFormat } from '@/utils/datetime';
import useControlsPlaylist from '@/hooks/useControlsPlaylist';

export default function NowPlayingBar() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { audioElement, currentSong, isShuffle, setIsPlayling } = useSong();
  const {
    isSeeking,
    progressValue,
    setProgressValue,
    handleSeeking,
    setIsSeeking,
    setCurrentTime
  } = useAudioSeeking(progressRef);
  const { handleShuffle } = useControlsPlaylist();

  useEffect(() => {
    if (!audioElement) return;

    const handleTimeupdate = () => {
      if (isSeeking) return;

      const value =
        (audioElement.currentTime / audioElement.duration) * 100 || 0;
      setProgressValue(value);
      setCurrentTime(audioElement.currentTime);
    };

    const handleAudioEnded = () => {
      setIsPlayling(false);
      setCurrentTime(0);
      setProgressValue(0);

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
    currentSong,
    isShuffle,
    setCurrentTime,
    setIsPlayling,
    setProgressValue,
    handleShuffle
  ]);

  return (
    <div className="h-[var(--now-playing-bar-height)] p-2 bg-black fixed z-1 bottom-0 left-0 right-0">
      <div className="flex items-center h-full">
        <div className="w-[30%]">
          <TrackInfo />
        </div>
        <div className="space-y-2 w-[40%] max-w-full">
          <PlaybackControls />
          <div className="flex items-center gap-2 cursor-pointer w-full text-center">
            <span className="text-xs text-[#929092] min-w-[30px]">
              {trackTimeFormat(audioElement?.currentTime || 0)}
            </span>
            <ProgressBar
              progressValue={progressValue}
              progressRef={progressRef}
              isSeeking={isSeeking}
              onSeeking={handleSeeking}
              onStartSeeking={() => setIsSeeking(true)}
            />
            <span className="text-xs text-[#929092] min-w-[30px] text-center">
              {trackTimeFormat(audioElement?.duration || 0)}
            </span>
          </div>
        </div>
        <div className="w-[30%]">
          <PlayerActions />
        </div>
      </div>
    </div>
  );
}
