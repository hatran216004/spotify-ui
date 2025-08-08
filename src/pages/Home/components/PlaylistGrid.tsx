import TogglePlayBackAudio from '@/components/TogglePlayBackAudio';

export default function PlaylistGrid() {
  return (
    <section className="mt-2 grid grid-cols-12 gap-2">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="group flex items-center col-span-6 relative rounded-sm bg-[#ffffff1a] hover:bg-[#FAFAFA33] overflow-hidden cursor-pointer"
          >
            <img
              className="w-12 h-12 object-cover"
              src="https://i.pinimg.com/1200x/af/90/5d/af905da3797479c05f8d954fe7b47a4a.jpg"
              alt=""
            />
            <h2 className="mx-2 text-sm font-semibold text-white">
              Playlist #{index + 1}
            </h2>
            <TogglePlayBackAudio
              className="absolute right-2 hidden shadow-2xl group-hover:flex"
              iconColor="#000"
              hasTooltip={false}
            />
          </div>
        ))}
    </section>
  );
}
