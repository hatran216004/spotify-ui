import { RefObject } from 'react';

export default function ArtistHeader({
  coverUrl,
  artistName,
  imgRef
}: {
  coverUrl: string;
  artistName: string;
  imgRef: RefObject<HTMLImageElement | null>;
}) {
  return (
    <>
      <img src={coverUrl} alt="" hidden ref={imgRef} crossOrigin="anonymous" />
      <div
        className="p-4 h-80 shadow-2xl flex rounded-t-[10px] bg-center bg-cover"
        style={{
          background: `url(${coverUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="space-y-5 mt-auto">
          <span className="text-sm text-white font-medium">Artist</span>
          <h1 className="text-7xl text-white font-bold truncate uppercase">
            {artistName}
          </h1>
        </div>
      </div>
    </>
  );
}
