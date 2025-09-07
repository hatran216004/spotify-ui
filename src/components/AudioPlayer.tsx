import useControlsPlayer from '@/hooks/useControlsPlayer';
import { useTrack } from '@/store/track.store';
import { useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const {
    currentTrack,
    audioElement,
    isShuffle,
    isLoop,
    setIsPlayling,
    setAudioElement
  } = useTrack();

  const { handleShuffle, handleSkipTrack } = useControlsPlayer();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = currentTrack?.audioUrl;

  useEffect(() => {
    const audioEle = audioRef.current;
    if (audioEle) {
      setAudioElement(audioEle);
    }
  }, [setAudioElement]);

  useEffect(() => {
    if (!audioElement) return;

    const handleLoadedMetadata = () => {
      const positionMs = localStorage.getItem('position_ms');
      const volume = localStorage.getItem('volume');

      if (positionMs) {
        audioElement.currentTime =
          (+positionMs / 100) * audioElement.duration || 0;
      }
      if (volume) {
        audioElement.volume = +volume / 100;
      }
    };

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioElement]);

  useEffect(() => {
    if (!audioElement) return;

    if (isLoop) {
      audioElement.loop = true;
    } else {
      audioElement.loop = false;
    }
  }, [isLoop, audioElement]);

  useEffect(() => {
    if (!audioElement) return;

    const handlePlaying = () => {
      setIsPlayling(true);
    };
    const handlePause = () => {
      setIsPlayling(false);
    };

    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else {
        handleSkipTrack('next');
      }
    };

    audioElement.addEventListener('play', handlePlaying);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('play', handlePlaying);
        audioElement.removeEventListener('pause', handlePause);
        audioElement.removeEventListener('ended', handleEnded);
      }
    };
  }, [audioElement, isShuffle, setIsPlayling, handleShuffle, handleSkipTrack]);

  return (
    <audio src={audioUrl ? audioUrl : 'none'} ref={audioRef} hidden></audio>
  );
}
