/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from 'react';

/*
  1. <T extends (...args: any[]) => void>
    T là một kiểu generic đại diện cho hàm bạn muốn debounce.
    (...args: any[]) => void nghĩa là:
    T phải là một hàm
    Có thể nhận bất kỳ số lượng tham số (...args: any[])
    Trả về void (không trả về giá trị hoặc giá trị không quan trọng).

  2. (fn: T, ...params: Parameters<T>)
    fn: T nghĩa là tham số fn chính là hàm cần debounce.
    ...params: Parameters<T> nghĩa là:
    Parameters<T> là utility type của TypeScript, sẽ tự động lấy kiểu tham số của hàm T.
    Giúp bạn truyền đúng loại dữ liệu cho fn mà không bị lẫn lộn.
*/

function useDebounceApiCall(timeout: number = 300) {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debounceApiCall = useCallback(
    <T extends (...args: any[]) => void>(fn: T, ...params: Parameters<T>) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(() => {
        fn(...params);
      }, timeout);
    },
    [timeout]
  );

  return { debounceApiCall };
}

export default useDebounceApiCall;
