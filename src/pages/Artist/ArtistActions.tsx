import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';

export default function ArtistActions({
  hasTrackPlaying,
  handleStartPlay
}: {
  hasTrackPlaying: boolean;
  handleStartPlay: () => void;
}) {
  return (
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
    </div>
  );
}
