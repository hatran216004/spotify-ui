import { PlaylistItem } from '@/types/playlist.type';
import TrackItem from './TrackItem';

export default function TrackListContent({
  playlistTracks,
  playlistId
}: {
  playlistTracks?: PlaylistItem[];
  playlistId?: string;
}) {
  return (
    <ul className="py-2">
      {playlistTracks?.map((track) => (
        <TrackItem
          playlistId={playlistId}
          track={track}
          order={track.order}
          key={track._id}
        />
      ))}
    </ul>
  );
}
