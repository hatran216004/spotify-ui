import { FaMusic } from 'react-icons/fa';

export default function PlaylistPlaceholder() {
  return (
    <div className="flex-shrink-0 w-[48px] h-[48px] flex items-center justify-center rounded-[4px] group-hover/playlist:bg-[#0e0e0e] bg-[#282828]">
      <FaMusic color="#929092" />
    </div>
  );
}
