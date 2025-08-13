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

/*
  1. isDragging: có đang kéo không
  2. draggedTrackId: id track đang kéo
  3. draggedIndex: vị trí ban đầu của track
  4. startY: tọa độ chuột khi bắt đầu kéo
  5. currentY: tọa độ chuột hiện tại khi kéo
  6. offset: khoảng cách từ chuột đến góc trái trên của item
*/
