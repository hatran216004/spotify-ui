import { Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import TogglePlayBackAudio from '../TogglePlayBackAudio';
import { useTrack } from '@/store/track.store';
import { useQuery } from '@tanstack/react-query';
import { useCurrentContext, useCurrentTracks } from '@/store/playback.store';
import { playlistServices } from '@/services/playlist';
import { artistServices } from '@/services/artist';
import useControlsPlayer from '@/hooks/useControlsPlayer';
import { useEffect } from 'react';
import { Track } from '@/types/track.type';

export default function PlaybackControls() {
  const {
    isShuffle,
    isLoop,
    isPlaying,
    toggleLoop,
    toggleShuffle,
    togglePlayBack
  } = useTrack();
  const { contextId, contextType } = useCurrentContext();
  const { currentTracks, setCurrentTracks } = useCurrentTracks();
  const { handleSkipTrack } = useControlsPlayer(currentTracks);

  const {
    data: playlistTracks,
    isLoading: isLoadingPlaylist,
    isError: isErrorPlaylist
  } = useQuery({
    queryKey: ['playlist', contextId],
    queryFn: () => playlistServices.getPlaylist(contextId!),
    enabled: contextType === 'playlist' && !!contextId
  });

  const {
    data: popularArtistTracks,
    isLoading: isLoadingArtistTracks,
    isError: isErrorArtistTracks
  } = useQuery({
    queryKey: ['artist-popular-tracks', contextId],
    queryFn: () => artistServices.getPopularArtistTracks(contextId!),
    enabled: contextType === 'artist' && !!contextId
  });

  useEffect(() => {
    let tracksList: Track[] = [];
    switch (contextType) {
      case 'playlist':
        if (isLoadingPlaylist || isErrorPlaylist) return;
        tracksList = playlistTracks?.data.data?.playlist.tracks.map(
          (entry) => entry.track
        ) as Track[];
        break;
      case 'artist':
        if (isLoadingArtistTracks || isErrorArtistTracks) return;
        tracksList = popularArtistTracks?.data.data.tracks.map(
          (track) => track
        ) as Track[];
        break;
      default:
        break;
    }
    setCurrentTracks(tracksList);
  }, [
    playlistTracks,
    isLoadingPlaylist,
    isErrorPlaylist,
    popularArtistTracks,
    isLoadingArtistTracks,
    isErrorArtistTracks,
    contextType,
    setCurrentTracks
  ]);

  const handleClick = () => {
    togglePlayBack();
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="p-2 cursor-pointer hover:opacity-80"
              onClick={toggleShuffle}
            >
              <Shuffle size={18} color={isShuffle ? '#1db954' : '#eee'} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable shuffle</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="p-2 cursor-pointer hover:opacity-80"
              onClick={() => handleSkipTrack('prev')}
            >
              <SkipBack size={18} fill="#eee" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Previous</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <TogglePlayBackAudio
        variant="secondary"
        isPlaying={isPlaying}
        onPlayAudio={handleClick}
      />

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="p-2 cursor-pointer hover:opacity-80"
              onClick={() => handleSkipTrack('next')}
            >
              <SkipForward size={18} fill="#eee" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Next</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="p-2 cursor-pointer hover:opacity-80"
              onClick={toggleLoop}
            >
              <Repeat size={18} color={isLoop ? '#1db954' : '#eee'} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable repeat</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
