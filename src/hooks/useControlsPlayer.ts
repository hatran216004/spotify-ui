import { useTrack } from '@/store/track.store';
import { Track } from '@/types/track.type';

function useControlsPlayer(currentTracks: Track[] = []) {
  const { currentTrack, isShuffle, handlePlayTrack } = useTrack();

  const getCurrentPlaylistLength = () => currentTracks?.length ?? 0;

  const getCurrentTrackIndex = () => {
    if (!currentTracks) return -1;
    const currIndex = currentTracks?.findIndex(
      (track) => track._id === currentTrack?._id
    );
    return currIndex;
  };

  const getRandomIndex = () => {
    const currIndex = getCurrentTrackIndex();
    const playlistTrackLength = getCurrentPlaylistLength();

    if (playlistTrackLength <= 1 || currIndex === -1) return 0;

    let randomIndex = null;

    do {
      randomIndex = Math.floor(Math.random() * playlistTrackLength);
    } while (currIndex === randomIndex);
    return randomIndex;
  };

  const handleShuffle = () => {
    const randomIndex = getRandomIndex();
    const nextTrackPlay = currentTracks![randomIndex];
    handlePlayTrack(nextTrackPlay);
  };

  const handleSkipTrack = (direction: 'next' | 'prev') => {
    if (isShuffle) {
      handleShuffle();
      return;
    }

    const playlistTrackLength = getCurrentPlaylistLength();
    let currIndex = getCurrentTrackIndex();

    if (currIndex === -1) return;

    currIndex += direction === 'next' ? 1 : -1;
    const newIndex = (currIndex! + playlistTrackLength) % playlistTrackLength;
    const nextTrackPlay = currentTracks![newIndex];
    handlePlayTrack(nextTrackPlay);
  };

  return { handleShuffle, handleSkipTrack };
}

export default useControlsPlayer;
