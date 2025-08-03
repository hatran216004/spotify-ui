import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useSidebar } from '@/store/ui.store';
import { PanelLeftOpen, Plus } from 'lucide-react';

export default function CollapseSidebar() {
  const { onExpanded } = useSidebar();

  return (
    <aside className="col-span-1 h-[calc(100vh-var(--now-playing-bar-height)-var(--top-bar-height))] rounded-[10px] bg-[#121212]">
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
            <TooltipContent>
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
                        src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/335849762_647057723892150_2740165209836350945_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF9yJp0S9wtQK4a-rJaA32vUN3YSYbt2CpQ3dhJhu3YKtYoh2fuWZMbcfc6xNljlVig5_krn99ByVBrjXRH5bds&_nc_ohc=0wvsZ2hlBegQ7kNvwHEYX8e&_nc_oc=AdlizDU5Z9RQPhIniAOqjWcRJhAPk7ocSiouvR375UN722WC07PONwMSK1NyGPsFcCo&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=uOM-k59YWyVxFZceA1bOmw&oh=00_AfSzM3fPlrOsYazQNlRg9BFSqZv1f345X1UkzTp4PywGrA&oe=6894582D"
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
    </aside>
  );
}
