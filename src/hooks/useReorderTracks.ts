import { ParamsStartDragType } from '@/components/TrackListContent';
import { initalDragState } from '@/config/init';
import { PlaylistItem } from '@/types/playlist.type';
import { DragState } from '@/types/utils.type';
import { RefObject, useCallback, useEffect, useState } from 'react';

function useReorderTracks({
  playlistTracks,
  containerRef
}: {
  playlistTracks: PlaylistItem[];
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [tracks, setTracks] = useState(playlistTracks);
  const [dragState, setDragState] = useState<DragState>(initalDragState);
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(
    null
  );
  const [fromIndex, setFromIndex] = useState<number | null>(null);
  const [toIndex, setToIndex] = useState<number | null>(null);
  const [reorderTrackId, setReorderTrackId] = useState<string | null>(null);

  const getDropIndex = useCallback(
    (clientY: number) => {
      if (!containerRef.current) return -1;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      // Chuột đang nằm bao nhiêu px từ đỉnh container
      const relativeY = clientY - containerRect.top - 4; // -4 for padding top

      const trackElements = Array.from(
        container.querySelectorAll('[data-track-row]')
      ) as HTMLElement[];

      for (let i = 0; i < trackElements.length; i++) {
        const element = trackElements[i];
        const rect = element!.getBoundingClientRect();
        // Vị trí y element so với container
        const elemntRelativeY = rect!.top - containerRect.top - 4; // -4 for padding top
        const elementMiddle = elemntRelativeY + rect.height / 2;

        if (relativeY < elementMiddle) {
          return i;
        }
      }
      return trackElements.length;
    },
    [containerRef]
  );

  const handleMouseDown = ({ e, trackId, trackIndex }: ParamsStartDragType) => {
    // Ngăn select text và chặn bubbling
    e.preventDefault();
    e.stopPropagation();

    // const rect = e.currentTarget.getBoundingClientRect();
    const rect = e.currentTarget
      .closest('[data-track-row]')
      ?.getBoundingClientRect();

    if (!rect) return;

    setReorderTrackId(trackId);
    setDragState({
      isDragging: true,
      draggedTrackId: trackId,
      draggedIndex: trackIndex,
      currentY: e.clientY,
      currentX: e.clientX,
      startY: e.clientY,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    document.documentElement.style.userSelect = 'none';
    document.documentElement.style.cursor = 'grabbing';
  };

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      setDragState((prev) => {
        if (!prev.isDragging) return prev;

        const dropIndex = getDropIndex(e.clientY);
        setDropIndicatorIndex(dropIndex);
        return { ...prev, currentY: e.clientY, currentX: e.clientX };
      });
    },
    [getDropIndex]
  );

  const handleMouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      setDragState((prev) => {
        if (
          !prev.isDragging ||
          prev.draggedIndex === null ||
          prev.draggedTrackId === null
        )
          return { ...prev, isDragging: false };

        const dropIndex = getDropIndex(e.clientY);

        if (
          dropIndex !== prev.draggedIndex &&
          dropIndex !== prev.draggedIndex + 1
        ) {
          const newTracks = [...tracks!];
          const draggedTrack = newTracks[prev.draggedIndex];

          newTracks.splice(prev.draggedIndex, 1);

          const insertIndex =
            dropIndex > prev.draggedIndex ? dropIndex - 1 : dropIndex;

          newTracks.splice(insertIndex, 0, draggedTrack);
          setTracks(newTracks);
          setFromIndex(prev.draggedIndex);
          setToIndex(insertIndex);
        }

        return {
          isDragging: false,
          draggedTrackId: null,
          draggedIndex: null,
          startY: 0,
          currentY: 0,
          currentX: 0,
          offset: { x: 0, y: 0 }
        };
      });

      setDropIndicatorIndex(null);

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      document.documentElement.style.userSelect = '';
      document.documentElement.style.cursor = '';
    },
    [tracks, handleMouseMove, getDropIndex]
  );

  useEffect(() => {
    setTracks(playlistTracks);
  }, [playlistTracks]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    tracks,
    dragState,
    dropIndicatorIndex,
    fromIndex,
    toIndex,
    reorderTrackId,
    handleMouseUp,
    handleMouseDown,
    setFromIndex,
    setToIndex,
    setReorderTrackId
  };
}

export default useReorderTracks;
