import { debounce } from '@/utils/helpers';
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value) {
      navigate({ pathname: '/search', search: `?q=${value}` });
    } else {
      e.target.value = '';
    }
  });

  return (
    <div className="group focus-within:border-white h-[48px] flex-1 w-l bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-full pr-3 flex items-center border-2 border-transparent transition-all duration-250">
      <div className="px-3 h-full flex items-center">
        <SearchIcon
          size="24"
          className="group-hover:text-white text-[#929092] transition-[color] duration-250"
        />
      </div>
      <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
        <input
          spellCheck={false}
          onChange={handleChange}
          type="text"
          placeholder="What do you want to play?"
          className="outline-none h-full w-full text-white placeholder:text-[#929092]"
        />
      </form>
    </div>
  );
}
