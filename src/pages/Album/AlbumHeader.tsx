import { FaMusic } from 'react-icons/fa';
import { useRef } from 'react';
import { useDominantColor } from '@/hooks/useDominantColor';
import { AlbumDetail } from '@/types/album.type';

export default function AlbumHeader({ album }: { album: AlbumDetail }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { color } = useDominantColor(imgRef, album);

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0.6) 0%, rgba(${color?.[0]},${color?.[1]},${color?.[2]},0) 70%)`
      }}
    >
      <div className="px-4 shadow-2xl py-[28px] rounded-tl-[10px] rounded-tr-[10px]">
        <div className="grid grid-cols-12 gap-5 items-end">
          <div className="col-span-3">
            <div className="pt-[100%] relative rounded-sm overflow-hidden">
              {album.coverImage ? (
                <img
                  ref={imgRef}
                  crossOrigin="anonymous"
                  src={album.coverImage}
                  className="absolute w-full h-full top-0 left-0 object-cover"
                  alt={album.title}
                />
              ) : (
                <div className="absolute w-full h-full top-0 left-0 bg-[#282828] flex items-center justify-center">
                  <FaMusic color="#929092" size={72} />
                </div>
              )}
            </div>
          </div>
          <div className="col-span-9">
            <div className="space-y-5">
              <span className="text-sm text-white font-medium">Album</span>
              <h1 className="text-7xl text-white font-bold truncate uppercase">
                {album.title}
              </h1>
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <img
                  src={album.artist.avatarUrl}
                  alt={album.artist.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <h1 className="hover:underline">{album.artist.name}</h1>
                <span>
                  • {album.tracks!.length} song
                  {album.tracks!.length > 1 && 's'}
                </span>
                {/* <span>• {trackTimeFormat(playlist.totalDuration!)}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
