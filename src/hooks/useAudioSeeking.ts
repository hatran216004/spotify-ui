import { useSong } from '@/store/song.store';
import { RefObject, useCallback, useEffect, useState } from 'react';

function useAudioSeeking(progressRef: RefObject<HTMLDivElement | null>) {
  const { audioElement, setCurrentTime } = useSong();
  const [isSeeking, setIsSeeking] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const calculateProgress = useCallback(
    (clientX: number) => {
      const progressElement = progressRef.current;
      if (!progressElement || !audioElement) return 0;

      const { offsetWidth, offsetLeft } = progressElement!;

      const coordinateXInProgress = clientX - offsetLeft;
      const value = Math.floor((coordinateXInProgress / offsetWidth) * 100);
      return Math.max(0, Math.min(100, value));
    },
    [progressRef, audioElement]
  );

  const handleSeeking = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = calculateProgress(e.clientX);
    audioElement!.currentTime = (value / 100) * audioElement!.duration;

    setIsSeeking(false);
    setCurrentTime(audioElement!.currentTime);
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
      audioElement.currentTime = (progressValue / 100) * audioElement.duration;
      setIsSeeking(false);
      setCurrentTime(audioElement.currentTime);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isSeeking,
    audioElement,
    progressValue,
    setCurrentTime,
    calculateProgress
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
