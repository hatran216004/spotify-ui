import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import TopBarGuest from './TopBarGuest';
import TopBarUser from './TopBarUser';
import { useUserStore } from '@/store/ui.store';

export default function Topbar() {
  const location = useLocation();
  const { user } = useUserStore();

  return (
    <header>
      <div className="flex items-center p-2 bg-black justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="group size-12 rounded-full flex items-center justify-center bg-[#1f1f1f] cursor-pointer hover:scale-[1.05] transition-transform duration-250"
          >
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill={clsx(location.pathname === '/' && '#fff')}
              className={
                'stroke-[#929092] group-hover:stroke-white transition-colors duration-200'
              }
            >
              <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z"></path>
            </svg>
          </Link>
          <SearchBar />
        </div>
        {user?.clerkId ? <TopBarUser /> : <TopBarGuest />}
      </div>
    </header>
  );
}
