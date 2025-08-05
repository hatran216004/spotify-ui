import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './store/ui.store';
import { TooltipProvider } from './components/ui/tooltip';

function ProtecedRoute() {
  const { user } = useUserStore();
  return user?.clerkId ? <Outlet /> : <Navigate to="/login" replace />;
}

function RejectedRoute() {
  const { user } = useUserStore();
  return !user?.clerkId ? <Outlet /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtecedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Route>

          <Route element={<RejectedRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
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
    </TooltipProvider>
  );
}
