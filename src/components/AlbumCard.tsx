import { Album } from '@/types/album.type';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function AlbumCard({
  album,
  className = ''
}: {
  album: Album;
  className?: string;
}) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/albums/${album._id}`)}>
      <div
        className={clsx(
          'group space-y-2 p-3 hover:bg-[#ffffff1a] transition-all duration-200 rounded-[6px] relative cursor-pointer',
          className
        )}
      >
        <div className="pt-[100%] relative rounded-[6px]">
          <img
            className="absolute top-0 left-0 h-full w-full object-cover rounded-[6px]"
            src={album.coverImage}
            alt={album.title}
          />
        </div>
        <h1 className="text-sm font-semibold text-white capitalize truncate">
          {album.title}
        </h1>
        <div className="truncate">
          <span
            className="text-[#b3b3b3] text-sm capitalize"
            key={album.artist._id}
          >
            {album.artist.name}
          </span>
        </div>
      </div>
    </div>
  );
}
