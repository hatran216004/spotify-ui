import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, timeout: number = 300) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, timeout]);

  return debounceValue;
}

export default useDebounce;
