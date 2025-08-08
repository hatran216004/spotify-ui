import TagButton from '@/components/TagButton';
import clsx from 'clsx';

export default function HomeHeader({ scrollValue }: { scrollValue?: number }) {
  return (
    <header
      className={clsx(
        'h-[var(--home-header-height)] sticky z-1 top-0 left-0 right-0 transition-[background-color] duration-300',
        scrollValue ? 'bg-[#432323]' : 'bg-transparent'
      )}
    >
      <div className="px-10 h-full flex items-center gap-2">
        <TagButton className="bg-white text-black hover:opacity-90 hover:bg-white">
          All
        </TagButton>
        <TagButton className="bg-[#ffffff1a] text-white shadow-2xl hover:opacity-90 hover:bg-[#ffffff1a]">
          Album
        </TagButton>
        <TagButton className="bg-[#ffffff1a] text-white shadow-2xl hover:opacity-90 hover:bg-[#ffffff1a]">
          My favorite songs
        </TagButton>
      </div>
    </header>
  );
}
