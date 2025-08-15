import { useCurrentPlayback } from '@/store/playback.store';
import { useTrack } from '@/store/track.store';
import { useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const { currentTrack, audioElement, setIsPlayling, setAudioElement } =
    useTrack();
  const { currentPlayback } = useCurrentPlayback();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = currentTrack?.audioUrl || currentPlayback?.track.audioUrl;

  useEffect(() => {
    const audioEle = audioRef.current;
    if (audioEle) {
      setAudioElement(audioEle);
    }
  }, [setAudioElement]);

  useEffect(() => {
    if (!audioElement) return;

    const positionMs =
      localStorage.getItem('positionMs') ??
      (currentPlayback?.progress as number);
    const volume =
      localStorage.getItem('volume') ?? (currentPlayback?.volume as number);

    if (positionMs) {
      audioElement.currentTime =
        (+positionMs / 100) * audioElement.duration || 0;
    }
    if (volume) {
      audioElement.volume = +volume / 100;
    }
  }, [audioElement, currentPlayback]);

  useEffect(() => {
    if (!audioElement) return;

    const handlePlaying = () => setIsPlayling(true);
    const handlePause = () => setIsPlayling(false);

    audioElement.addEventListener('play', handlePlaying);
    audioElement.addEventListener('pause', handlePause);
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('play', handlePlaying);
        audioElement.removeEventListener('pause', handlePause);
      }
    };
  }, [audioElement, setIsPlayling]);

  return (
    <audio src={audioUrl ? audioUrl : 'none'} ref={audioRef} hidden></audio>
  );
}
