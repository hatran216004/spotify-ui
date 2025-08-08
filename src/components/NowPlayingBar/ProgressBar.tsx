import clsx from 'clsx';
import { RefObject } from 'react';

export default function ProgressBar({
  type = 'playback',
  progressValue = 0,
  progressRef,
  isSeeking,
  onSeeking = () => {},
  onStartSeeking = () => {}
}: {
  type?: 'volume' | 'playback';
  progressValue?: number;
  progressRef?: RefObject<HTMLDivElement | null>;
  isSeeking?: boolean;
  onSeeking?: (clientX: number) => void;
  onStartSeeking?: () => void;
}) {
  return (
    <div
      className="group py-1 flex-1"
      onMouseDown={onStartSeeking}
      onMouseUp={(e) => onSeeking(e.clientX)}
    >
      <div
        ref={progressRef}
        className={clsx(
          'h-1 rounded-full bg-gray-500 ',
          type === 'volume' && 'w-[94px]'
        )}
      >
        <div
          className={clsx(
            'h-1 relative rounded-full group-hover:bg-[#1db954]',
            isSeeking ? 'bg-[#1db954]' : 'bg-white'
          )}
          style={{ width: `${progressValue}%` }}
        >
          <span
            className={clsx(
              'absolute w-3 h-3 bg-transparent rounded-full group-hover:bg-white translate-x-1/2 -translate-y-1/2 top-1/2 right-0 shadow-2xl',
              isSeeking && 'bg-white'
            )}
          ></span>
        </div>
      </div>
    </div>
  );
}
