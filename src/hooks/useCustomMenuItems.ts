import { MenuItem } from '@/types/utils.type';

function useCustomMenuItems() {
  const createMenuItem = (menuItem: MenuItem) => menuItem;

  return { createMenuItem };
}

export default useCustomMenuItems;
