import { User } from '@/types/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user }))
    }),
    {
      name: 'user-store'
    }
  )
);

type SidebarStore = {
  isExpanded: boolean;
  onExpanded: () => void;
};

export const useSidebar = create<SidebarStore>()(
  persist(
    (set) => ({
      isExpanded: false,
      onExpanded: () => set((state) => ({ isExpanded: !state.isExpanded }))
    }),
    {
      name: 'sidebar-expanded'
    }
  )
);
