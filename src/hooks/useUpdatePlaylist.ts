/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistServices } from '@/services/playlist';
import { AxiosError } from 'axios';
import { ErrorResponseApi } from '@/types/response.type';
import toast from 'react-hot-toast';
import { QueryData } from '@/types/utils.type';
import { produce } from 'immer';
import { LibraryItemList, LibraryItemPlaylist } from '@/types/libraryItem.type';

function useUpdatePlaylist() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: playlistServices.updatePlaylist,
    onMutate: async (data) => {
      const updatedPlaylistId = data.id;
      const { name } = Object.fromEntries(data.data.entries());
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)

      const queryKey = ['my-playlists'];
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);
      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old: any) =>
        produce(
          old,
          (draft: QueryData<LibraryItemList<LibraryItemPlaylist>>) => {
            const list = draft?.data?.data?.items;
            if (!list) return;

            const idx = list.findIndex(
              (p) => p.playlist_metadata._id === updatedPlaylistId
            );
            if (idx !== -1) {
              list[idx].playlist_metadata.name = name as string;
            }
          }
        )
      );
      return { previousData };
    },
    onSuccess: () => {
      toast.success('Update playlist successfully');
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (error, _, context) => {
      if (error instanceof AxiosError) {
        const errorMessage = (error.response?.data as ErrorResponseApi).message;
        toast.error(errorMessage || 'Failed to update playlist');
      }
      queryClient.setQueryData(['my-playlists'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-playlists']
      });
    }
  });

  return { update: mutate, isPending };
}

export default useUpdatePlaylist;
