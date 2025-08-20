import { create } from 'zustand';

type DialogName = 'update' | 'confirm' | 'none';

type DialogState = {
  openName: DialogName;
  title: string | React.ReactNode | null;
  description: string | React.ReactNode | null;
  cancelLabel: string | React.ReactNode | null;
  actionLabel: string | React.ReactNode | null;
  disabled: boolean;
  onAction: () => void;
  onCancel: () => void;
};

type DialogActions = {
  openDialog: (data: {
    openName: DialogName;
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    cancelLabel?: string | React.ReactNode;
    actionLabel: string | React.ReactNode;
    onAction: () => void;
    onCancel?: () => void;
  }) => void;
  closeDialog: () => void;
  setDisabled: (value: boolean) => void;
};

type DialogStore = DialogState & DialogActions;

const initalConfirmation = {
  openName: 'none' as DialogName,
  title: null,
  description: null,
  cancelLabel: null,
  actionLabel: null,
  disabled: false,
  onAction: () => {},
  onCancel: () => {}
};

export const useDialogStore = create<DialogStore>((set) => ({
  ...initalConfirmation,
  openDialog: (data) =>
    set(() => ({
      disabled: false,
      ...data
    })),
  closeDialog: () => set(() => initalConfirmation),
  setDisabled: (value) => set({ disabled: value })
}));
