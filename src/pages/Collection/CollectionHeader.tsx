import { useUserStore } from '@/store/ui.store';

export default function CollectionHeader({
  likedTracksLength
}: {
  likedTracksLength: number;
}) {
  const user = useUserStore().user;

  return (
    <div className="px-4 shadow-2xl py-[28px] rounded-tl-[10px] rounded-tr-[10px]">
      <div className="grid grid-cols-12 gap-5 items-end">
        <div className="col-span-3">
          <div className="pt-[100%] relative rounded-sm overflow-hidden">
            <img
              src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
              className="absolute w-full h-full top-0 left-0 object-cover"
              alt="Liked songs"
            />
          </div>
        </div>
        <div className="col-span-9">
          <div className="space-y-5">
            <span className="text-sm text-white font-medium">Playlist</span>
            <h1 className="text-7xl text-white font-bold truncate uppercase">
              Liked Songs
            </h1>
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <h1 className="hover:underline">{user?.username}</h1>
              <span>
                • {likedTracksLength} track
                {likedTracksLength > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
