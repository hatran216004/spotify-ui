import { useCallback, useEffect, useRef } from 'react';

type UseInfiniteScrollOptions = {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  threshold?: number;
};

function useInfiniteScroll({
  hasMore,
  loading,
  rootMargin = '100px',
  threshold = 0.1,
  onLoadMore
}: UseInfiniteScrollOptions) {
  // ref trỏ tới DOM element → trigger load thêm
  const observerRef = useRef<HTMLDivElement>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );

  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin,
      threshold
    });

    observer.observe(currentRef);
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold, observerCallback]);

  return observerRef;
}

export default useInfiniteScroll;
