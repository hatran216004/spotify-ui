import clsx from 'clsx';
import CollapseSidebarContent from './CollapseSidebarContent';
import ExpandedSidebarContent from './ExpandedSidebarContent';
import { useSidebar } from '@/store/ui.store';

export default function Sidebar({ className = '' }: { className?: string }) {
  const { isExpanded } = useSidebar();

  return (
    <aside
      className={clsx(
        'group relative h-[calc(100vh-var(--now-playing-bar-height)-var(--top-bar-height))] rounded-[10px] bg-[#121212] transition-all duration-300 ease-in-out overflow-hidden',
        className,
        isExpanded ? 'col-span-3' : 'col-span-1'
      )}
    >
      <div
        className={clsx(
          'h-full transition-transform duration-200 flex ease-linear',
          isExpanded
            ? 'transform translate-x-0 opacity-100 visible'
            : 'transform -translate-x-full opacity-0 invisible'
        )}
      >
        <div className="w-full flex-shrink-0">
          <ExpandedSidebarContent />
        </div>
      </div>

      <div
        className={clsx(
          'absolute inset-0 transition-all duration-200 ease-linear',
          isExpanded
            ? 'transform translate-x-full opacity-0 invisible'
            : 'transform translate-x-0 opacity-100 visible'
        )}
      >
        <CollapseSidebarContent />
      </div>
    </aside>
  );
}
