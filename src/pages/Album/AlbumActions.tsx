import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Ellipsis } from 'lucide-react';

export default function AlbumActions({
  albumName,
  hasTrackPlaying,
  handleStartPlay
}: {
  albumName: string;
  hasTrackPlaying: boolean;
  handleStartPlay: () => void;
}) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <TogglePlayBackAudio
          isPlaying={hasTrackPlaying}
          onPlayAudio={handleStartPlay}
          hasTooltip={false}
          variant="primary"
          size="lg"
          iconClassname="size-6"
          className="hover:opacity-100 hover:scale-[1.02]"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="group p-1 cursor-pointer">
              <Ellipsis
                size={32}
                className="text-[#929092] group-hover:text-white group-hover:scale-[1.05]"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>More options for {albumName}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
