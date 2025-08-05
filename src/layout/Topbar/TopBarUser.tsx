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
import useAdmin from '@/hooks/ui/useAdmin';
import { useUserStore } from '@/store/ui.store';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Bell, LayoutDashboard, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { PiUsersThreeBold } from 'react-icons/pi';

export default function TopBarUser() {
  const { isAdmin } = useAdmin();
  const { signOut } = useAuth();
  const { user: userStore, setUser } = useUserStore();
  const { user } = useUser();

  async function handleSignOut() {
    try {
      await signOut({ redirectUrl: '/login' });
      setUser(null);
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
          <div className="flex items-center gap-2 p-2 cursor-pointer rounded-md bg-[#1f1f1f] hover:opacity-90">
            <LayoutDashboard size={18} color="#b3b3b3" />
            <span className="text-sm">Dashboard</span>
          </div>
        )}

        <Tooltip>
          <TooltipTrigger className="p-2 cursor-pointer">
            <Bell size={18} color="#b3b3b3" />
          </TooltipTrigger>
          <TooltipContent>
            <p>What's new</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="p-2 cursor-pointer">
            <PiUsersThreeBold size={18} color="#b3b3b3" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Friend activity</p>
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
          <MenuItem onClick={handleSignOut}>
            Log out <LogOut size={18} />
          </MenuItem>
        </PopoverContent>
      </Popover>
    </div>
  );
}
