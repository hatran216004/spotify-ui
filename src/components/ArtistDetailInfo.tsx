import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle
} from '@/components/ui/dialog';
import { SocialKey } from '@/types/utils.type';
import { useTrack } from '@/store/track.store';
import { Link } from 'react-router-dom';
import useArtistFollows from '@/hooks/useArtistFollows';
import useFollowArtist from '@/hooks/useFollowArtist';
import useUnfollowArtist from '@/hooks/useUnfollowArtist';
import { useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store/ui.store';

export default function ArtistDetailInfo() {
  const { currentTrack } = useTrack();
  const mainArtist = currentTrack?.artists?.[0];
  const queryClient = useQueryClient();
  const userId = useUserStore().user?._id;

  const { artistFollows } = useArtistFollows();
  const { follow, isFollowing } = useFollowArtist();
  const { unfollow, isUnfollowing } = useUnfollowArtist();

  const isFollowed = artistFollows?.some(
    (artist) => artist._id === mainArtist?._id
  );

  const handleFollow = () => {
    const artistId = mainArtist?._id;
    if (!artistId) return;

    if (isFollowed) {
      unfollow(artistId, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['artists-followed', userId]
          });
        }
      });
    } else {
      follow(artistId, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['artists-followed', userId]
          });
        }
      });
    }
  };

  return (
    <Dialog>
      <DialogClose asChild>close</DialogClose>
      <DialogTrigger asChild>
        <div className="cursor-pointer pb-4 relative rounded-[10px] overflow-hidden bg-[#1f1f1f]">
          <span className="absolute top-2.5 left-2.5 font-bold text-lg text-white z-1 text-shadow-lg/30">
            About the artist
          </span>
          <div className="pt-[70%] relative">
            <img
              src={mainArtist?.avatarUrl}
              alt={mainArtist?.name}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="space-y-2 px-3 pt-2">
            <div className="flex items-center justify-between">
              <Link
                to={`/artists/${mainArtist?._id}`}
                className="hover:underline text-white font-semibold text-lg"
              >
                {mainArtist?.name}
              </Link>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollow();
                }}
                disabled={isFollowing || isUnfollowing}
              >
                {isFollowed ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
            <p className="text-sm text-[#b3b3b3] line-clamp-3 font-semibold">
              {mainArtist?.bio}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#121212] min-w-3xl max-h-[540px] overflow-auto">
        <DialogTitle className="sr-only" />
        <div className="space-y-6">
          <div className="relative pt-[56.25%]">
            <img
              src={mainArtist?.avatarUrl}
              alt={mainArtist?.name}
              className="absolute w-full h-full object-cover top-0 left-0"
            />
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-4 space-y-2">
              <div className="space-y-3">
                <div className="font-semibold text-white text-4xl">
                  7,052,959
                </div>
                <span className="text-[#b3b3b3] text-sm">Followers</span>
              </div>
              <ul className="space-y-3">
                {Object.keys(mainArtist!.socialLinks).map((social) => {
                  const key = social as SocialKey;
                  if (!key) return null;

                  let Icon = null;
                  if (key === 'facebook') {
                    Icon = FaFacebook;
                  } else if (key === 'instagram') {
                    Icon = FaInstagram;
                  } else {
                    Icon = FaYoutube;
                  }

                  return (
                    <li key={key}>
                      <Link
                        target="_blank"
                        to={mainArtist!.socialLinks[key] ?? '#'}
                        className="flex items-center"
                      >
                        <Icon size={24} />
                        <span className="ml-2 font-semibold text-sm capitalize">
                          {key}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-span-8">
              <p className="text-[#b3b3b3] font-semibold text-[1rem]">
                {mainArtist?.bio}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
