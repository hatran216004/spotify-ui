import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type TagButtonType = {
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function TagButton({
  className,
  children,
  ...rest
}: TagButtonType) {
  return (
    <button
      className={clsx(
        'py-2 px-4 text-sm rounded-full gap-2 cursor-pointer bg-[#1f1f1f] hover:bg-[#2a2a2a]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
