import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import SidebarSearch from '@/components/SidebarSearch';
import { AlignJustify, PanelRightOpen, Plus } from 'lucide-react';
import { useSidebar } from '@/store/ui.store';
import TagButton from '@/components/TagButton';
import MyPlaylists from '@/components/MyPlaylists';

export default function ExpandedSidebarContent() {
  const { onExpanded } = useSidebar();

  return (
    <div className="py-[32px] h-full shadow-xl flex flex-col">
      <header className="px-3 flex items-center justify-between">
        <div className="group-hover:translate-x-0 -translate-x-[36px] flex items-center gap-3 cursor-pointer transition-transform duration-150">
          <Tooltip>
            <TooltipTrigger
              onClick={onExpanded}
              className="group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all duration-300"
            >
              <PanelRightOpen className="hover:text-[#fff] text-[#929092]" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Collapse your library</p>
            </TooltipContent>
          </Tooltip>
          <h4 className="font-semibold">Your Library</h4>
        </div>
        <Tooltip>
          <TooltipTrigger className="py-2 px-4 ml-auto flex items-center rounded-full gap-2 cursor-pointer bg-[#1f1f1f] hover:bg-[#2a2a2a]">
            <Plus />
            <span>Create</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a playlist</p>
          </TooltipContent>
        </Tooltip>
      </header>

      <div className="mt-5 px-3 flex items-center gap-3">
        <TagButton>Playlist</TagButton>
        <TagButton>Artists</TagButton>
      </div>

      <div className="mt-5 px-3 flex items-center justify-between">
        <SidebarSearch />
        <div className="flex items-center gap-2 text-sm text-[#929092] cursor-pointer hover:text-[#fff] transition-all duration-250">
          <span>Recents</span>
          <AlignJustify size={18} />
        </div>
      </div>

      <MyPlaylists />
    </div>
  );
}
