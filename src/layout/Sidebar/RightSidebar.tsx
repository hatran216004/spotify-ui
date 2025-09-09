import ArtistDetailInfo from '@/components/ArtistDetailInfo';
import CopyLinkButton from '@/components/CopyLinkButton';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import useAddTrackToLiked from '@/hooks/useAddTrackToLiked';
import { useTrack } from '@/store/track.store';
import { useSidebar } from '@/store/ui.store';
import { CirclePlus, PanelLeftOpen, Share } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RightSidebar() {
  const { onExpandedRightSidebar } = useSidebar();
  const { currentTrack } = useTrack();
  const { handleAddTrackToLiked, isPending } = useAddTrackToLiked();

  if (!currentTrack || !currentTrack?.artists) return null;

  return (
    <div className="group p-2 h-[calc(100vh-var(--now-playing-bar-height)-var(--top-bar-height))] space-y-4 overflow-auto">
      <div className="group-hover:translate-x-0 -translate-x-[36px] flex items-center gap-3 cursor-pointer transition-transform duration-150">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onExpandedRightSidebar}
              className="group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all duration-300"
            >
              <PanelLeftOpen className="hover:text-[#fff] text-[#929092]" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hide now playing view</p>
          </TooltipContent>
        </Tooltip>
        <Link
          to={`tracks/${currentTrack?._id}`}
          className="hover:underline font-bold"
        >
          {currentTrack?.title}
        </Link>
      </div>
      <div className="pt-[100%] relative rounded-[10px] overflow-hidden">
        <img
          src={currentTrack?.imageUrl}
          alt={currentTrack?.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex-1 truncate">
          <Link
            to={`/tracks/${currentTrack?._id}`}
            className="font-semibold text-2xl hover:underline"
          >
            {currentTrack?.title}
          </Link>
          <div className="truncate flex items-center justify-between mt-2">
            {currentTrack?.artists?.map((artist, _, array) => {
              const isLast = artist._id === array[array.length - 1]._id;
              return (
                <h4 className="font-medium text-[#b3b3b3]" key={artist._id}>
                  {artist.name}
                  {!isLast && array.length > 1 ? ', ' : ''}
                </h4>
              );
            })}
            <div className="flex items-center gap-2">
              <CopyLinkButton>
                <button className="group/icon p-1 cursor-pointer">
                  <Share
                    size={24}
                    className="text-[#929092] group-hover/icon:text-white group-hover/icon:scale-[1.05]"
                  />
                </button>
              </CopyLinkButton>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled={isPending}
                    className="group/icon p-1 cursor-pointer"
                    onClick={() => handleAddTrackToLiked(currentTrack._id)}
                  >
                    <CirclePlus
                      size={24}
                      className="text-[#929092] group-hover/icon:text-white group-hover/icon:scale-[1.05]"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to liked songs</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <ArtistDetailInfo />
    </div>
  );
}
