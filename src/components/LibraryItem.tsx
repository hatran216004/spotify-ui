import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { CircleMinus, Lock, Pencil, Play, Volume2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useTrack } from '@/store/track.store';
import { usePlaybackContext } from '@/store/playback.store';
import PlaylistPlaceholder from './PlaylistPlaceholder';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu';
import { useDialogStore } from '@/store/dialog.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistServices } from '@/services/playlist';
import toast from 'react-hot-toast';
import { PlaylistMetadata } from '@/types/libraryItem.type';
import { useUserStore } from '@/store/ui.store';
import { MdPublic } from 'react-icons/md';

export default function LibraryItem({
  playlistPreview
}: {
  playlistPreview: PlaylistMetadata;
}) {
  const { openDialog, closeDialog, setDisabled } = useDialogStore();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { playlistId } = useParams();

  const { isPlaying } = useTrack();
  const { id } = usePlaybackContext();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: playlistServices.deletePlaylist
  });

  const { mutate: update, isPending } = useMutation({
    mutationFn: playlistServices.visibilityPlaylist
  });

  const handleDeletePlaylist = () => {
    if (!playlistPreview._id) return;

    setDisabled(true);
    mutate(playlistPreview._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['my-playlists']
        });
        toast.success('Removed from Your Library');
      },
      onError: () => {
        toast.error('Failed remove from Your Library');
      },
      onSettled: () => {
        closeDialog();
        setDisabled(false);
      }
    });
  };

  const handleVisibility = () => {
    if (!isOwner || isPending) return;

    const isPublic = playlistPreview.isPublic;

    update(
      {
        id: playlistPreview._id,
        isPublic: !isPublic
      },
      {
        onSuccess: () => {
          toast.success(
            `Playlist has been made ${isPublic ? 'private' : 'public'}`
          );
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: ['my-playlists']
          });
          queryClient.invalidateQueries({
            queryKey: ['playlists-popular']
          });
        }
      }
    );
  };

  const hasItemPlaying = isPlaying && id === playlistPreview._id;
  const isActive = playlistId === playlistPreview._id;

  const isOwner = playlistPreview.user._id === user?._id;

  return (
    <>
      <ContextMenu modal={false}>
        <ContextMenuTrigger>
          <div
            onClick={() => {
              navigate(`/playlists/${playlistPreview._id}`);
            }}
            className={clsx(
              'group/playlist flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2a2a] relative',
              isActive && 'bg-[#333]'
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="absolute left-[22px] z-1 hidden group-hover/playlist:block">
                  <Play className="fill-white text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent sideOffset={20}>
                <p>Play {playlistPreview.name}</p>
              </TooltipContent>
            </Tooltip>

            {playlistPreview.coverImage ? (
              <Avatar className="w-[48px] h-[48px] rounded-[4px] group-hover/playlist:opacity-60">
                <AvatarImage
                  src={playlistPreview.coverImage}
                  className="object-cover"
                />
              </Avatar>
            ) : (
              <PlaylistPlaceholder />
            )}

            <div>
              <h4
                className={clsx(
                  'font-medium',
                  isActive ? 'text-[#1db954]' : 'text-[#eee]'
                )}
              >
                {playlistPreview.name}
              </h4>
              <span className="text-[#929092] text-sm capitalize">
                Playlist . {playlistPreview.user?.username}
              </span>
            </div>

            {hasItemPlaying && (
              <Volume2
                size={18}
                className="absolute right-2.5"
                fill="#1db954"
                stroke="#1db954"
              />
            )}
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => {
              openDialog({
                openName: 'confirm',
                title: 'Delete from Your Library?',
                actionLabel: 'Delete',
                cancelLabel: 'Cancel',
                description: (
                  <>
                    This will delete <strong>{playlistPreview.name}</strong>{' '}
                    from Your Library.
                  </>
                ),
                onAction: handleDeletePlaylist,
                onCancel: closeDialog
              });
            }}
          >
            <CircleMinus />
            Delete
          </ContextMenuItem>

          <ContextMenuItem
            onClick={() => {
              openDialog({
                openName: 'update',
                title: 'Edit details',
                actionLabel: 'Save',
                payload: {
                  name: playlistPreview.name,
                  description: playlistPreview.description,
                  coverImage: playlistPreview.coverImage,
                  id: playlistPreview._id
                }
              });
            }}
          >
            <Pencil />
            Edit details
          </ContextMenuItem>
          {isOwner && (
            <ContextMenuItem onClick={handleVisibility}>
              {playlistPreview.isPublic ? (
                <>
                  <Lock />
                  Make private
                </>
              ) : (
                <>
                  <MdPublic />
                  Make public
                </>
              )}
            </ContextMenuItem>
          )}
          {!isOwner && (
            <ContextMenuItem onClick={() => {}}>
              <Lock />
              Unfollowing
            </ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
