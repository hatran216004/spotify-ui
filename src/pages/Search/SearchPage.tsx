import { searchServices } from '@/services/search';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import SearchTracks from './SearchTracks';
import SearchArtist from './SearchArtist';
import { Track } from '@/types/track.type';
import { Artist } from '@/types/artist.type';
import { Album } from '@/types/album.type';
import SearchAlbums from './SearchAlbums';
import DotIndicator from '@/components/DotIndicator';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data, isLoading } = useQuery({
    queryKey: ['search-all', query],
    queryFn: () => searchServices.searchAll(query as string),
    enabled: !!query
  });

  const resultType = data?.data.data.type;
  const resultData = data?.data.data.result;

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <DotIndicator />
      </div>
    );
  }

  return (
    <div className="py-4 px-2 mx-2 overflow-auto h-full">
      {resultData && resultData.length > 0 ? (
        <>
          <h4 className="text-2xl font-bold text-white mb-3">Top result</h4>
          {/* Tracks */}
          {resultType === 'tracks' && (
            <div className="space-y-2">
              {(resultData as Track[]).map((track) => (
                <SearchTracks track={track} key={track._id} />
              ))}
            </div>
          )}

          {/* Artists */}
          {resultType === 'artists' && (
            <div className="space-y-2">
              {(resultData as Artist[]).map((artist) => (
                <SearchArtist artist={artist} key={artist._id} />
              ))}
            </div>
          )}

          {/* Albums */}
          {resultType === 'albums' && (
            <div className="space-y-2">
              {(resultData as Album[]).map((album) => (
                <SearchAlbums album={album} key={album._id} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mb-4 text-gray-500 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-2xl font-semibold mb-2">Oops!</p>
          <p className="text-center text-gray-400">
            No results found for keyword:{' '}
            <span className="font-bold text-white">"{query}"</span>
          </p>
        </div>
      )}
    </div>
  );
}
