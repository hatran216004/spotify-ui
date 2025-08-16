import { Track } from '@/types/track.type';
import ArtistTrackItem from './ArtistTrackItem';

export default function ArtistTable({ tracksList }: { tracksList: Track[] }) {
  return (
    <div className="p-4">
      {tracksList.map((track, index) => (
        <ArtistTrackItem order={index + 1} key={track._id} track={track} />
      ))}
    </div>
  );
}
