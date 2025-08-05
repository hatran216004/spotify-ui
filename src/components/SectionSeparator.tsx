import clsx from 'clsx';

export default function SectionSeparator({
  text,
  className = ''
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={clsx('h-[1px] bg-white rounded-full relative', className)}>
      {text && (
        <span className="text-xs p-2 bg-[#0a0a0a] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {text}
        </span>
      )}
    </div>
  );
}
