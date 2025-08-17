import { useEffect, useRef, useState } from 'react';
import HomeHeader from './components/HomeHeader';
import PlaylistGrid from './components/PlaylistGrid';
import RecommendedList from './components/RecommendedList';
import clsx from 'clsx';
import TopTrending from './components/TopTrending';
import InfoFooter from '@/layout/InfoFooter';
import { getRandomColor } from '@/utils/helpers';
import PopularArtists from './components/PopularArtists';
import PopularAlbums from './components/PopularAlbums';

const THERESHOLD = 50;

export default function HomePage() {
  const [scrolling, setScrolling] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const bgColor = useRef(getRandomColor());

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const { scrollHeight, clientHeight } = el;
    setHasScrollbar(scrollHeight > clientHeight);
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
          backgroundImage: `linear-gradient(to bottom, ${bgColor.current} 0%, #121212 60%)`
        }}
      >
        <HomeHeader scrolling={scrolling} bgColor={bgColor.current} />
        <div className="px-10">
          <PlaylistGrid />
          <RecommendedList />
          <TopTrending />
          <PopularArtists />
          <PopularAlbums />
        </div>
      </section>
      <InfoFooter />
    </main>
  );
}
