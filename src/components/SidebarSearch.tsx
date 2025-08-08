import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function SidebarSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref } = useOutsideClick<HTMLFormElement>(handleClickOutside);

  useEffect(() => {
    if (isFocused) inputRef.current?.focus();
  }, [isFocused]);

  function handleClickOutside() {
    if (inputRef.current?.value.trim() === '') {
      setIsFocused(false);
    } else {
      // submit
    }
  }

  return (
    <form
      ref={ref}
      onSubmit={(e) => e.preventDefault()}
      onClick={() => setIsFocused(true)}
      className={clsx(
        'flex items-center cursor-pointer transition-all duration-300 p-2 rounded-full',
        isFocused ? 'w-64 bg-[#2a2a2a]' : 'w-10 hover:bg-[#2a2a2a]'
      )}
    >
      <Search className="text-gray-600 w-5 h-5 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search your playlist..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={clsx(
          'bg-transparent outline-none w-full text-sm transition-opacity duration-300',
          isFocused ? 'ml-2 opacity-100 visible' : 'opacity-0 invisible'
        )}
      />
    </form>
  );
}
