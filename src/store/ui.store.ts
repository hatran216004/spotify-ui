import { User } from '@/types/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  isLogin: boolean;
  token: string | null;

  setUser: (user: User | null, token?: string | null) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      token: null,
      setUser: (user, token = null) =>
        set(() => ({ user, isLogin: !!user, token }))
    }),
    {
      name: 'user-store',
      partialize: ({ user, isLogin }) => ({ user, isLogin })
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
      isExpanded: true,
      isSidebarRightExpanded: true,

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
