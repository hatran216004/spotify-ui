import AdminLayout from '@/layout/AdminLayout';
import MainLayout from '@/layout/MainLayout';
import ArtistPage from '@/pages/Artist/ArtistPage';
import AuthCallbackPage from '@/pages/Auth/AuthCallbackPage';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import ResetPassword from '@/pages/Auth/ResetPassword';
import SSOCallBackPage from '@/pages/Auth/SSOCallBackPage';
import VerifyOTPPage from '@/pages/Auth/VerifyOTPPage';
import CollectionPage from '@/pages/Collection/CollectionPage';
import HomePage from '@/pages/Home/HomePage';
import PlaylistPage from '@/pages/Playlist/PlaylistPage';
import SearchPage from '@/pages/Search/SearchPage';
import TrackPage from '@/pages/Track/TrackPage';
import AlbumPage from '@/pages/Album/AlbumPage';
import AdminPage from '@/pages/Auth/Admin/AdminPage';
import { useUserStore } from '@/store/ui.store';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';

function ProtectedRoute() {
  const isLogin = useUserStore((s) => s.isLogin);
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}

function RejectedRoute() {
  const isLogin = useUserStore((s) => s.isLogin);
  return !isLogin ? <Outlet /> : <Navigate to="/" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/sso-callback" element={<SSOCallBackPage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/auth/verify-otp" element={<VerifyOTPPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tracks/:trackId" element={<TrackPage />} />
            <Route path="/playlists/:playlistId" element={<PlaylistPage />} />
            <Route path="/artists/:artistId" element={<ArtistPage />} />
            <Route path="/albums/:albumId" element={<AlbumPage />} />
            <Route path="/collection/tracks" element={<CollectionPage />} />
          </Route>
        </Route>

        <Route element={<RejectedRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
