import MenuItem from '@/components/MenuItem';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import useAdmin from '@/hooks/useAdmin';
import { useUserStore } from '@/store/ui.store';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Bell, LayoutDashboard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTrack } from '@/store/track.store';

export default function TopBarUser() {
  const naviage = useNavigate();

  const { isAdmin } = useAdmin();
  const { signOut } = useAuth();
  const { user } = useUser();
  const { user: userStore, setUser } = useUserStore();

  const { setCurrentTrack } = useTrack();

  async function handleSignOut() {
    try {
      await signOut();
      setUser(null);
      naviage('/');
      setCurrentTrack(null);
      toast.success('Logout successfully');
    } catch (error: unknown) {
      if (error) {
        toast.error('Logout error. Please try again later 😟');
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-2">
        {isAdmin && (
          <Popover>
            <PopoverTrigger>
              <div
                // to="/admin"
                className="flex items-center gap-2 p-2 cursor-pointer rounded-md bg-[#1f1f1f] hover:opacity-90"
              >
                <LayoutDashboard size={18} color="#b3b3b3" />
                <span className="text-sm">Dashboard</span>
              </div>
            </PopoverTrigger>

            <PopoverContent className="bg-blue-50 border border-blue-300 shadow-md rounded-xl p-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500 animate-spin shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span className="text-blue-600 font-medium text-center">
                  Function is under development...
                </span>
              </div>
            </PopoverContent>
          </Popover>
        )}

        <Tooltip>
          <TooltipTrigger className="p-2 cursor-pointer">
            <Bell size={18} color="#b3b3b3" />
          </TooltipTrigger>
          <TooltipContent>
            <p>What's new</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-[#1f1f1f] cursor-pointer flex hover:opacity-80 duration-200 transition-transform">
                <img
                  className="w-8 h-8 rounded-full object-cover m-auto"
                  src={
                    userStore?.avatarUrl ? userStore.avatarUrl : user?.imageUrl
                  }
                  alt={userStore?.username ?? 'Avatar'}
                />
              </button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ha Tran</p>
          </TooltipContent>
        </Tooltip>

        <PopoverContent align="end">
          <MenuItem>Account</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem hasSeparate onClick={handleSignOut}>
            Log out <LogOut size={18} />
          </MenuItem>
        </PopoverContent>
      </Popover>
    </div>
  );
}
