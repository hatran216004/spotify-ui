import { searchServices } from '@/services/search';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import SearchTrack from './SearchTrack';
import { Track } from '@/types/track.type';
import SearchArtist from './SearchArtist';
import { Artist } from '@/types/artist.type';

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

  if (!isLoading) {
    console.log(data);
  }

  return (
    <div className="py-4 px-2 mx-2 overflow-auto h-full">
      {resultData && (
        <>
          <h4 className="text-2xl font-bold text-white mb-3">Top result</h4>
          {/* Tracks */}
          {resultType === 'tracks' && resultData.length > 0 && (
            <div className="space-y-2">
              {(resultData as Track[]).map((track) => (
                <SearchTrack track={track} key={track._id} />
              ))}
            </div>
          )}

          {/* Artists */}
          {resultType === 'artists' && resultData.length > 0 && (
            <div className="space-y-2">
              {(resultData as Artist[]).map((artist) => (
                <SearchArtist artist={artist} key={artist._id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
