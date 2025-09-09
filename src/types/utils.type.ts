/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideProps } from 'lucide-react';
import { SuccessResponseApi } from './response.type';

export type SocialKey = 'facebook' | 'instagram' | 'youtube';

export type ViewMode = 'compact' | 'list';

export type MenuOpts = { name: string; children?: MenuOpts }[];

export type DragState = {
  isDragging: boolean;
  draggedTrackId: string | null;
  draggedIndex: number | null;
  startY: number;
  currentY: number;
  currentX: number;
  offset: { x: number; y: number };
};

export type FileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];
};

export type QueryData<T> = {
  data: SuccessResponseApi<T>;
};

export type MenuItemIds =
  | 'add-to-liked'
  | 'add-to-queue'
  | 'add-to-playlist'
  | 'remove-from-liked'
  | 'remove-from-queue'
  | 'remove-from-playlist';

export type MenuItem = {
  label: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
  show?: boolean;
  className?: string;
  variant?: 'default' | 'destructive';
  separator?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
};

export type MenuPreset =
  | 'full'
  | 'playlist'
  | 'liked'
  | 'search'
  | 'album'
  | 'queue'
  | 'artist';

export type MenuItemContextType =
  | 'playlist'
  | 'liked_tracks'
  | 'album'
  | 'search'
  | 'artist'
  | 'queue';

export type MenuItemContextChildrens = {
  targetItem: MenuItemIds;
  data: any;
}[];

export type MenuItemContext = {
  playlistId?: string | null;
  albumId?: string | null;
  queueId?: string | null;
  childrens?: MenuItemContextChildrens | [];
};

/*
  1. isDragging: có đang kéo không
  2. draggedTrackId: id track đang kéo
  3. draggedIndex: vị trí ban đầu của track
  4. startY: tọa độ chuột khi bắt đầu kéo
  5. currentY: tọa độ chuột hiện tại khi kéo
  6. offset: khoảng cách từ chuột đến góc trái trên của item
*/
