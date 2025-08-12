import React, {
  useState,
  useRef,
  MouseEvent,
  useEffect,
  useCallback
} from 'react';
import { Music, Play, Pause, MoreHorizontal, GripVertical } from 'lucide-react';

/*
    isDragging: có đang kéo không
    draggedTrackId: id track đang kéo
    draggedIndex: vị trí ban đầu của track
    startY: tọa độ chuột khi bắt đầu kéo
    currentY: tọa độ chuột hiện tại khi kéo
    offset: khoảng cách từ chuột đến góc trái trên của item
    dropIndicatorIndex: vị trí hiển thị vạch xanh thả.
    containerRef: tham chiếu tới danh sách chứa các track.
    trackRefs: lưu ref từng track để lấy vị trí khi cần.
*/

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumArt?: string;
}

interface DragState {
  isDragging: boolean;
  draggedTrackId: string | null;
  draggedIndex: number | null;
  startY: number;
  currentY: number;
  offset: { x: number; y: number };
}

const SpotifyPlaylist: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20'
    },
    {
      id: '2',
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      album: 'Fine Line',
      duration: '2:54'
    },
    {
      id: '3',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: '3:23'
    },
    {
      id: '4',
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      duration: '2:58'
    },
    {
      id: '5',
      title: 'Stay',
      artist: 'The Kid LAROI, Justin Bieber',
      album: 'F*CK LOVE 3',
      duration: '2:21'
    },
    {
      id: '6',
      title: 'Heat Waves',
      artist: 'Glass Animals',
      album: 'Dreamland',
      duration: '3:58'
    }
  ]);

  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedTrackId: null,
    draggedIndex: null,
    startY: 0,
    currentY: 0,
    offset: { x: 0, y: 0 }
  });
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Calculate drop position based on mouse Y coordinate
  const getDropIndex = useCallback((clientY: number): number => {
    if (!containerRef.current) return -1;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const relativeY = clientY - containerRect.top;

    // Find the track elements
    const trackElements = Array.from(
      container.querySelectorAll('[data-track-row]')
    ) as HTMLElement[];

    for (let i = 0; i < trackElements.length; i++) {
      const element = trackElements[i];
      const rect = element.getBoundingClientRect();
      const elementRelativeY = rect.top - containerRect.top;
      const elementMiddle = elementRelativeY + rect.height / 2;

      if (relativeY < elementMiddle) {
        return i;
      }
    }

    return trackElements.length;
  }, []);

  // Handle mouse down on drag handle
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, trackId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const trackIndex = tracks.findIndex((track) => track.id === trackId);
    if (trackIndex === -1) return;

    const rect = e.currentTarget
      .closest('[data-track-row]')
      ?.getBoundingClientRect();
    if (!rect) return;

    setDragState({
      isDragging: true,
      draggedTrackId: trackId,
      draggedIndex: trackIndex,
      startY: e.clientY,
      currentY: e.clientY,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });

    // Add global mouse event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Prevent text selection
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  };

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      setDragState((prev) => {
        if (!prev.isDragging) return prev;

        const dropIndex = getDropIndex(e.clientY);
        setDropIndicatorIndex(dropIndex);

        return {
          ...prev,
          currentY: e.clientY
        };
      });
    },
    [getDropIndex]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      setDragState((prev) => {
        if (
          !prev.isDragging ||
          prev.draggedTrackId === null ||
          prev.draggedIndex === null
        ) {
          return { ...prev, isDragging: false };
        }

        const dropIndex = getDropIndex(e.clientY);

        // Only reorder if dropping at a different position
        if (
          dropIndex !== prev.draggedIndex &&
          dropIndex !== prev.draggedIndex + 1
        ) {
          const newTracks = [...tracks];
          const draggedTrack = newTracks[prev.draggedIndex];

          // Remove the dragged track
          newTracks.splice(prev.draggedIndex, 1);

          // Calculate the correct insertion index
          const insertIndex =
            dropIndex > prev.draggedIndex ? dropIndex - 1 : dropIndex;

          // Insert at new position
          newTracks.splice(insertIndex, 0, draggedTrack);

          setTracks(newTracks);
        }

        return {
          isDragging: false,
          draggedTrackId: null,
          draggedIndex: null,
          startY: 0,
          currentY: 0,
          offset: { x: 0, y: 0 }
        };
      });

      setDropIndicatorIndex(null);

      // Remove global event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Restore normal cursor and text selection
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    },
    [getDropIndex, handleMouseMove, tracks]
  );

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [handleMouseMove, handleMouseUp]);

  const togglePlay = (trackId: string) => {
    setCurrentPlaying(currentPlaying === trackId ? null : trackId);
  };

  const formatTrackNumber = (index: number) => {
    return (index + 1).toString().padStart(2, '0');
  };

  // Calculate drag ghost position
  const getDragGhostStyle = () => {
    if (!dragState.isDragging || !containerRef.current) return {};

    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      position: 'fixed' as const,
      left: `${dragState.currentY - dragState.startY + containerRect.left}px`,
      top: `${dragState.currentY - dragState.offset.y}px`,
      width: `${containerRect.width - 32}px`, // Subtract padding
      zIndex: 1000,
      pointerEvents: 'none' as const,
      transform: 'rotate(2deg)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
    };
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Playlist Header */}
        <div className="mb-8">
          <div className="flex items-end space-x-6 mb-6">
            <div className="w-60 h-60 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center">
              <Music size={80} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Playlist</p>
              <h1 className="text-6xl font-bold mb-4">My Awesome Playlist</h1>
              <p className="text-gray-300 text-sm mb-2">
                Made by You • {tracks.length} songs
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-4 rounded-full transition-colors">
              <Play size={24} fill="currentColor" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal size={32} />
            </button>
          </div>
        </div>

        {/* Track List Header */}
        <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 font-medium border-b border-gray-700 pb-2 mb-2 px-4">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-6">TITLE</div>
          <div className="col-span-3">ALBUM</div>
          <div className="col-span-2 text-right">⏱</div>
        </div>

        {/* Track List Container */}
        <div ref={containerRef} className="space-y-1 relative">
          {tracks.map((track, index) => (
            <React.Fragment key={track.id}>
              {/* Drop indicator */}
              {dropIndicatorIndex === index && (
                <div className="h-0.5 bg-green-500 rounded-full mx-4 transition-all duration-200" />
              )}

              <div
                ref={(el) => {
                  trackRefs.current[track.id] = el;
                }}
                data-track-row
                data-track-id={track.id}
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                className={`
                  grid grid-cols-12 gap-4 items-center p-2 rounded-md group cursor-pointer transition-all duration-200 relative
                  ${dragState.draggedTrackId === track.id ? 'opacity-30' : ''}
                  ${
                    hoveredTrack === track.id
                      ? 'bg-gray-800'
                      : 'hover:bg-gray-800'
                  }
                  ${currentPlaying === track.id ? 'bg-gray-800' : ''}
                `}
              >
                {/* Track Number / Play Button */}
                <div className="col-span-1 flex items-center justify-center text-gray-400">
                  {hoveredTrack === track.id || currentPlaying === track.id ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(track.id);
                      }}
                      className="text-white hover:scale-105 transition-transform"
                    >
                      {currentPlaying === track.id ? (
                        <Pause size={16} fill="currentColor" />
                      ) : (
                        <Play size={16} fill="currentColor" />
                      )}
                    </button>
                  ) : (
                    <span className="text-sm">{formatTrackNumber(index)}</span>
                  )}
                </div>

                {/* Title and Artist */}
                <div className="col-span-6 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                    <Music size={16} className="text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-medium truncate ${
                        currentPlaying === track.id
                          ? 'text-green-500'
                          : 'text-white'
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Album */}
                <div className="col-span-3">
                  <p className="text-sm text-gray-400 truncate">
                    {track.album}
                  </p>
                </div>

                {/* Duration and Actions */}
                <div className="col-span-2 flex items-center justify-end space-x-2">
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                    <MoreHorizontal size={16} />
                  </button>
                  <span className="text-sm text-gray-400">
                    {track.duration}
                  </span>
                  <div
                    className="opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity p-1"
                    onMouseDown={(e) => handleMouseDown(e, track.id)}
                  >
                    <GripVertical size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Final drop indicator */}
          {dropIndicatorIndex === tracks.length && (
            <div className="h-0.5 bg-green-500 rounded-full mx-4 transition-all duration-200" />
          )}
        </div>

        {/* Drag Ghost */}
        {dragState.isDragging && dragState.draggedTrackId && (
          <div
            style={getDragGhostStyle()}
            className="bg-gray-800 rounded-md border border-gray-600"
          >
            {(() => {
              const track = tracks.find(
                (t) => t.id === dragState.draggedTrackId
              );
              if (!track) return null;

              return (
                <div className="grid grid-cols-12 gap-4 items-center p-2">
                  <div className="col-span-1 flex items-center justify-center text-gray-400">
                    <span className="text-sm">
                      {formatTrackNumber(dragState.draggedIndex!)}
                    </span>
                  </div>
                  <div className="col-span-6 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                      <Music size={16} className="text-gray-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate text-white">
                        {track.title}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-gray-400 truncate">
                      {track.album}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center justify-end space-x-2">
                    <span className="text-sm text-gray-400">
                      {track.duration}
                    </span>
                    <GripVertical size={16} className="text-gray-400" />
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Cách sử dụng (Mouse Events):
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              • Hover vào track và click + drag vào icon grip (⋮⋮) để kéo track
            </li>
            <li>
              • Trong khi kéo, bạn sẽ thấy ghost element và drop indicator (vạch
              xanh)
            </li>
            <li>• Thả chuột để drop track vào vị trí mới</li>
            <li>• Click vào số thứ tự hoặc nút play để phát nhạc</li>
            <li>
              • Chỉ sử dụng mouse events, không dùng HTML5 Drag & Drop API
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaylist;
