import PlaylistMenu from '@/components/menu/PlaylistMenu';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';

export default function AlbumActions({
  albumName,
  albumId,
  hasTrackPlaying,
  handleStartPlay
}: {
  albumName: string;
  albumId: string;
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
        <PlaylistMenu
          albumId={albumId}
          tooltipText={albumName}
          trackId={null}
          hiddenItems={[
            'remove-playlist',
            'remove-liked',
            'follow-playlist',
            'unfollow-playlist',
            'add-playlist',
            'add-queue',
            'add-liked'
          ]}
        />
      </div>
    </div>
  );
}
