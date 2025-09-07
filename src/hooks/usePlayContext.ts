import { ContextType } from '@/services/player';
import { usePlaybackContext } from '@/store/playback.store';
import { useTrack } from '@/store/track.store';
import { Track } from '@/types/track.type';

function usePlayContext({
  type,
  id,
  data
}: {
  type: ContextType;
  id: string | null;
  data?: Track[] | Track;
}) {
  const {
    currentTrack,
    isPlaying,
    audioElement,
    togglePlayBack,
    handlePlayTrack
  } = useTrack();
  const {
    type: contextType,
    id: contextId,
    setPlaybackContext
  } = usePlaybackContext();
  const isSameContext = contextId === id;
  const hasTrackPlaying = isSameContext && contextType === type && isPlaying;
  let isSameTrack = false;

  if (!Array.isArray(data)) {
    isSameTrack = currentTrack?._id === (data as Track)?._id;
  }

  const handleStartPlay = () => {
    const isCurrentTrackInContext = (data as Track[])?.some(
      (track) => track._id === currentTrack?._id
    );

    if (!audioElement) return;

    if (isCurrentTrackInContext && isSameContext) {
      togglePlayBack();
    } else {
      audioElement.currentTime = 0;
      const firstTrack = (data as Track[])?.[0];
      handlePlayTrack(firstTrack!);
      setPlaybackContext(type, id);
    }
  };

  const handlePlayTrackItem = () => {
    if (isSameTrack && isSameContext) {
      togglePlayBack();
    } else {
      audioElement!.currentTime = 0;
      handlePlayTrack(data as Track);
    }
    setPlaybackContext(type, id);
  };

  return { isSameTrack, hasTrackPlaying, handleStartPlay, handlePlayTrackItem };
}

export default usePlayContext;
