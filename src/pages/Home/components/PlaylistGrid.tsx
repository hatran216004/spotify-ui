import PlaylistPlaceholder from '@/components/PlaylistPlaceholder';
import { playlistServices } from '@/services/playlist';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function PlaylistGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ['playlists-popular'],
    queryFn: playlistServices.getPopularPlaylists
  });

  if (isLoading) return null;
  const playlists = data?.data?.data?.playlists;

  return (
    <section className="mt-2 grid grid-cols-12 gap-2">
      {playlists &&
        playlists.map((playlist) => (
          <Link
            to={`/playlists/${playlist._id}`}
            key={playlist._id}
            className="group flex items-center col-span-6 relative rounded-sm bg-[#ffffff1a] hover:bg-[#FAFAFA33] overflow-hidden cursor-pointer"
          >
            {playlist.coverImage ? (
              <img
                className="w-12 h-12 object-cover"
                src={playlist.coverImage}
                alt={playlist.name}
              />
            ) : (
              <PlaylistPlaceholder />
            )}

            <h2 className="mx-2 text-sm font-semibold text-white">
              {playlist.name}
            </h2>
          </Link>
        ))}
    </section>
  );
}
