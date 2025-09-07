import { Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import TogglePlayBackAudio from '../TogglePlayBackAudio';
import { useTrack } from '@/store/track.store';
import { useQuery } from '@tanstack/react-query';
import useControlsPlayer from '@/hooks/useControlsPlayer';
import { useEffect } from 'react';
import { usePlaybackContext } from '@/store/playback.store';
import { ContextType, playerServices } from '@/services/player';
import { useAuth } from '@clerk/clerk-react';

export default function PlaybackControls() {
  const {
    isShuffle,
    isLoop,
    isPlaying,
    toggleLoop,
    toggleShuffle,
    togglePlayBack
  } = useTrack();
  const { type, id, setPlaybackTracks } = usePlaybackContext();
  const { isSignedIn } = useAuth();
  const { handleSkipTrack } = useControlsPlayer();
  const { data, isLoading } = useQuery({
    queryKey: ['playback-context', type, id],
    queryFn: () => playerServices.getPlaybackContext(id, type as ContextType),
    enabled: !!type && isSignedIn
  });

  useEffect(() => {
    const playbackContext = data?.data?.data?.playbackContext;
    if (playbackContext) {
      const { tracks, totalTracks } = playbackContext;
      setPlaybackTracks(tracks, totalTracks);
    }
  }, [data, setPlaybackTracks]);

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
              disabled={isLoading}
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
              disabled={isLoading}
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
