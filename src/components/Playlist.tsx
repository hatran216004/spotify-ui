import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Play, Volume2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function Playlist() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Link
      to="/"
      className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2a2a] relative"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {isActive && (
        <Tooltip>
          <TooltipTrigger className="absolute left-[22px] z-1">
            <Play className="fill-white text-white" />
          </TooltipTrigger>
          <TooltipContent sideOffset={20}>
            <p>Play ...</p>
          </TooltipContent>
        </Tooltip>
      )}

      <Avatar className="w-[48px] h-[48px] rounded-[4px] group-hover:opacity-70">
        <AvatarImage
          src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/335849762_647057723892150_2740165209836350945_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF9yJp0S9wtQK4a-rJaA32vUN3YSYbt2CpQ3dhJhu3YKtYoh2fuWZMbcfc6xNljlVig5_krn99ByVBrjXRH5bds&_nc_ohc=0wvsZ2hlBegQ7kNvwHEYX8e&_nc_oc=AdlizDU5Z9RQPhIniAOqjWcRJhAPk7ocSiouvR375UN722WC07PONwMSK1NyGPsFcCo&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=uOM-k59YWyVxFZceA1bOmw&oh=00_AfSzM3fPlrOsYazQNlRg9BFSqZv1f345X1UkzTp4PywGrA&oe=6894582D"
          className="object-cover"
        />
      </Avatar>
      <div>
        <h4
          className={clsx(
            'font-medium',
            isActive ? 'text-[#1db954]' : 'text-[#eee]'
          )}
        >
          My playlist #
        </h4>
        <span className="text-[#929092] text-sm">Playlist . Ha Tran</span>
      </div>

      {isActive && (
        <Volume2
          size={18}
          className="absolute right-2.5"
          fill="#1db954"
          stroke="#1db954"
        />
      )}
    </Link>
  );
}
