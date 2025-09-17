import { TooltipProvider } from './components/ui/tooltip';
import AudioPlayer from './components/AudioPlayer';
import ConfirmationDialog from './components/ConfirmationDialog';
import UpdatePlaylistDialog from './components/UpdatePlaylistDialog';
import AppRoutes from './components/AppRoutes';
import CustomToast from './components/CustomToast';

export default function App() {
  return (
    <TooltipProvider>
      <AudioPlayer />
      <ConfirmationDialog />
      <UpdatePlaylistDialog />

      <AppRoutes />

      <CustomToast />
    </TooltipProvider>
  );
}
