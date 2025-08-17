import { Artist } from '@/types/artist.type';
import { useNavigate } from 'react-router-dom';

export default function SearchArtist({ artist }: { artist: Artist }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/artists/${artist._id}`)}
      key={artist._id}
      className="p-4 rounded-[10px] bg-[#181818] group block hover:bg-[#1c1c1c]"
    >
      <div className="pt-24 w-24 relative rounded-full">
        <img
          src={artist.avatarUrl}
          alt={artist.name}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-white capitalize">
          {artist.name}
        </h1>
        <div className="text-gray-400 text-sm mt-2">Artist</div>
      </div>
    </div>
  );
}
