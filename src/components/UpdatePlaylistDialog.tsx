import { useDialogStore } from '@/store/dialog.store';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import Loading from './Loading';
import { Ellipsis, Music, Pencil, X } from 'lucide-react';

export default function UpdatePlaylistDialog() {
  const { openName, title, actionLabel, disabled, onAction, closeDialog } =
    useDialogStore();

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
        </DialogHeader>
        <button
          className="p-1 rounded-full bg-[#131313] absolute top-2 right-2 hover:opacity-80 cursor-pointer"
          onClick={closeDialog}
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-12 items-start gap-4">
          <div className="col-span-5">
            <label className="block relative bg-[#3e3e3e] pt-[100%] rounded-xs shadow-2xl hover:bg-[#1c1c1c] group">
              <input type="file" hidden />
              <button
                className="p-1 hidden rounded-full bg-[#131313] absolute top-2 right-2 group-hover:block"
                onClick={(e) => e.stopPropagation()}
              >
                <Ellipsis />
              </button>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Music className="group-hover:hidden size-14" color="#7f7f7f" />
                <div className="group-hover:flex flex-col items-center hidden text-center">
                  <Pencil size={56} color="#7f7f7f" />
                  <span className="text-nowrap mt-1 text-md font-semibold text-[#7f7f7f]">
                    Choose photo
                  </span>
                </div>
              </div>
              {/* <img src="" alt="" /> */}
            </label>
          </div>
          <div className="col-span-7 h-full">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4 h-full"
            >
              <div className="bg-[#3e3e3e] h-10 px-2 relative group rounded-xs border-2 border-transparent focus-within:border-[#ffffff1a]">
                <label className="absolute opacity-100 visible text-xs text-[#b3b3b3] font-semibold top-0 -translate-y-1/2 left-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full h-full text-white outline-none"
                />
              </div>
              <div className="flex-1 bg-[#3e3e3e] p-2 relative rounded-xs border-2 border-transparent focus-within:border-[#ffffff1a]">
                <label className="absolute opacity-100 visible text-xs text-[#b3b3b3] font-semibold top-0 -translate-y-1/2 left-2">
                  Description
                </label>
                <textarea className="resize-none w-full h-full outline-none"></textarea>
              </div>
            </form>
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={disabled}
            type="submit"
            className="bg-white text-lg rounded-full min-w-[128px] h-12 font-bold"
            onClick={onAction}
          >
            {disabled ? <Loading size="sm" /> : actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
