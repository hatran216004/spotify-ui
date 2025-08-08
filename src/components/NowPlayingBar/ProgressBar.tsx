import clsx from 'clsx';
import { RefObject } from 'react';

export default function ProgressBar({
  progressValue = 0,
  progressRef,
  isSeeking,
  onSeeking = () => {},
  onStartSeeking = () => {}
}: {
  progressValue?: number;
  progressRef?: RefObject<HTMLDivElement | null>;
  isSeeking?: boolean;
  onSeeking?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onStartSeeking?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <span className="text-xs text-[#929092]">0:26</span>
      <div
        className="group py-1"
        onMouseDown={onStartSeeking}
        onMouseUp={(e) => onSeeking(e)}
      >
        <div
          ref={progressRef}
          className="h-1 w-[516px] max-w-full rounded-full bg-gray-500"
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
      <span className="text-xs text-[#929092]">4:53</span>
    </div>
  );
}
