/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDefaultMenuItems, presetConfigurations } from '@/config/menu';
import useRemoveTrackFromPlaylist from './useRemoveTrackFromPlaylist';
import useAddTrackToLiked from './useAddTrackToLiked';
import useRemoveTrackFromLiked from './useRemoveTrackFromLiked';
import { MenuItem, MenuItemIds, MenuPreset } from '@/types/utils.type';

type MenuOptions = {
  trackId?: string;
  context?: any;
  preset: MenuPreset;
};

function useMenu({ context, trackId, preset }: MenuOptions) {
  const { handleRemoveFromPlaylist, isPending: removingFromPlaylist } =
    useRemoveTrackFromPlaylist();
  const { handleAddTrackToLiked, isPending: addingLike } = useAddTrackToLiked();
  const { handleRemoveTrackFromLiked, isPending: removingLike } =
    useRemoveTrackFromLiked();

  const hooks = {
    removingFromPlaylist,
    addingLike,
    removingLike,
    handleAddTrackToLiked,
    handleRemoveFromPlaylist,
    handleRemoveTrackFromLiked
  };

  const defaultItems = getDefaultMenuItems(trackId as string, context, hooks);
  const presetItemIds = presetConfigurations[preset];
  const filteredDefaultItems = Object.keys(defaultItems)
    .map((key) => {
      if (presetItemIds.includes(key)) return defaultItems[key as MenuItemIds];
      return null;
    })
    .filter(Boolean);

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    item.onClick?.();
  };

  return { filteredDefaultItems, handleItemClick };
}

export default useMenu;
