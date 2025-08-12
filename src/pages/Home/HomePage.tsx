import { useEffect, useRef, useState } from 'react';
import HomeHeader from './components/HomeHeader';
import PlaylistGrid from './components/PlaylistGrid';
import RecommendedCarouselList from './components/RecommendedCarouselList';
import clsx from 'clsx';
import TopTrending from './components/TopTrending';
import InfoFooter from '@/layout/InfoFooter';
import { getRandomRGB } from '@/utils/helpers';

const THERESHOLD = 50;

export default function HomePage() {
  const [bgColor, setBgColor] = useState([0, 0, 0, 0]);
  const [scrolling, setScrolling] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const { scrollHeight, clientHeight } = el;
    setHasScrollbar(scrollHeight > clientHeight);
  }, []);

  useEffect(() => {
    setBgColor(getRandomRGB());
  }, []);

  return (
    <main
      className="h-full overflow-auto rounded-[10px]"
      ref={mainRef}
      onScroll={(e) => setScrolling(e.currentTarget.scrollTop > THERESHOLD)}
    >
      <section
        className={clsx(
          'pb-2 relative bg-gradient-to-b',
          hasScrollbar ? 'to-30%' : 'to-40%'
        )}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(${bgColor.join(
            ','
          )}) 0%, #121212 60%)`
        }}
      >
        <HomeHeader
          scrolling={scrolling}
          bgColor={`rgb(${[bgColor[0], bgColor[1], bgColor[2]].join(',')})`}
        />
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
