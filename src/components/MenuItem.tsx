import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type MenuItemType = {
  className?: string;
  hasSeparate?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconSide?: 'start' | 'end';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function MenuItem({
  className = '',
  children,
  icon,
  iconSide = 'end',
  hasSeparate = false,
  ...rest
}: MenuItemType) {
  return (
    <>
      {hasSeparate && <span className="block bg-gray-700 h-[1px]"></span>}
      <button
        {...rest}
        className={clsx(
          'py-2 px-3 w-full bg-[#1c1c1c] text-sm font-light flex items-center rounded-xs hover:bg-[#2b2b2b]',
          className,
          iconSide === 'end' ? 'justify-between' : 'gap-2'
        )}
      >
        {icon && iconSide === 'start' && icon}
        {children}
        {icon && iconSide === 'end' && icon}
      </button>
    </>
  );
}
