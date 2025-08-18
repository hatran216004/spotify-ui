import { User } from '@/types/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  isLogin: boolean;

  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      token: null,
      setUser: (user) => set(() => ({ user, isLogin: !!user }))
    }),
    {
      name: 'user-store'
    }
  )
);

type SidebarStore = {
  isExpanded: boolean;
  isSidebarRightExpanded: boolean;
  onExpanded: () => void;
  onExpandedRightSidebar: () => void;
};

export const useSidebar = create<SidebarStore>()(
  persist(
    (set) => ({
      isExpanded: false,
      isSidebarRightExpanded: false,

      onExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
      onExpandedRightSidebar: () =>
        set((state) => ({
          isSidebarRightExpanded: !state.isSidebarRightExpanded
        }))
    }),
    {
      name: 'sidebar-expanded'
    }
  )
);
