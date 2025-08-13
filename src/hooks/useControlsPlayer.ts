import { useSong } from '@/store/song.store';
import { type CurrentTracks } from '@/types/song.type';

function useControlsPlayer(currentTracks: CurrentTracks = []) {
  const { currentSong, isShuffle, handlePlaySong, setCurrentPlaylistItemId } =
    useSong();

  const getCurrentPlaylistLength = () => currentTracks?.length || 0;

  const getCurrentTrackIndex = () => {
    if (!currentTracks) return -1;
    const currIndex = currentTracks?.findIndex(
      (s) => s.song._id === currentSong?._id
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
    handlePlaySong(nextTrackPlay.song);
    setCurrentPlaylistItemId(nextTrackPlay._id);
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
    handlePlaySong(nextTrackPlay.song);
    setCurrentPlaylistItemId(nextTrackPlay._id);
  };

  return { handleShuffle, handleSkipTrack };
}

export default useControlsPlayer;
