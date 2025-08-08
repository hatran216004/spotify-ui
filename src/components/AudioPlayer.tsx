import { useSong } from '@/store/song.store';
import { RefObject, useEffect } from 'react';

export default function AudioPlayer({
  audioRef
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
}) {
  const { currentSong, audioElement, currentTime, isMute, volume } = useSong();

  useEffect(() => {
    if (currentTime && audioElement) {
      audioElement.currentTime = currentTime;

      if (!isMute) {
        audioElement.volume = volume;
      } else {
        audioElement.volume = 0;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioElement]);

  return (
    <audio
      src={currentSong?.audioUrl ? currentSong?.audioUrl : 'none'}
      ref={audioRef}
      hidden
    ></audio>
  );
}
