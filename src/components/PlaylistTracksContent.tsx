import { PlaylistTrack } from '@/types/playlist.type';
import PlaylistTrackItem from './PlaylistTrackItem';
import { useEffect, useRef } from 'react';
import useReorderTracks from '@/hooks/useReorderTracks';
import { useMutation } from '@tanstack/react-query';
import { playlistServices } from '@/services/playlist';

export type ParamsStartDragType = {
  e: React.MouseEvent<HTMLLIElement, MouseEvent>;
  trackId: string;
  trackIndex: number;
};

export default function PlaylistTracksContent({
  playlistTracks,
  playlistId
}: {
  playlistTracks: PlaylistTrack[];
  playlistId: string;
}) {
  const { mutate: reorder, isPending } = useMutation({
    mutationFn: playlistServices.reorderPlaylist
  });

  const containerRef = useRef<HTMLUListElement | null>(null);
  const {
    fromIndex,
    toIndex,
    reorderTrackId,
    playlistTracks: playlistTracksState,
    dragState,
    dropIndicatorIndex,
    handleMouseDown,
    setFromIndex,
    setToIndex,
    setReorderTrackId
  } = useReorderTracks({
    data: playlistTracks,
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
            trackId: reorderTrackId!,
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
            const findEntry = playlistTracksState.find(
              (entry) => entry.track._id === dragState.draggedTrackId
            );

            if (!findEntry) return null;

            return (
              <div className="p-1 flex items-center gap-2 text-sm text-nowrap">
                <h3>{findEntry.track.title}</h3> •
                <h3>{findEntry.track.artists![0].name}</h3>
              </div>
            );
          })()}
        </div>
      )}
      {playlistTracksState?.map((ele, index) => {
        return (
          <div key={ele.track._id}>
            {dropIndicatorIndex === index && (
              <div className="h-0.5 bg-green-500 rounded-full mx-4 transition-all duration-200" />
            )}

            <PlaylistTrackItem
              track={ele.track}
              order={index}
              onMouseDown={isPending ? () => {} : handleMouseDown}
            />
          </div>
        );
      })}
      {/* Final drop indicator */}
      {dropIndicatorIndex === playlistTracksState.length && (
        <div className="h-0.5 bg-green-500 rounded-full mx-4 transition-all duration-200" />
      )}
    </ul>
  );
}
