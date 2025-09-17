/* eslint-disable @typescript-eslint/no-explicit-any */
import { searchServices } from '@/services/search';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import SearchTracks from './SearchTracks';
import SearchArtist from './SearchArtist';
import SearchAlbums from './SearchAlbums';
import DotIndicator from '@/components/DotIndicator';
import { Track } from '@/types/track.type';
import { Artist } from '@/types/artist.type';
import { Album } from '@/types/album.type';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data, isLoading, error } = useQuery({
    queryKey: ['search-all', query],
    queryFn: () => searchServices.searchAll(query as string),
    enabled: !!query && query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes,
  });

  const searchResult = data?.data?.data;
  const resultType = searchResult?.type;
  const resultData = searchResult?.result || [];
  const source = searchResult?.source; // 'cache' or 'database'
  const total = searchResult?.total || 0;

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <DotIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-red-400">
        <p className="text-xl font-semibold mb-2">Search Error</p>
        <p className="text-center">Something went wrong. Please try again.</p>
      </div>
    );
  }

  // Handle different result types for 'all' search
  const renderAllResults = () => {
    if (resultType === 'all' && Array.isArray(resultData)) {
      return resultData.map((section) => (
        <div key={section.type} className="mb-8">
          <h5 className="text-lg font-semibold text-white mb-3 capitalize">
            {section.type} ({section.count})
          </h5>
          <div className="space-y-2">
            {section.type === 'tracks' &&
              section.results.map((track: any) => (
                <SearchTracks track={track} key={track._id} />
              ))}
            {section.type === 'artists' &&
              section.results.map((artist: any) => (
                <SearchArtist artist={artist} key={artist._id} />
              ))}
            {section.type === 'albums' &&
              section.results.map((album: any) => (
                <SearchAlbums album={album} key={album._id} />
              ))}
          </div>
        </div>
      ));
    }
    return null;
  };

  // Handle single type results
  const renderSingleTypeResults = () => {
    if (!Array.isArray(resultData) || resultData.length === 0) return null;

    return (
      <div className="space-y-2">
        {resultType === 'tracks' &&
          (resultData as Track[]).map((track) => (
            <SearchTracks track={track} key={track._id} />
          ))}
        {resultType === 'artists' &&
          (resultData as Artist[]).map((artist) => (
            <SearchArtist artist={artist} key={artist._id} />
          ))}
        {resultType === 'albums' &&
          (resultData as Album[]).map((album) => (
            <SearchAlbums album={album} key={album._id} />
          ))}
      </div>
    );
  };

  return (
    <div className="py-4 px-2 mx-2 overflow-auto h-full">
      {/* Search Info */}
      {query && (
        <div className="mb-4">
          <h3 className="text-xl text-white mb-1">
            Search results for: <span className="font-bold">"{query}"</span>
          </h3>
          {total > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Found {total} results</span>
              {source === 'cache' && (
                <span className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                  Cached
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {total > 0 ? (
        <>
          <h4 className="text-2xl font-bold text-white mb-3">
            {resultType === 'all' ? 'All Results' : 'Top Results'}
          </h4>

          {/* Render based on result type */}
          {resultType === 'all'
            ? renderAllResults()
            : renderSingleTypeResults()}
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
          <p className="text-2xl font-semibold mb-2">
            {!query ? 'Start searching' : 'No results found'}
          </p>
          {query ? (
            <p className="text-center text-gray-400">
              No results found for keyword:{' '}
              <span className="font-bold text-white">"{query}"</span>
            </p>
          ) : (
            <p className="text-center text-gray-400">
              Enter a search term to find tracks, artists, and albums
            </p>
          )}
        </div>
      )}
    </div>
  );
}
