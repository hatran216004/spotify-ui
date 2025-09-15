import TagButton from '@/components/TagButton';
import useUrl from '@/hooks/useUrl';
import clsx from 'clsx';

export default function LibraryTabButtons() {
  const { currentValue, handler } = useUrl({
    field: 'item_type',
    defaultValue: 'all'
  });

  const activeCss = 'bg-white text-black hover:bg-white hover:text-black';

  return (
    <div className="mt-5 px-3 flex items-center gap-3">
      <TagButton
        onClick={() => handler('playlists')}
        className={clsx(currentValue === 'playlists' && activeCss)}
      >
        Playlists
      </TagButton>
      <TagButton
        onClick={() => handler('artists')}
        className={clsx(currentValue === 'artists' && activeCss)}
      >
        Artists
      </TagButton>
      <TagButton
        onClick={() => handler('albums')}
        className={clsx(currentValue === 'albums' && activeCss)}
      >
        Albums
      </TagButton>
      <TagButton
        onClick={() => handler('all')}
        className={clsx(currentValue === 'all' && activeCss)}
      >
        All
      </TagButton>
    </div>
  );
}
