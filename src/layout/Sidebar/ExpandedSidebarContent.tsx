import Playlist from '@/components/Playlist';
import RenderList from '@/components/RenderList';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import SidebarSearch from '@/components/SidebarSearch';
import Artist from '@/components/Artist';
import { AlignJustify, PanelRightOpen, Plus } from 'lucide-react';
import { useSidebar } from '@/store/ui.store';
import clsx from 'clsx';
import TagButton from '@/components/TagButton';

export default function ExpandedSidebarContent({
  isShowIcon
}: {
  isShowIcon?: boolean;
}) {
  const { onExpanded } = useSidebar();

  return (
    <div className="py-[32px] h-full shadow-xl flex flex-col">
      <header className="px-3 flex items-center justify-between">
        <div
          className={clsx(
            'flex items-center gap-3 cursor-pointer transition-transform duration-150',
            isShowIcon ? 'translate-x-0' : '-translate-x-[36px]'
          )}
        >
          <Tooltip>
            <TooltipTrigger
              onClick={onExpanded}
              className={clsx(
                'transition-all duration-300',
                isShowIcon ? 'opacity-100 visible' : 'opacity-0 invisible '
              )}
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

      <div className="mt-5 mx-[6px] px-[6px] overflow-y-auto">
        <RenderList
          data={Array(5).fill(0)}
          render={(_, index) => <Playlist key={index} />}
        />
        <RenderList
          data={Array(5).fill(0)}
          render={(_, index) => <Artist key={index} />}
        />
      </div>
    </div>
  );
}
