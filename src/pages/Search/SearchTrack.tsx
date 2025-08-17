import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import usePlayContext from '@/hooks/usePlayContext';
import { useTrack } from '@/store/track.store';
import { Track } from '@/types/track.type';
import { useNavigate } from 'react-router-dom';

export default function SearchTrack({ track }: { track: Track }) {
  const navigate = useNavigate();
  const { isPlaying } = useTrack();
  const { isSameTrack, handlePlayTrackItem } = usePlayContext({
    id: null,
    type: 'search',
    data: track
  });

  return (
    <div
      onClick={() => navigate(`/tracks/${track._id}`)}
      key={track._id}
      className="p-4 rounded-[10px] bg-[#181818] relative group block hover:bg-[#1c1c1c]"
    >
      <div className="pt-24 w-24 relative">
        <img
          src={track.imageUrl}
          alt={track.title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px]"
        />
      </div>
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-white capitalize">
          {track.title}
        </h1>
        <div className="text-sm mt-2">
          <span className="text-gray-400">Song . </span>
          {track.artists.map((artist) => (
            <span
              key={artist._id}
              className="text-gray-200 font-semibold capitalize"
            >
              {artist.name}
            </span>
          ))}
        </div>
      </div>
      <TogglePlayBackAudio
        onPlayAudio={handlePlayTrackItem}
        isPlaying={isPlaying && isSameTrack}
        hasTooltip={false}
        size="md"
        variant="primary"
        className="hover:opacity-100 hover:scale-[1.03] translate-y-4 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute right-7 bottom-7"
      />
    </div>
  );
}
