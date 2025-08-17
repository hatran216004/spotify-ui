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
import { useUserStore } from '@/store/ui.store';
import { albumServices } from '@/services/album';

export default function PlaybackControls() {
  const {
    isShuffle,
    isLoop,
    isPlaying,
    currentTrack,
    toggleLoop,
    toggleShuffle,
    togglePlayBack
  } = useTrack();
  const { contextId, contextType } = useCurrentContext();
  const { currentTracks, setCurrentTracks } = useCurrentTracks();
  const { handleSkipTrack } = useControlsPlayer(currentTracks);
  const userId = useUserStore().user?._id;

  const { data: likedTracks, isLoading: isLoadingLikedTracks } = useQuery({
    queryKey: ['liked-tracks', userId],
    queryFn: playlistServices.getMeLikedTracks,
    enabled: contextType === 'liked' && contextId === null
  });

  const { data: albumTracks, isLoading: isLoadingAlbum } = useQuery({
    queryKey: ['album', contextId],
    queryFn: () => albumServices.getAlbum(contextId!),
    enabled: contextType === 'album' && !!contextId
  });

  const { data: playlistTracks, isLoading: isLoadingPlaylist } = useQuery({
    queryKey: ['playlist', contextId],
    queryFn: () => playlistServices.getPlaylist(contextId!),
    enabled: contextType === 'playlist' && !!contextId
  });

  const { data: popularArtistTracks, isLoading: isLoadingArtistTracks } =
    useQuery({
      queryKey: ['artist-popular-tracks', contextId],
      queryFn: () => artistServices.getPopularArtistTracks(contextId!),
      enabled: contextType === 'artist' && !!contextId
    });

  useEffect(() => {
    let tracksList: Track[] = [];
    switch (contextType) {
      case 'playlist':
        if (isLoadingPlaylist || !playlistTracks) return;
        tracksList = playlistTracks?.data.data?.playlist.tracks.map(
          (entry) => entry.track
        ) as Track[];
        break;
      case 'artist':
        if (isLoadingArtistTracks || !popularArtistTracks) return;
        tracksList = popularArtistTracks?.data.data.tracks.map(
          (track) => track
        ) as Track[];
        break;
      case 'album':
        if (isLoadingAlbum || !albumTracks) return;
        tracksList = albumTracks.data.data.album.tracks;
        break;
      case 'search':
        tracksList = [currentTrack as Track];
        break;
      case 'liked':
        if (isLoadingLikedTracks || !likedTracks) return;
        tracksList = likedTracks?.data.data?.tracks.map((entry) => entry.track);
        break;
      default:
        break;
    }
    setCurrentTracks(tracksList);
  }, [
    albumTracks,
    playlistTracks,
    isLoadingPlaylist,
    popularArtistTracks,
    isLoadingArtistTracks,
    contextType,
    currentTrack,
    likedTracks,
    isLoadingLikedTracks,
    isLoadingAlbum,
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
