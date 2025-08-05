import { Play } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import clsx from 'clsx';

export default function PlayAudio({
  hasTooltip = true,
  className = '',
  iconClassname = '',
  iconColor = '#000',
  iconSize = 18,
  variant = 'primary',
  size = 'sm',
  onClick
}: {
  hasTooltip?: boolean;
  className?: string;
  iconClassname?: string;
  iconSize?: number;
  iconColor?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'lg' | 'md';
  onClick?: () => void;
}) {
  return (
    <>
      {hasTooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onClick?.()}
              className={clsx(
                'rounded-full flex items-center justify-center cursor-pointer hover:opacity-80',
                className,
                {
                  'bg-white': variant === 'secondary',
                  'bg-[#1db954]': variant === 'primary',
                  'w-8 h-8': size === 'sm',
                  'w-12 h-12': size === 'md'
                }
              )}
            >
              <Play
                size={iconSize}
                fill={iconColor}
                className={clsx('text-black', iconClassname)}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Play</p>
          </TooltipContent>
        </Tooltip>
      )}
      {!hasTooltip && (
        <button
          onClick={() => onClick?.()}
          className={clsx(
            'rounded-full flex items-center justify-center cursor-pointer hover:opacity-80',
            className,
            {
              'bg-white': variant === 'secondary',
              'bg-[#1db954]': variant === 'primary',
              'w-8 h-8': size === 'sm',
              'w-12 h-12': size === 'md'
            }
          )}
        >
          <Play
            size={iconSize}
            fill={iconColor}
            className={clsx('text-black', iconClassname)}
          />
        </button>
      )}
    </>
  );
}
