import clsx from 'clsx';

export default function DotIndicator({
  className = ''
}: {
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 rounded-2xl bg-transparent',
        className
      )}
    >
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-[#d1d1d1] animate-bounce opacity-70"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </div>
  );
}
