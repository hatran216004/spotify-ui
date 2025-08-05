import PlaybackControls from './PlaybackControls';
import PlayerActions from './PlayerActions ';
import ProgressBar from './ProgressBar';
import TrackInfo from './TrackInfo';

export default function NowPlayingBar() {
  return (
    <div className="h-[var(--now-playing-bar-height)] p-2 bg-black absolute z-1 bottom-0 left-0 right-0">
      <div className="grid grid-cols-12 items-center h-full">
        <div className="col-span-3">
          <TrackInfo />
        </div>
        <div className="col-span-6">
          <div className="flex flex-col items-center space-y-2">
            <PlaybackControls />
            <ProgressBar />
          </div>
        </div>
        <div className="col-span-3">
          <PlayerActions />
        </div>
      </div>
    </div>
  );
}
