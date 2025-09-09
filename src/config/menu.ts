/* eslint-disable @typescript-eslint/no-explicit-any */
import { CirclePlus, ListEnd, Plus, Trash } from 'lucide-react';
import {
  MenuItem,
  MenuPreset,
  MenuItemContext,
  MenuItemIds,
  MenuItemContextChildrens
} from '@/types/utils.type';

const renderChildren = (
  childrens: MenuItemContextChildrens,
  type: MenuItemIds
) => {
  if (childrens) {
    childrens.forEach((children) => {
      if (children.targetItem.includes(type)) {
        return children.data;
      }
    });
  }
  return [];
};

export const getDefaultMenuItems = (
  trackId: string,
  context: MenuItemContext,
  hooks: any
): Record<MenuItemIds, MenuItem> => {
  console.log(context);

  return {
    'add-to-liked': {
      label: 'Save to your Liked Songs',
      icon: CirclePlus,
      disabled: false,
      onClick: () => hooks.handleAddTrackToLiked(trackId)
    },
    'add-to-queue': {
      label: 'Save to your Queue',
      icon: ListEnd,
      disabled: false,
      onClick: () => {
        console.log('Save to your Queue');
      }
    },
    'add-to-playlist': {
      label: 'Add to Playlist',
      icon: Plus,
      disabled: false,
      children: renderChildren(
        context?.childrens as MenuItemContextChildrens,
        'add-to-playlist'
      )
    },
    'remove-from-liked': {
      label: 'Remove from Liked Songs',
      icon: Trash,
      disabled: false,
      onClick: () => hooks.handleRemoveTrackFromLiked(trackId)
    },
    'remove-from-queue': {
      label: 'Remove from queue',
      icon: Trash,
      disabled: false,
      onClick: () => {
        console.log('Remove from queue');
      }
    },
    'remove-from-playlist': {
      label: 'Remove from this playlist',
      icon: Trash,
      disabled: false,
      onClick: () =>
        hooks.handleRemoveFromPlaylist({
          trackId,
          playlistId: context?.playlistId
        })
    }
  };
};

export const presetConfigurations: Record<MenuPreset, string[]> = {
  full: [
    'add-to-liked',
    'add-to-queue',
    'add-to-playlist',
    'remove-from-liked',
    'remove-from-queue',
    'remove-from-playlist'
  ],
  playlist: [
    'add-to-liked',
    'add-to-queue',
    'add-to-playlist',
    'remove-from-playlist'
  ],
  album: ['add-to-liked', 'add-to-queue', 'add-to-playlist'],
  liked: ['add-to-queue', 'add-to-playlist', 'remove-from-liked'],
  queue: ['add-to-liked', 'add-to-playlist', 'remove-from-queue'],
  search: ['add-to-liked', 'add-to-queue', 'add-to-playlist'],
  artist: ['add-to-liked', 'add-to-queue', 'add-to-playlist']
};
