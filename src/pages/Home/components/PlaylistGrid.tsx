import PlaylistPlaceholder from '@/components/PlaylistPlaceholder';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import { playlistServices } from '@/services/playlist';
import { useQuery } from '@tanstack/react-query';

export default function PlaylistGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: playlistServices.getAllPlaylists
  });

  if (isLoading) return null;
  const playlists = data?.data?.data?.playlists;

  return (
    <section className="mt-2 grid grid-cols-12 gap-2">
      {playlists &&
        playlists.map((playlist) => (
          <div
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
            <TogglePlayBackAudio
              className="absolute right-2 hidden shadow-2xl group-hover:flex"
              iconColor="#000"
              hasTooltip={false}
            />
          </div>
        ))}
    </section>
  );
}
