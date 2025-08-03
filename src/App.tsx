import { useAuth } from '@clerk/clerk-react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';

function ProtecedRoute() {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

function RejectedRoute() {
  const { isSignedIn } = useAuth();
  return !isSignedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
