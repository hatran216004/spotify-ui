import { playerServices } from '@/services/player';
import { useCurrentPlayback } from '@/store/playback.store';
import { useTrack } from '@/store/track.store';
import { useMutation } from '@tanstack/react-query';
import { RefObject, useCallback, useEffect, useState } from 'react';
import useDebounceApiCall from './useDebounceApiCall';

function useAudioProgressAndVolume(
  progressRef: RefObject<HTMLDivElement | null>,
  type: 'volume' | 'position_ms' = 'position_ms'
) {
  const { debounceApiCall } = useDebounceApiCall();
  const { currentPlayback } = useCurrentPlayback();
  const { audioElement } = useTrack();
  const [isSeeking, setIsSeeking] = useState(false);
  const [positionMs, setPositionMs] = useState(() => {
    return (
      localStorage.getItem('positionMs') ??
      (currentPlayback?.progress as number)
    );
  });

  const [volume, setVolume] = useState(() => {
    return (
      localStorage.getItem('volume') ?? (currentPlayback?.volume as number)
    );
  });

  const { mutate: updateVolumeApi } = useMutation({
    mutationFn: playerServices.controlVolume
  });
  const { mutate: updateProgressApi } = useMutation({
    mutationFn: playerServices.controlProgress
  });

  const calculateProgress = useCallback(
    (clientX: number) => {
      const progressElement = progressRef.current;
      if (!progressElement) return 0;

      const rectLeft = progressElement.getBoundingClientRect().left;
      const { offsetWidth } = progressElement;

      const relativeXInProgress = clientX - rectLeft;
      const value = (relativeXInProgress / offsetWidth) * 100;

      return Math.max(0, Math.min(100, value));
    },
    [progressRef]
  );

  const toggleVolume = () => {
    if (!audioElement) return;

    const currentVol = +volume;

    if (currentVol > 0) {
      localStorage.setItem('preVolume', `${currentVol}`);

      // Mute
      audioElement.volume = 0;
      setVolume(0);
      updateVolumeApi(0);
    } else {
      const preVolume = +(localStorage.getItem('preVolume') || 50);
      audioElement.volume = preVolume / 100;
      setVolume(preVolume);
      updateVolumeApi(preVolume);
    }
  };

  const handleControlMouseUp = (clientX: number) => {
    if (!audioElement) return;

    const value = calculateProgress(clientX);
    if (type === 'position_ms') {
      audioElement.currentTime = (value / 100) * audioElement.duration;
      setPositionMs(value);

      // Call api to update progress
      debounceApiCall(updateProgressApi, value);
    }

    if (type === 'volume') {
      audioElement.volume = value / 100;
      setVolume(value);

      // Call api to update volume
      debounceApiCall(updateVolumeApi, value);
    }
    setIsSeeking(false);
  };

  useEffect(() => {
    if (positionMs) localStorage.setItem('positionMs', `${positionMs}`);
  }, [positionMs]);

  useEffect(() => {
    if (volume) localStorage.setItem('volume', `${volume}`);
  }, [volume]);

  useEffect(() => {
    if (!isSeeking) return;

    const handleMouseMove = (e: MouseEvent) => {
      const value = calculateProgress(e.clientX);
      if (type === 'position_ms') {
        setPositionMs(value);
      }
      if (type === 'volume') {
        setVolume(value);
      }
    };

    const handleMouseUp = () => {
      if (!audioElement) return;

      if (type === 'position_ms') {
        audioElement.currentTime = (+positionMs / 100) * audioElement.duration;
        setPositionMs(positionMs);

        // Call api to update progress
        debounceApiCall(updateProgressApi, +positionMs);
      }

      if (type === 'volume') {
        // volume of audio from 0 to 1
        audioElement.volume = +volume / 100;
        setVolume(volume);

        // Call api to update volume
        debounceApiCall(updateVolumeApi, +volume);
      }
      setIsSeeking(false);
    };

    document.documentElement.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.documentElement.removeEventListener(
        'mousemove',
        handleMouseMove
      );
      document.documentElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    type,
    isSeeking,
    debounceApiCall,
    calculateProgress,
    updateProgressApi,
    updateVolumeApi,
    setPositionMs,
    setVolume,
    positionMs,
    audioElement,
    volume
  ]);

  return {
    isSeeking,
    positionMs,
    volume,
    calculateProgress,
    handleControlMouseUp,
    setIsSeeking,
    setPositionMs,
    setVolume,
    toggleVolume
  };
}

export default useAudioProgressAndVolume;
