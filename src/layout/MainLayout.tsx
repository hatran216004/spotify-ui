import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import clsx from 'clsx';
import { useSidebar } from '@/store/ui.store';
import ExpandedSidebar from './ExpandedSidebar';
import CollapseSidebar from './CollapseSidebar';
import NowPlayingBar from '@/components/NowPlayingBar';

export default function MainLayout() {
  const { isExpanded } = useSidebar();

  return (
    <>
      <Topbar />
      <div className="px-2">
        <div className="grid grid-cols-12 gap-2 h-full max-h-full">
          {isExpanded ? <ExpandedSidebar /> : <CollapseSidebar />}

          <div
            className={clsx('h-full', isExpanded ? 'col-span-6' : 'col-span-8')}
          >
            <div className="bg-[#121212] h-[calc(100vh-var(--now-playing-bar-height)-var(--top-bar-height))] rounded-[10px]">
              <Outlet />
            </div>
          </div>

          <div className="col-span-3 bg-[#121212] rounded-[10px]">
            Right sidebar
          </div>
        </div>
      </div>
      <NowPlayingBar />
    </>
  );
}
