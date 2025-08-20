import { Album } from '@/types/album.type';
import { useNavigate } from 'react-router-dom';

export default function SearchAlbums({ album }: { album: Album }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/albums/${album._id}`)}
      key={album._id}
      className="p-4 rounded-[10px] bg-[#181818] relative group block hover:bg-[#1c1c1c]"
    >
      <div className="pt-24 w-24 relative">
        <img
          src={album.coverImage}
          alt={album.title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px]"
        />
      </div>
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-white capitalize">
          {album.title}
        </h1>
        <div className="text-sm mt-2">
          <span className="text-gray-400">Album . </span>

          <span className="text-gray-200 font-semibold capitalize">
            {album.artist.name}
          </span>
        </div>
      </div>
    </div>
  );
}
