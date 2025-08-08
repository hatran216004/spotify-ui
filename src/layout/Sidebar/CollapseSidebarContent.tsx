import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useSidebar } from '@/store/ui.store';
import { PanelLeftOpen, Plus } from 'lucide-react';

export default function CollapseSidebarContent() {
  const { onExpanded } = useSidebar();

  return (
    <div className="py-[32px] h-full shadow-xl gap-3 flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 w-full">
        <Tooltip>
          <TooltipTrigger onClick={onExpanded} className="p-2">
            <PanelLeftOpen
              size={32}
              className="hover:text-[#fff] text-[#929092]"
            />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Open your library</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="w-[35px] h-[35px] flex items-center justify-center bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-full cursor-pointer">
            <Plus size={24} className="hover:text-[#fff] text-[#929092]" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create a playlist</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex-1 flex flex-col items-center overflow-y-auto px-2 mx-2">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <div className="p-2 rounded-[10px] hover:bg-[#2a2a2a] cursor-pointer flex items-center justify-center">
                  <Avatar className="w-[48px] h-[48px] rounded-full">
                    <AvatarImage
                      src="https://i.pinimg.com/736x/1c/40/cf/1c40cff6872abab3ba5dd8f4cce4df98.jpg"
                      className="object-cover"
                    />
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Playlist...</p>
              </TooltipContent>
            </Tooltip>
          ))}
      </div>
    </div>
  );
}
