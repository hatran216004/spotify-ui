import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import clsx from 'clsx';
import { useSidebar, useUserStore } from '@/store/ui.store';
import NowPlayingBar from '@/components/NowPlayingBar';
import Sidebar from './Sidebar/Sidebar';
import PublicFooter from './PublicFooter';
import RightSidebar from './Sidebar/RightSidebar';

export default function MainLayout() {
  const { isExpanded, isSidebarRightExpanded } = useSidebar();
  const { isLogin } = useUserStore();

  return (
    <main>
      <Topbar />
      <div className="px-2">
        <div className="grid grid-cols-12 gap-2 h-full max-h-full">
          <Sidebar />
          <div
            className={clsx(
              'h-[calc(100vh-var(--now-playing-bar-height)-var(--top-bar-height))] rounded-[10px] bg-[#121212] transition-all duration-250',
              {
                'col-span-6': isExpanded && isSidebarRightExpanded,
                'col-span-9': isExpanded && !isSidebarRightExpanded,
                'col-span-8': !isExpanded && isSidebarRightExpanded,
                'col-span-11': !isExpanded && !isSidebarRightExpanded
              }
            )}
          >
            <Outlet />
          </div>
          <div
            className={clsx(
              'col-span-3 bg-[#121212] rounded-[10px] transition-all duration-250',
              isSidebarRightExpanded ? 'block' : 'hidden'
            )}
          >
            <RightSidebar />
          </div>
        </div>
      </div>
      {isLogin ? <NowPlayingBar /> : <PublicFooter />}
    </main>
  );
}
