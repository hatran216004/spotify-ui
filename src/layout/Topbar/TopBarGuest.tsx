import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function TopBarGuest() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => navigate('/register')}
        className="rounded-full font-semibold h-12 text-[#929092] bg-transparent hover:bg-transparent hover:text-white"
      >
        Sign up
      </Button>
      <Button
        onClick={() => navigate('/login')}
        className="rounded-full h-12 w-[144px] max-w-full font-semibold"
      >
        Log in
      </Button>
    </div>
  );
}
