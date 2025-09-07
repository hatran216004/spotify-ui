/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import useMenu from '@/hooks/useMenu';
import { MenuPreset, MenyItemContext } from '@/types/utils.type';
import { Ellipsis } from 'lucide-react';
import { ElementType } from 'react';

type TrackItemMenuProps = {
  trackId?: string;
  tooltipText?: string;
  preset?: MenuPreset;
  hiddenItems?: string[]; // Ẩn các item cụ thể
  context?: MenyItemContext; // Context bổ sung cho các action
  onCustomAction?: (actionId: string, trackId: string, context?: any) => void;
};

export default function TrackItemMenu({
  tooltipText,
  trackId,
  preset = 'full',
  context
}: TrackItemMenuProps) {
  const { filteredDefaultItems, handleItemClick } = useMenu({
    trackId,
    context,
    preset
  });

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="group p-1 cursor-pointer outline-none">
              <Ellipsis
                size={24}
                className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
              />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>More options for {tooltipText}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="center">
        {filteredDefaultItems.map((item) => {
          const Icon = item.icon as ElementType;

          if (item.children?.length) {
            return (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icon className="opacity-40 mx-1" size={18} />
                  {item.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {item.children.map((it, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleItemClick(it)}
                      disabled={it.disabled}
                    >
                      {it.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          }

          return (
            <DropdownMenuItem
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
            >
              <Icon />
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
