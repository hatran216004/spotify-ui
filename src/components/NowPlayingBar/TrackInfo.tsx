import { Link } from 'react-router-dom';
import { TooltipTrigger, TooltipContent, Tooltip } from '../ui/tooltip';
import { Check, ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

export default function TrackInfo() {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg relative">
      <Avatar className="group w-[48px] h-[48px] rounded-[4px] relative">
        <AvatarImage
          src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/335849762_647057723892150_2740165209836350945_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF9yJp0S9wtQK4a-rJaA32vUN3YSYbt2CpQ3dhJhu3YKtYoh2fuWZMbcfc6xNljlVig5_krn99ByVBrjXRH5bds&_nc_ohc=0wvsZ2hlBegQ7kNvwHEYX8e&_nc_oc=AdlizDU5Z9RQPhIniAOqjWcRJhAPk7ocSiouvR375UN722WC07PONwMSK1NyGPsFcCo&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=uOM-k59YWyVxFZceA1bOmw&oh=00_AfSzM3fPlrOsYazQNlRg9BFSqZv1f345X1UkzTp4PywGrA&oe=6894582D"
          className="object-cover"
        />
        <Tooltip>
          <TooltipTrigger className="hidden absolute right-1 top-1 z-1 w-6 h-6 rounded-full bg-black opacity-60 group-hover:flex items-center justify-center">
            <ChevronDown color="#fff" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Collapse</p>
          </TooltipContent>
        </Tooltip>
      </Avatar>
      <div>
        <Link to="/">
          <h4 className="font-medium text-[#eee] hover:underline">
            Nơi này có anh
          </h4>
        </Link>
        <Link to="/">
          <h4 className="text-[#929092] text-sm hover:underline">
            Sơn Tùng M-TP
          </h4>
        </Link>
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
  );
}
