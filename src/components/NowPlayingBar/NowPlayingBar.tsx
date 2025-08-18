import { useTrack } from '@/store/track.store';
import PlaybackControls from './PlaybackControls';
import PlayerActions from './PlayerActions';
import ProgressBar from './ProgressBar';
import TrackInfo from './TrackInfo';

export default function NowPlayingBar() {
  const { currentTrack } = useTrack();

  if (!currentTrack)
    return (
      <div className="flex items-center justify-center h-20 bg-black text-white">
        <p className="text-sm opacity-70">
          Select a song to start listening 🎵
        </p>
      </div>
    );

  return (
    <div className="h-[var(--now-playing-bar-height)] p-2 bg-black fixed z-1 bottom-0 left-0 right-0">
      <div className="flex items-center h-full">
        <div className="w-[30%]">
          <TrackInfo />
        </div>
        <div className="space-y-2 w-[40%] max-w-full">
          <PlaybackControls />
          <div className="flex items-center gap-2 cursor-pointer w-full text-center">
            <ProgressBar />
          </div>
        </div>
        <div className="w-[30%]">
          <PlayerActions />
        </div>
      </div>
    </div>
  );
}
