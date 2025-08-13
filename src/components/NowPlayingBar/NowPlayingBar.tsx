import PlaybackControls from './PlaybackControls';
import PlayerActions from './PlayerActions';
import ProgressBar from './ProgressBar';
import TrackInfo from './TrackInfo';

export default function NowPlayingBar() {
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
