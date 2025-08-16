import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './store/ui.store';
import { TooltipProvider } from './components/ui/tooltip';
import AudioPlayer from './components/AudioPlayer';
import TrackPage from './pages/Track/TrackPage';
import HomePage from './pages/Home/HomePage';
import { useTrack } from './store/track.store';
import { useEffect } from 'react';
import AdminPage from './pages/Auth/Admin/AdminPage';
import AdminLayout from './layout/AdminLayout';
import PlaylistPage from './pages/Playlist/PlaylistPage';
import ArtistPage from './pages/Artist/ArtistPage';
import { playerServices } from './services/player';
import { useQuery } from '@tanstack/react-query';
import { useCurrentPlayback } from './store/playback.store';
import CollectionPage from './pages/Collection/CollectionPage';

function ProtecedRoute() {
  const { user } = useUserStore();
  return user?.clerkId ? <Outlet /> : <Navigate to="/login" replace />;
}

function RejectedRoute() {
  const { user } = useUserStore();
  return !user?.clerkId ? <Outlet /> : <Navigate to="/" replace />;
}

export default function App() {
  const { setIsPlayling } = useTrack();
  const userId = useUserStore().user?._id;
  const { setCurrentPlayback } = useCurrentPlayback();

  const { data } = useQuery({
    queryKey: ['current-playback', userId],
    queryFn: playerServices.getCurrentPlayback
  });

  // useEffect(() => {
  //   const currentPlayback = data?.data?.data?.currentPlayback;
  //   if (currentPlayback) {
  //     setCurrentPlayback(currentPlayback);
  //     // setIsPlayling(currentPlayback.isPlaying);
  //   }
  // }, [data, setCurrentPlayback, setIsPlayling]);

  // useEffect(() => {
  //   const handler = (e: KeyboardEvent) => {
  //     if (e.code === 'Space') {
  //       togglePlayBack();
  //     }
  //   };
  //   document.addEventListener('keydown', handler);
  //   return () => {
  //     document.removeEventListener('keydown', handler);
  //   };
  // }, [togglePlayBack]);

  return (
    <>
      <AudioPlayer />
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route element={<ProtecedRoute />}>
                <Route path="/tracks/:trackId" element={<TrackPage />} />
                <Route
                  path="/playlists/:playlistId"
                  element={<PlaylistPage />}
                />
                <Route path="/artists/:artistId" element={<ArtistPage />} />
                <Route path="/collection/tracks" element={<CollectionPage />} />
              </Route>
            </Route>

            <Route element={<AdminLayout />}>
              <Route element={<ProtecedRoute />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>

            <Route element={<RejectedRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 2000
          },
          error: {
            duration: 3000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#1db954',
            color: '#000'
          }
        }}
      />
    </>
  );
}
