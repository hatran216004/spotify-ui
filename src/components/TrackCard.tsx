import { Track } from '@/types/track.type';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import TogglePlayBackAudio from './TogglePlayBackAudio';
import { useTrack } from '@/store/track.store';
import { HTMLAttributes } from 'react';
import usePlayContext from '@/hooks/usePlayContext';
import { useAuth } from '@clerk/clerk-react';

type TrackCardType = {
  track?: Track;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function TrackCard({ track, className = '' }: TrackCardType) {
  const navigate = useNavigate();
  const { isPlaying } = useTrack();
  const { isSignedIn } = useAuth();

  const { isSameTrack, handlePlayTrackItem } = usePlayContext({
    id: track?._id as string,
    type: 'search',
    data: track
  });

  return (
    <div onClick={() => navigate(`/tracks/${track?._id}`)}>
      <div
        className={clsx(
          'group space-y-2 p-3 hover:bg-[#ffffff1a] transition-all duration-200 rounded-[6px] relative cursor-pointer',
          className
        )}
      >
        <div className="pt-[100%] relative rounded-[6px]">
          <img
            className="absolute top-0 left-0 h-full w-full object-cover rounded-[6px]"
            src={track?.imageUrl}
            alt={track?.title}
          />
          <TogglePlayBackAudio
            onPlayAudio={() => {
              if (!isSignedIn) {
                return navigate('/register');
              }
              handlePlayTrackItem();
            }}
            isPlaying={isPlaying && isSameTrack}
            hasTooltip={false}
            size="md"
            variant="primary"
            className="hover:opacity-100 hover:scale-[1.03] translate-y-4 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute right-2 bottom-2"
          />
        </div>
        <h1 className="text-sm font-semibold text-white capitalize truncate">
          {track?.title}
        </h1>
        <div className="truncate">
          {track?.artists?.map((artist, index) => {
            return (
              <span key={index} className="text-[#b3b3b3] text-sm capitalize">
                {artist.name}
                {track?.artists![index + 1]?.name ? ', ' : ''}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
