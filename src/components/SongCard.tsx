import { Song } from '@/types/song.type';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import TogglePlayBackAudio from './TogglePlayBackAudio';
import { useSong } from '@/store/song.store';
import { HTMLAttributes } from 'react';
import { useUserStore } from '@/store/ui.store';

type SongCardType = {
  song?: Song;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function SongCard({
  song,
  className = '',
  ...rest
}: SongCardType) {
  const navigate = useNavigate();
  const { isPlaying, currentSong, handlePlaySong } = useSong();
  const { isLogin } = useUserStore();

  return (
    <div onClick={() => navigate(`/songs/${song?._id}`)} {...rest}>
      <div
        className={clsx(
          'group space-y-2 p-3 hover:bg-[#ffffff1a] transition-all duration-200 rounded-[6px] relative cursor-pointer',
          className
        )}
      >
        <div className="pt-[100%] relative rounded-[6px]">
          <img
            className="absolute top-0 left-0 h-full w-full object-cover rounded-[6px]"
            src={song?.imageUrl}
            alt={song?.title}
          />
          <TogglePlayBackAudio
            onPlayAudio={() => {
              if (!isLogin) {
                navigate('/register');
                return;
              }
              handlePlaySong(song!);
            }}
            isPlaying={isPlaying && song?._id === currentSong?._id}
            hasTooltip={false}
            size="md"
            variant="primary"
            className="hover:opacity-100 hover:scale-[1.03] translate-y-4 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute right-2 bottom-2"
          />
        </div>
        <h1 className="text-sm font-semibold text-white capitalize truncate">
          {song?.title}
        </h1>
        <div className="truncate">
          {song?.artists &&
            song?.artists.map((artist, index) => (
              <span
                className="text-[#b3b3b3] text-sm capitalize"
                key={artist._id}
              >
                {artist.name}
                {song?.artists![index + 1]?.name ? ', ' : ''}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
