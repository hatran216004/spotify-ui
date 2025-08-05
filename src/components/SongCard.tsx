import { Song } from '@/types/song.type';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PlayAudio from './PlayAudio';

export default function SongCard({
  song,
  className = ''
}: {
  song?: Song;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'group space-y-2 p-3 hover:bg-[#ffffff1a] transition-[transform,background-color] duration-200 rounded-[6px] relative cursor-pointer',
        className
      )}
    >
      <div className="pt-[100%] relative rounded-[6px]">
        <img
          className="absolute top-0 left-0 h-full w-full object-cover rounded-[6px]"
          src={song?.imageUrl}
          alt={song?.title}
        />
        <PlayAudio
          hasTooltip={false}
          size="md"
          variant="primary"
          className="hover:opacity-100 hover:scale-[1.03] translate-y-4 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute right-2 bottom-2"
        />
      </div>
      <h1 className="text-sm font-semibold text-white capitalize">
        {song?.title}
      </h1>
      {song?.artists &&
        song?.artists.map((artist, index) => (
          <Link
            to="/"
            className="text-[#b3b3b3] text-sm capitalize"
            key={artist._id}
          >
            {artist.name}
            {song?.artists![index + 1]?.name ? ',' : ''}
          </Link>
        ))}
    </div>
  );
}
