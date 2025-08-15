import { type PlaylistTrack } from '@/types/playlist.type';
import { trackTimeFormat } from '@/utils/datetime';
import { Ellipsis } from 'lucide-react';

export default function TrackGhost({ track, order }: PlaylistTrack) {
  return (
    <li className="p-1 grid grid-cols-12 items-center hover:bg-[#2b2b2b] rounded-sm select-none">
      <div className="col-span-1 text-sm text-[#b3b3b3] flex justify-center">
        {order + 1}
      </div>
      <div className="col-span-5">
        <div className="flex items-center gap-4">
          <img
            className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
            src={track.imageUrl}
            alt={track.title}
          />
          <div className="flex flex-col text-[1rem] capitalize">
            <p className="font-medium text-[1rem]">{track.title}</p>
            <h3 className="text-[#b3b3b3] text-sm">
              {track.artists?.[0].name}
            </h3>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <h3 className="px-4 text-[#b3b3b3] text-sm">
          {track.artists?.[0].name}
        </h3>
      </div>
      <div className="col-span-3">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-[#b3b3b3] text-sm">
            {trackTimeFormat(track.duration || 0)}
          </span>
          <div className="p-1">
            <Ellipsis
              size={24}
              className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
            />
          </div>
        </div>
      </div>
    </li>
  );
}
