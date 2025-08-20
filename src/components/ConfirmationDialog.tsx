import { useDialogStore } from '@/store/dialog.store';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import Loading from './Loading';

export default function ConfirmationDialog() {
  const {
    title,
    openName,
    actionLabel,
    cancelLabel,
    description,
    disabled,
    onAction,
    onCancel,
    closeDialog
  } = useDialogStore();

  return (
    <Dialog open={openName === 'confirm'}>
      <DialogContent
        showCloseButton={false}
        className="w-[420px] bg-white"
        onInteractOutside={closeDialog}
      >
        <DialogHeader>
          <DialogTitle className="text-black text-2xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-black text-md">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={disabled}
            onClick={onCancel}
            className="px-8 rounded-full font-semibold h-12 text-black bg-transparent shadow-none hover:bg-gray-100"
          >
            {cancelLabel}
          </Button>
          <Button
            disabled={disabled}
            type="submit"
            className="bg-green-500 text-lg rounded-full min-w-[128px] h-12 font-bold"
            onClick={onAction}
          >
            {disabled ? <Loading size="sm" /> : actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
