import clsx from 'clsx';

export default function PlayingBarIcon({
  className = ''
}: {
  className?: string;
}) {
  return (
    <div className={clsx('flex items-end gap-[2px] h-5', className)}>
      <div className="w-[3px] bg-[#1db954] animate-playing-bars delay-0"></div>
      <div className="w-[3px] bg-[#1db954] animate-playing-bars delay-[0.2s]"></div>
      <div className="w-[3px] bg-[#1db954] animate-playing-bars delay-[0.4s]"></div>
    </div>
  );
}
