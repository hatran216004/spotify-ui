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
import SongPage from './pages/Song/SongPage';
import HomePage from './pages/Home/HomePage';
import { useSong } from './store/song.store';
import { useEffect, useRef } from 'react';
import AdminPage from './pages/Auth/Admin/AdminPage';
import AdminLayout from './layout/AdminLayout';
import HomeLayout from './layout/HomeLayout';

function ProtecedRoute() {
  const { user } = useUserStore();
  return user?.clerkId ? <Outlet /> : <Navigate to="/login" replace />;
}

function RejectedRoute() {
  const { user } = useUserStore();
  return !user?.clerkId ? <Outlet /> : <Navigate to="/" replace />;
}

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setAudioElement, togglePlayBack } = useSong();

  useEffect(() => {
    const audioEle = audioRef.current;
    if (audioEle) {
      setAudioElement(audioEle);
    }
  }, [setAudioElement]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        togglePlayBack();
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [togglePlayBack]);

  return (
    <>
      <AudioPlayer audioRef={audioRef} />
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route
                path="/"
                element={
                  <HomeLayout>
                    <HomePage />
                  </HomeLayout>
                }
              />
              <Route element={<ProtecedRoute />}>
                <Route
                  path="/songs/:songId"
                  element={
                    <HomeLayout>
                      <SongPage />
                    </HomeLayout>
                  }
                />
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
