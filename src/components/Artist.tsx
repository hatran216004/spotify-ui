import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Play, Volume2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function Artist() {
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

      <Avatar className="w-[48px] h-[48px] rounded-full group-hover:opacity-70">
        <AvatarImage
          src="https://i.pinimg.com/736x/1c/40/cf/1c40cff6872abab3ba5dd8f4cce4df98.jpg"
          className="object-cover"
        />
      </Avatar>
      <div>
        <h4
          className={clsx(
            'font-medium capitalize',
            isActive ? 'text-[#1db954]' : 'text-[#eee]'
          )}
        >
          abc
        </h4>
        <span className="text-[#929092] text-sm capitalize">Artist</span>
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
