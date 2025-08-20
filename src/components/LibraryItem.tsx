import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { CircleMinus, Lock, Pencil, Play, Volume2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Playlist as PlaylistType } from '@/types/playlist.type';
import { useTrack } from '@/store/track.store';
import { useCurrentContext } from '@/store/playback.store';
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

type ItemType = PlaylistType;

export default function LibraryItem({ playlist }: { playlist: ItemType }) {
  const { openDialog, closeDialog, setDisabled } = useDialogStore();

  const navigate = useNavigate();
  const { playlistId } = useParams();
  const { isPlaying } = useTrack();
  const { contextId } = useCurrentContext();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: playlistServices.deletePlaylist
  });

  const handleDeletePlaylist = () => {
    if (!playlist._id) return;

    setDisabled(true);
    mutate(playlist._id, {
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

  const hasItemPlaying = isPlaying && contextId === playlist._id;
  const isActive = playlistId === playlist._id;

  return (
    <>
      <ContextMenu modal={false}>
        <ContextMenuTrigger>
          <div
            onClick={() => {
              navigate(`/playlists/${playlist._id}`);
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
                <p>Play {playlist.name}</p>
              </TooltipContent>
            </Tooltip>

            {playlist.coverImage ? (
              <Avatar className="w-[48px] h-[48px] rounded-[4px] group-hover/playlist:opacity-60">
                <AvatarImage
                  src={playlist.coverImage}
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
                {playlist.name}
              </h4>
              <span className="text-[#929092] text-sm capitalize">
                Playlist . {playlist.user.username}
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
                    This will delete <strong>{playlist.name}</strong> from Your
                    Library.
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
                onAction: () => {}
              });
            }}
          >
            <Pencil />
            Edit details
          </ContextMenuItem>
          <ContextMenuItem>
            <Lock />
            Make private
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
