import InfoFooter from '@/layout/InfoFooter';
import usePlaylistById from '@/hooks/usePlaylistById';
import usePlayContext from '@/hooks/usePlayContext';
import { useParams } from 'react-router-dom';
import PlaylistHeader from './PlaylistHeader';
import PlaylistActions from './PlaylistActions';
import PlaylistTracks from '@/components/PlaylistTracks';
import PlaylistTracksHeading from '@/components/PlaylistTracksHeading';
import PlaylistTracksContent from '@/components/PlaylistTracksContent';
import { Track } from '@/types/track.type';

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const { playlist, isLoading } = usePlaylistById(playlistId!);

  const { handleStartPlay, hasTrackPlaying } = usePlayContext({
    id: playlistId!,
    type: 'playlist',
    data: playlist?.tracks?.map((entry) => entry.track) as Track[]
  });

  if (isLoading) return null;
  const playlistTrackLength = playlist?.tracks.length ?? 0;

  return (
    <div className="h-full overflow-auto rounded-[10px]">
      {playlist && (
        <>
          <PlaylistHeader playlist={playlist} />
          {playlistTrackLength > 0 && (
            <>
              <PlaylistActions
                playlistName={playlist.name}
                hasTrackPlaying={hasTrackPlaying}
                handleStartPlay={handleStartPlay}
              />
              <PlaylistTracks>
                <PlaylistTracksHeading />
                <PlaylistTracksContent
                  playlistTracks={playlist.tracks}
                  playlistId={playlist._id as string}
                />
              </PlaylistTracks>
            </>
          )}
        </>
      )}
      <InfoFooter />
    </div>
  );
}
