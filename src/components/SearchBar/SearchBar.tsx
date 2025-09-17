// components/SearchBarAutocomplete.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { Search as SearchIcon } from 'lucide-react';
import { searchServices } from '@/services/search';

type Suggestion = {
  id: string | number;
  text: string;
  type: 'artists' | 'albums' | 'tracks' | 'playlists' | string;
};

export default function SearchBar({
  placeholder = 'What do you want to play?',
  className = '',
  onSelect
}: {
  placeholder?: string;
  className?: string;
  onSelect?: (s: Suggestion) => void;
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    data,
    refetch,
    isFetching // better than isLoading for manual refetch
  } = useQuery({
    queryKey: ['autocomplete', query],
    queryFn: () => searchServices.autocomplete(query),
    enabled: false, // trigger manually
    staleTime: 2 * 60 * 1000
  });

  const suggestions: Suggestion[] = data?.data?.data ?? [];

  // Debounce refetch based on query
  const debouncedRefetch = useMemo(
    () =>
      debounce((q: string) => {
        if (q.trim().length >= 2) refetch();
      }, 300),
    [refetch]
  );

  useEffect(() => {
    if (query.trim().length >= 2) {
      setIsOpen(true);
      debouncedRefetch(query);
    } else {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
    return () => debouncedRefetch.cancel();
  }, [query, debouncedRefetch]);

  // Click-outside to close dropdown
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'artists':
        return '👤';
      case 'albums':
        return '💿';
      case 'tracks':
        return '🎵';
      case 'playlists':
        return '📋';
      default:
        return '🔍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'artists':
        return 'text-blue-400';
      case 'albums':
        return 'text-purple-400';
      case 'tracks':
        return 'text-green-400';
      case 'playlists':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleSelect = (s: Suggestion) => {
    setQuery(s.text);
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSelect) {
      onSelect(s);
    } else {
      navigate(`/search?q=${encodeURIComponent(s.text)}`);
    }
  };

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    setIsOpen(false);
    setSelectedIndex(-1);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative flex-1 ${className}`}>
      {/* UI giữ nguyên từ SearchBar */}
      <div className="group focus-within:border-white h-[48px] flex-1 w-full bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-full pr-3 flex items-center border-2 border-transparent transition-all duration-250">
        <div className="px-3 h-full flex items-center">
          {isFetching ? (
            <div className="h-5 w-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
          ) : (
            <SearchIcon
              size={24}
              className="group-hover:text-white text-[#929092] transition-[color] duration-250"
            />
          )}
        </div>

        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            type="text"
            placeholder={placeholder}
            className="outline-none h-full w-full bg-transparent text-white placeholder:text-[#929092]"
          />
        </form>
      </div>

      {/* Dropdown gợi ý (logic từ SearchAutocomplete) */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={`${s.type}-${s.id}`}
              type="button"
              onClick={() => handleSelect(s)}
              className={`w-full text-left px-4 py-2 transition-colors ${
                i === selectedIndex
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-gray-200 hover:bg-[#2a2a2a] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{getTypeIcon(s.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{s.text}</p>
                  <p className={`text-xs capitalize ${getTypeColor(s.type)}`}>
                    {s.type?.endsWith('s') ? s.type.slice(0, -1) : s.type}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
