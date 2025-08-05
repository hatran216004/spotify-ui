import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type MenuItemType = {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function MenuItem({
  className = '',
  children,
  icon,
  ...rest
}: MenuItemType) {
  return (
    <button
      {...rest}
      className={clsx(
        'py-2 px-3 w-full bg-[#1c1c1c] text-sm font-light flex items-center justify-between rounded-xs hover:bg-[#2b2b2b]',
        className
      )}
    >
      {children}
      {icon && icon}
    </button>
  );
}
