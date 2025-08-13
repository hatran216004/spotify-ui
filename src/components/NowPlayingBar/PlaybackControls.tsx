import { Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import TogglePlayBackAudio from '../TogglePlayBackAudio';
import { useSong } from '@/store/song.store';
import useControlsPlayer from '@/hooks/useControlsPlayer';
import { useQuery } from '@tanstack/react-query';
import { playlistServices } from '@/services/playlist';

export default function PlaybackControls() {
  const {
    isShuffle,
    isPlaying,
    isLoop,
    context,
    togglePlayBack,
    toggleLoop,
    toggleShuffle
  } = useSong();

  const { data } = useQuery({
    queryKey: ['playlist', context.id],
    queryFn: () => playlistServices.getPlaylist(context.id!),
    enabled: context.type === 'playlist' && !!context.id
  });

  const currentTracks = data?.data.data.playlist?.songs?.map((s) => ({
    song: s.songId,
    _id: s._id
  }));

  const { handleSkipTrack } = useControlsPlayer(currentTracks);

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
        onPlayAudio={togglePlayBack}
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
