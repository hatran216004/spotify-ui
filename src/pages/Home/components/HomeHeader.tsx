import TagButton from '@/components/TagButton';

export default function HomeHeader({
  scrolling,
  bgColor
}: {
  scrolling?: boolean;
  bgColor?: string;
}) {
  return (
    <header
      style={{ background: scrolling ? bgColor : 'transparent' }}
      className="h-[var(--home-header-height)] sticky z-1 top-0 left-0 right-0 transition-[background-color] duration-300"
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
