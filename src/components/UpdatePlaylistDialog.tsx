/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDialogStore } from '@/store/dialog.store';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Ellipsis, Music, Pencil, X } from 'lucide-react';
import { updatePlaylistSchema, type UpdatePlaylistSchema } from '@/utils/rules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { isValidFileType } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistServices } from '@/services/playlist';
import DotIndicator from './DotIndicator';
import { AxiosError } from 'axios';
import { ErrorResponseApi } from '@/types/response.type';
import toast from 'react-hot-toast';
import { Playlist } from '@/types/playlist.type';
import { QueryData } from '@/types/utils.type';
import { produce } from 'immer';

type FormData = UpdatePlaylistSchema;

export default function UpdatePlaylistDialog() {
  const {
    openName,
    title,
    actionLabel,
    disabled,
    payload,
    closeDialog,
    setDisabled
  } = useDialogStore();
  const [previewUrl, setPreviewUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(updatePlaylistSchema)
  });
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
        produce(old, (draft: QueryData<{ playlists: Playlist[] }>) => {
          const list = draft?.data?.data?.playlists;
          if (!list) return;

          const idx = list.findIndex((p) => p._id === updatedPlaylistId);
          if (idx !== -1) {
            list[idx].name = name as string;
          }
        })
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
      setDisabled(false);
      closeDialog();
    }
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onSubmit = (data: FormData) => {
    setDisabled(true);

    const playlistId = payload.id;

    if (!playlistId) return;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');

    const file = data.coverImage?.item(0);
    if (file) {
      formData.append('coverImage', file);
    }

    mutate({ id: playlistId, data: formData });
  };

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isValidFileType(file.name, 'image')) return;
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const hasCoverImage = payload?.coverImage || previewUrl;

  return (
    <Dialog open={openName === 'update'}>
      <DialogContent
        onInteractOutside={closeDialog}
        className="bg-[#282828]"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold">
            {title}
          </DialogTitle>
          <div className="space-y-1">
            {errors.name?.message && (
              <span className="block text-center text-xs p-1 bg-red-500">
                {errors.name?.message}
              </span>
            )}
            {errors.coverImage?.message && (
              <span className="block text-center text-xs p-1 bg-red-500">
                {errors.coverImage?.message}
              </span>
            )}
          </div>
        </DialogHeader>
        <button
          className="p-1 rounded-full bg-[#131313] absolute top-2 right-2 hover:opacity-80 cursor-pointer"
          onClick={closeDialog}
        >
          <X size={16} />
        </button>

        <form
          className="grid grid-cols-12 items-start gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="col-span-5">
            <label
              className={clsx(
                'block relative bg-[#3e3e3e] pt-[100%] rounded-xs shadow-2xl hover:opacity-80 group',
                isPending && 'opacity-70'
              )}
            >
              <input
                type="file"
                hidden
                {...register('coverImage', { onChange: handlePreviewImage })}
              />
              <button
                className="p-1 hidden rounded-full bg-[#131313] absolute top-2 right-2 group-hover:block"
                onClick={(e) => e.stopPropagation()}
              >
                <Ellipsis />
              </button>
              {hasCoverImage && (
                <img
                  src={previewUrl ? previewUrl : payload?.coverImage}
                  alt={payload?.name}
                  className="absolute top-0 left-0 object-cover w-full h-full"
                />
              )}
              {!payload?.coverImage && !previewUrl && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Music
                    className="group-hover:hidden size-14"
                    color="#7f7f7f"
                  />
                </div>
              )}
              <div className="group-hover:flex flex-col items-center hidden text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Pencil
                  size={56}
                  color={`${hasCoverImage ? 'white' : '#7f7f7f'}`}
                />
                <span
                  className={clsx(
                    'text-nowrap mt-1 text-md font-semibold',
                    hasCoverImage ? 'text-white' : 'text-[#7f7f7f]'
                  )}
                >
                  Choose photo
                </span>
              </div>
              {isPending && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                  <DotIndicator />
                </div>
              )}
            </label>
          </div>
          <div className="col-span-7 h-full">
            <div className="flex flex-col gap-4 h-full">
              <div className="bg-[#3e3e3e] h-10 px-2 relative group rounded-xs border-2 border-transparent focus-within:border-[#ffffff1a]">
                <label className="absolute opacity-100 visible text-xs text-[#b3b3b3] font-semibold top-0 -translate-y-1/2 left-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full h-full text-white outline-none"
                  {...register('name')}
                  defaultValue={payload?.name}
                />
              </div>
              <div className="flex-1 bg-[#3e3e3e] p-2 relative rounded-xs border-2 border-transparent focus-within:border-[#ffffff1a]">
                <label className="absolute opacity-100 visible text-xs text-[#b3b3b3] font-semibold top-0 -translate-y-1/2 left-2">
                  Description
                </label>
                <textarea
                  defaultValue={payload?.description}
                  className="resize-none w-full h-full outline-none"
                  {...register('description')}
                ></textarea>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={disabled}
            type="submit"
            className="bg-white text-lg rounded-full min-w-[128px] h-12 font-bold"
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
