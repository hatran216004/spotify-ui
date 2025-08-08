import { Link } from 'react-router-dom';
import { TooltipTrigger, TooltipContent, Tooltip } from '../ui/tooltip';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useSidebar } from '@/store/ui.store';
import { useSong } from '@/store/song.store';

export default function TrackInfo() {
  const { isSidebarRightExpanded, onExpandedRightSidebar } = useSidebar();
  const { currentSong } = useSong();

  const Icon = isSidebarRightExpanded ? ChevronDown : ChevronUp;

  return (
    <>
      {currentSong && (
        <div className="flex items-center gap-3 p-2 rounded-lg relative">
          <Avatar className="group w-[48px] h-[48px] rounded-[4px] relative">
            <AvatarImage src={currentSong.imageUrl} className="object-cover" />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onExpandedRightSidebar}
                  className="hidden absolute right-1 top-1 z-1 w-6 h-6 rounded-full bg-black opacity-60 group-hover:flex items-center justify-center"
                >
                  <Icon color="#fff" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isSidebarRightExpanded ? 'Collapse' : 'Expanded'}</p>
              </TooltipContent>
            </Tooltip>
          </Avatar>
          <div>
            <Link to="#">
              <h4 className="font-medium text-[#eee] hover:underline">
                {currentSong.title}
              </h4>
            </Link>
            <div className="flex truncate">
              {currentSong.artists!.map((artist, _, array) => {
                const isLastArtist = artist._id === array[array.length - 1]._id;
                return (
                  <Link to="#" key={artist._id}>
                    <h4 className="text-[#929092] text-sm hover:underline capitalize">
                      {artist.name}
                      {!isLastArtist ? ', ' : ''}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger
              className="p-1 cursor-pointer"
              onClick={() => console.log('add to playlist')}
            >
              <span className="w-4 h-4 rounded-full bg-[#1db954] flex items-center justify-center">
                <Check color="#000" size={12} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to playlist</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
}
