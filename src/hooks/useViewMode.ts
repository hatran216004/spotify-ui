import { ViewMode } from '@/types/utils.type';
import { useState } from 'react';

function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const value = localStorage.getItem('playlist_view_mode') as ViewMode;
    return value ? value : 'list';
  });

  const handleChangeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('playlist_view_mode', mode);
  };

  return {
    viewMode,
    isViewList: viewMode === 'list',
    isViewCompact: viewMode === 'compact',
    handleChangeViewMode
  };
}

export default useViewMode;
