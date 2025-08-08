import { useEffect, useRef, useState } from 'react';
import HomeHeader from './components/HomeHeader';
import PlaylistGrid from './components/PlaylistGrid';
import RecommendedCarouselList from './components/RecommendedCarouselList';
import clsx from 'clsx';
import TopTrending from './components/TopTrending';
import InfoFooter from '@/layout/InfoFooter';

export default function HomePage() {
  const [scrollValue, setScrollValue] = useState(0);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!scrollValue) {
      setScrollValue(scrollValue);
    }
  }, [scrollValue]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const { scrollHeight, clientHeight } = el;
    setHasScrollbar(scrollHeight > clientHeight);
  }, []);

  return (
    <main
      ref={mainRef}
      onScroll={(e) => setScrollValue((e.target as HTMLElement).scrollTop)}
      className="h-full overflow-auto scrollbar-overlay rounded-[10px]"
    >
      <section
        className={clsx(
          'pb-2 relative bg-gradient-to-b from-0% from-[#432323] to-[#121212]',
          hasScrollbar ? 'to-30%' : 'to-40%'
        )}
      >
        <HomeHeader scrollValue={scrollValue} />
        <div className="px-10">
          <PlaylistGrid />
          <RecommendedCarouselList />
          <TopTrending />
        </div>
      </section>
      <InfoFooter />
    </main>
  );
}
