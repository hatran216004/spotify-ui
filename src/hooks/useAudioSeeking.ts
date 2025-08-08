import { useSong } from '@/store/song.store';
import { RefObject, useCallback, useEffect, useState } from 'react';

function useAudioSeeking(
  progressRef: RefObject<HTMLDivElement | null>,
  type: 'volume' | 'playback' = 'playback'
) {
  const { audioElement, setCurrentTime, setVolume } = useSong();
  const [isSeeking, setIsSeeking] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const calculateProgress = useCallback(
    (clientX: number) => {
      const progressElement = progressRef.current;
      if (!progressElement || !audioElement) return 0;

      const { offsetWidth, offsetLeft } = progressElement;

      const coordinateXInProgress = clientX - offsetLeft;
      const value = (coordinateXInProgress / offsetWidth) * 100;

      return Math.max(0, Math.min(100, value));
    },
    [progressRef, audioElement]
  );

  const handleSeeking = (clientX: number) => {
    const value = calculateProgress(clientX);
    if (type === 'playback') {
      audioElement!.currentTime = (value / 100) * audioElement!.duration;
      setCurrentTime(audioElement!.currentTime);
    }

    if (type === 'volume') {
      // value / 100 beacause volumn value between 0 and 1
      const volumeValue = value / 100;
      audioElement!.volume = volumeValue;
      setVolume(volumeValue);
    }
    setIsSeeking(false);
    setProgressValue(value);
  };

  useEffect(() => {
    if (!isSeeking) return;

    const handleMouseMove = (e: MouseEvent) => {
      const value = calculateProgress(e.clientX);
      setProgressValue(value);
    };

    const handleMouseUp = () => {
      if (!audioElement) return;

      if (type === 'playback') {
        audioElement.currentTime =
          (progressValue / 100) * audioElement.duration;
        setCurrentTime(audioElement.currentTime);
      }

      if (type === 'volume') {
        const volumeValue = progressValue / 100;
        audioElement!.volume = volumeValue;
        setVolume(volumeValue);
      }
      setIsSeeking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    type,
    isSeeking,
    audioElement,
    progressValue,
    setCurrentTime,
    calculateProgress,
    setVolume
  ]);

  return {
    isSeeking,
    progressValue,
    setProgressValue,
    calculateProgress,
    handleSeeking,
    setIsSeeking
  };
}

export default useAudioSeeking;
