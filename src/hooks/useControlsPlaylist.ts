import { useSong } from '@/store/song.store';
import usePlaylistById from './usePlaylistById';

function useControlsPlaylist() {
  const {
    currentSong,
    currentPlaylistId,
    handlePlaySong,
    setCurrentPlaylistItemId
  } = useSong();
  const { playlist, isError } = usePlaylistById(currentPlaylistId!);

  const getCurrentPlaylistLength = () => playlist?.songs!.length || 0;

  const getCurrentTrackIndex = () => {
    if (!playlist || isError) return -1;
    const currIndex = playlist?.songs?.findIndex(
      (s) => s.songId._id === currentSong?._id
    );

    if (currIndex === -1) return -1;
    return currIndex;
  };

  const getRandomIndex = () => {
    const currIndex = getCurrentTrackIndex();
    const playlistTrackLength = getCurrentPlaylistLength();
    let randomIndex = null;

    do {
      randomIndex = Math.floor(Math.random() * playlistTrackLength);
    } while (currIndex === randomIndex);
    return randomIndex;
  };

  const handleShuffle = () => {
    const randomIndex = getRandomIndex();
    const nextTrackPlay = playlist!.songs![randomIndex];
    handlePlaySong(nextTrackPlay.songId);
    setCurrentPlaylistItemId(nextTrackPlay._id);
  };

  const handleSkipTrack = (direction: 'next' | 'prev') => {
    const playlistTrackLength = getCurrentPlaylistLength();
    let currIndex = getCurrentTrackIndex();

    if (currIndex === -1) return;

    if (direction === 'next') {
      currIndex! += 1;
    } else {
      currIndex! -= 1;
    }
    const newIndex = (currIndex! + playlistTrackLength) % playlistTrackLength;
    const nextTrackPlay = playlist!.songs![newIndex];
    handlePlaySong(nextTrackPlay.songId);
    setCurrentPlaylistItemId(nextTrackPlay._id);
  };

  return { handleShuffle, handleSkipTrack };
}

export default useControlsPlaylist;
