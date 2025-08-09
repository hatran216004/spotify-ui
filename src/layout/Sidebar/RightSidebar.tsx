import ArtistDetailInfo from '@/components/ArtistDetailInfo';
import CopyLinkButton from '@/components/CopyLinkButton';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useSong } from '@/store/song.store';
import { useSidebar } from '@/store/ui.store';
import { CirclePlus, PanelLeftOpen, Share } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RightSidebar() {
  const { onExpandedRightSidebar } = useSidebar();
  const { currentSong } = useSong();

  if (!currentSong || !currentSong?.artists) return null;

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
          to={`songs/${currentSong?._id}`}
          className="hover:underline font-bold"
        >
          {currentSong?.title}
        </Link>
      </div>
      <div className="pt-[100%] relative rounded-[10px] overflow-hidden">
        <img
          src={currentSong?.imageUrl}
          alt={currentSong?.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex-1 text-nowrap">
          <Link
            to={`/songs/${currentSong?._id}`}
            className="font-semibold text-3xl hover:underline"
          >
            {currentSong?.title}
          </Link>
          <div className="truncate flex">
            {currentSong?.artists?.map((artist, _, array) => {
              const isLast = artist._id === array[array.length - 1]._id;
              return (
                <h4 className="font-medium text-[#b3b3b3]" key={artist._id}>
                  {artist.name}
                  {!isLast && array.length > 1 ? ', ' : ''}
                </h4>
              );
            })}
          </div>
        </div>
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
              <button className="group/icon p-1 cursor-pointer">
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
      <ArtistDetailInfo />
    </div>
  );
}
