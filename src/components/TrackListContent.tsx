import { PlaylistItem } from '@/types/playlist.type';
import TrackItem from './TrackItem';
import { useEffect, useRef } from 'react';
import useReorderTracks from '@/hooks/useReorderTracks';
import { useMutation } from '@tanstack/react-query';
import { playlistServices } from '@/services/playlist';

export type ParamsStartDragType = {
  e: React.MouseEvent<HTMLLIElement, MouseEvent>;
  trackId: string;
  trackIndex: number;
};

export type Tracks = PlaylistItem[];

export default function TrackListContent({
  playlistTracks,
  playlistId
}: {
  playlistTracks: Tracks;
  playlistId: string;
}) {
  const { mutate: reorder, isPending } = useMutation({
    mutationFn: playlistServices.reorderPlaylist
  });

  const containerRef = useRef<HTMLUListElement | null>(null);
  const {
    fromIndex,
    toIndex,
    tracks,
    dragState,
    dropIndicatorIndex,
    reorderTrackId,
    handleMouseDown,
    setFromIndex,
    setToIndex,
    setReorderTrackId
  } = useReorderTracks({
    playlistTracks,
    containerRef
  });

  useEffect(() => {
    if (fromIndex === null || toIndex === null || reorderTrackId === null)
      return;

    function handleReorderPlaylist() {
      reorder(
        {
          id: playlistId,
          body: {
            fromIndex: fromIndex!,
            songId: reorderTrackId!,
            toIndex: toIndex!
          }
        },
        {
          onError: (error) => console.log(error),
          onSettled: () => {
            setFromIndex(null);
            setToIndex(null);
            setReorderTrackId(null);
          }
        }
      );
    }
    handleReorderPlaylist();
  }, [
    playlistId,
    fromIndex,
    toIndex,
    reorderTrackId,
    reorder,
    setFromIndex,
    setToIndex,
    setReorderTrackId
  ]);

  const getDragGhostStyle = () => {
    if (!dragState.isDragging || !containerRef.current) return {};

    // const containerRect = containerRef.current.getBoundingClientRect();

    return {
      position: 'fixed' as const,
      left: `${dragState.currentX}px`,
      top: `${dragState.currentY - dragState.offset.y}px`,
      zIndex: 1000,
      pointerEvents: 'none' as const,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
    };
  };

  return (
    <ul className="py-2 relative" ref={containerRef}>
      {/* Drag Ghost */}
      {dragState.isDragging && dragState.draggedTrackId && (
        <div
          style={getDragGhostStyle()}
          className="bg-[#2b2b2b] rounded-sm border outline-gray-600"
        >
          {(() => {
            const track = tracks?.find(
              (entry) => entry.songId._id === dragState.draggedTrackId
            );

            if (!track) return null;

            return (
              <div className="p-1 flex items-center gap-2 text-sm text-nowrap">
                <h3>{track.songId.title}</h3>
                <h3>{track.songId.artists![0].name}</h3>
              </div>
            );
          })()}
        </div>
      )}
      {tracks?.map((track, index) => {
        return (
          <div key={track._id}>
            {dropIndicatorIndex === index && (
              <div className="h-0.5 bg-green-500 rounded-full mx-4 transition-all duration-200" />
            )}

            <TrackItem
              track={track}
              order={index}
              onMouseDown={isPending ? () => {} : handleMouseDown}
            />
          </div>
        );
      })}
      {/* Final drop indicator */}
      {dropIndicatorIndex === tracks.length && (
        <div className="h-0.5 bg-green-500 rounded-full mx-4 transition-all duration-200" />
      )}
    </ul>
  );
}
