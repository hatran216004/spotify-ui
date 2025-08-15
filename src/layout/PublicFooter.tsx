import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function PublicFooter() {
  const navigate = useNavigate();

  return (
    <div className="h-[var(--public-footer-height)] p-2 rounded-[10px] overflow-hidden">
      <div className="px-6 flex items-center justify-between h-full bg-gradient-to-r from-pink-500 to-blue-400">
        <div className="text-white">
          <p className="font-bold text-sm">Preview of Spotify</p>
          <p className="font-semibold text-md">
            Sign up to get unlimited tracks with occasional ads. No credit card
            needed.
          </p>
        </div>
        <Button
          onClick={() => navigate('/register')}
          className="rounded-full h-12 w-[144px] max-w-full font-semibold"
        >
          Sign up free
        </Button>
      </div>
    </div>
  );
}
