import { usePlaybackContext } from '@/store/playback.store';
import { useTrack } from '@/store/track.store';

const PREV_THRESHOLD = 3;

function useControlsPlayer() {
  const { currentTrack, isShuffle, handlePlayTrack } = useTrack();
  const { tracks, totalTracks } = usePlaybackContext();

  const getCurrentTrackIndex = () => {
    if (!tracks) return -1;
    const currIndex = tracks?.findIndex(
      (track) => track._id === currentTrack?._id
    );
    return currIndex;
  };

  const getRandomIndex = () => {
    const currIndex = getCurrentTrackIndex();

    if (totalTracks <= 1 || currIndex === -1) return 0;

    let randomIndex = null;

    do {
      randomIndex = Math.floor(Math.random() * totalTracks);
    } while (currIndex === randomIndex);
    return randomIndex;
  };

  const handleShuffle = () => {
    const randomIndex = getRandomIndex();
    const nextTrackPlay = tracks![randomIndex];
    handlePlayTrack(nextTrackPlay);
  };

  const handleSkipTrack = (direction: 'next' | 'prev') => {
    if (isShuffle) {
      handleShuffle();
      return;
    }

    let currIndex = getCurrentTrackIndex();

    if (currIndex === -1) return;

    currIndex += direction === 'next' ? 1 : -1;
    const newIndex = (currIndex! + totalTracks) % totalTracks;
    const nextTrackPlay = tracks![newIndex];
    handlePlayTrack(nextTrackPlay);
  };

  return { handleShuffle, handleSkipTrack };
}

export default useControlsPlayer;
