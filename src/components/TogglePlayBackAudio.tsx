import { Pause, Play } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import clsx from 'clsx';

const buttonCss = {
  secondary: 'bg-white',
  primary: 'bg-[#1db954]',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-14 h-14'
};

type TogglePlayBackAudioProps = {
  hasTooltip?: boolean;
  className?: string;
  iconClassname?: string;
  iconSize?: number;
  iconColor?: string;
  isPlaying?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'lg' | 'md';
  onPlayAudio?: () => void;
};

export default function TogglePlayBackAudio({
  hasTooltip = true,
  className = '',
  iconClassname = '',
  iconColor = '#000',
  iconSize = 18,
  variant = 'primary',
  size = 'sm',
  isPlaying = false,
  onPlayAudio = () => {}
}: TogglePlayBackAudioProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onPlayAudio?.();
  };

  const Icon = isPlaying ? Pause : Play;
  const button = (
    <button
      onClick={handleClick}
      className={clsx(
        'rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-200',
        className,
        buttonCss[variant],
        buttonCss[size]
      )}
      aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
    >
      <Icon
        size={iconSize}
        fill={iconColor}
        className={clsx('text-black', iconClassname)}
      />
    </button>
  );

  return hasTooltip ? (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>
        <p>{isPlaying ? 'Pause' : 'Play'}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    button
  );
}
