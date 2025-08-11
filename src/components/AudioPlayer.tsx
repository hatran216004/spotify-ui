import { useSong } from '@/store/song.store';
import { RefObject, useEffect } from 'react';

export default function AudioPlayer({
  audioRef
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
}) {
  const { currentSong, audioElement, isMute, volume, isLoop, setIsPlayling } =
    useSong();

  useEffect(() => {
    const currentTime = Number(localStorage.getItem('currentTime') || 0);
    if (currentTime && audioElement) {
      audioElement.currentTime = currentTime;

      if (!isMute) {
        audioElement.volume = volume;
      } else {
        audioElement.volume = 0;
      }
      audioElement.loop = isLoop;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioElement]);

  useEffect(() => {
    const handlePlaying = () => {
      setIsPlayling(true);
    };

    const handlePause = () => {
      setIsPlayling(false);
    };
    audioElement?.addEventListener('play', handlePlaying);
    audioElement?.addEventListener('pause', handlePause);
    return () => {
      if (audioElement) {
        audioElement?.removeEventListener('play', handlePlaying);
        audioElement?.removeEventListener('pause', handlePause);
      }
    };
  }, [audioElement, setIsPlayling]);

  return (
    <audio
      src={currentSong?.audioUrl ? currentSong?.audioUrl : 'none'}
      ref={audioRef}
      hidden
    ></audio>
  );
}
