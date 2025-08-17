import { PiMusicNotesPlusFill } from 'react-icons/pi';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistServices } from '@/services/playlist';
import toast from 'react-hot-toast';

export default function CreateNewPlaylistButton() {
  const queryClient = useQueryClient();

  const { mutate: createNewPlaylist, isPending } = useMutation({
    mutationFn: playlistServices.createNewPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-playlists']
      });
      toast.success('Added to Your Library');
    },
    onError: () => {
      toast.error('Failed to create new playlist. Please try again later!');
    }
  });

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() => createNewPlaylist()}
        disabled={isPending}
        className="group/create py-2 px-4 ml-auto flex items-center rounded-full gap-2 cursor-pointer bg-[#1f1f1f] hover:bg-[#2a2a2a]"
      >
        <PiMusicNotesPlusFill
          size={22}
          className="group-hover/create:rotate-6 group-hover/create:text-green-500 group-hover/create:scale-[1.03] transition-all"
        />
        <span>Create</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Create a playlist</p>
      </TooltipContent>
    </Tooltip>
  );
}
