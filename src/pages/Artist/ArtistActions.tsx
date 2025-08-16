import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useFollowArtist from '@/hooks/useFollowArtist';
import useUnfollowArtist from '@/hooks/useUnfollowArtist';

export default function ArtistActions({
  isFollowed,
  hasTrackPlaying,
  handleStartPlay
}: {
  hasTrackPlaying: boolean;
  isFollowed: boolean;
  handleStartPlay: () => void;
}) {
  const { artistId } = useParams();
  const { isSignedIn } = useAuth();
  const [isFollowedState, setIsFollowedState] = useState(isFollowed);

  const { follow, isFollowing } = useFollowArtist();
  const { unfollow, isUnfollowing } = useUnfollowArtist();

  const handleFollowArtist = () => {
    if (!isSignedIn) {
      return toast('You need to login to follow this artist', {
        icon: '😉'
      });
    }

    if (!artistId) return;

    if (isFollowedState) {
      unfollow(artistId, {
        onSuccess: () => {
          setIsFollowedState(false);
        },
        onError: (error) => {
          console.log(error);
        }
      });
    } else {
      follow(artistId, {
        onSuccess: () => {
          setIsFollowedState(true);
        },
        onError: (error) => {
          console.log(error);
        }
      });
    }
  };

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
      <Button
        disabled={isFollowing || isUnfollowing}
        variant="outline"
        className="rounded-full"
        onClick={handleFollowArtist}
      >
        {isFollowedState ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
}
