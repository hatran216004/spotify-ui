import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
