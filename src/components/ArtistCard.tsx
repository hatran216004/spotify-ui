import { Artist } from '@/types/artist.type';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function ArtistCard({
  artist,
  className = ''
}: {
  artist: Artist;
  className?: string;
}) {
  return (
    <Link to={`/artists/${artist._id}`}>
      <div
        className={clsx(
          'group space-y-2 p-3 hover:bg-[#ffffff1a] transition-all duration-200 rounded-[6px] relative cursor-pointer',
          className
        )}
      >
        <div className="pt-[100%] relative rounded-[6px]">
          <img
            className="absolute top-0 left-0 h-full w-full object-cover rounded-full"
            src={artist.avatarUrl}
            alt={artist.name}
          />
        </div>
        <h1 className="text-sm font-semibold text-white truncate">
          {artist.name}
        </h1>
        <div className="truncate">Artist</div>
      </div>
    </Link>
  );
}
