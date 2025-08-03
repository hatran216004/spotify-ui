// import clsx from 'clsx';
// import { useState } from 'react';
// import CollapseSidebarContent from './CollapseSidebarContent';
// import ExpandedSidebarContent from './ExpandedSidebarContent';
// import { useSidebar } from '@/store/ui.store';

// export default function Sidebar({ className = '' }: { className?: string }) {
//   const [isShowIcon, setIsShowIcon] = useState(false);
//   const { isExpanded } = useSidebar();

//   return (
//     <aside
//       className={clsx(
//         'h-[calc(100vh-var(--now-playing-bar-height)-var(--top-bar-height))] rounded-[10px] bg-[#121212] transition-all duration-300',
//         className,
//         isExpanded
//           ? 'translate-x-0 opacity-100 visible col-span-3'
//           : '-translate-x-full opacity-0 invisible col-span-1'
//       )}
//       onMouseEnter={() => setIsShowIcon(true)}
//       onMouseLeave={() => setIsShowIcon(false)}
//     >
//       <ExpandedSidebarContent isShowIcon={isShowIcon} />

//       <CollapseSidebarContent />
//     </aside>
//   );
// }

import clsx from 'clsx';
import { useState } from 'react';
import CollapseSidebarContent from './CollapseSidebarContent';
import ExpandedSidebarContent from './ExpandedSidebarContent';
import { useSidebar } from '@/store/ui.store';

export default function Sidebar({ className = '' }: { className?: string }) {
  const [isShowIcon, setIsShowIcon] = useState(false);
  const { isExpanded } = useSidebar();

  return (
    <aside
      className={clsx(
        'relative h-[calc(100vh-var(--now-playing-bar-height)-var(--top-bar-height))] rounded-[10px] bg-[#121212] transition-all duration-300 ease-in-out overflow-hidden',
        className,
        isExpanded ? 'col-span-3' : 'col-span-1'
      )}
      onMouseEnter={() => setIsShowIcon(true)}
      onMouseLeave={() => setIsShowIcon(false)}
    >
      <div
        className={clsx(
          'h-full transition-all duration-250 flex',
          isExpanded
            ? 'transform translate-x-0 opacity-100 visible'
            : 'transform -translate-x-full opacity-0 invisible'
        )}
      >
        <div className="w-full flex-shrink-0">
          <ExpandedSidebarContent isShowIcon={isShowIcon} />
        </div>
      </div>

      <div
        className={clsx(
          'absolute inset-0 transition-all duration-250',
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
