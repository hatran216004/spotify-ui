import PlayAudio from '@/components/PlayAudio';
import { songServices } from '@/services/song';
import { useQuery } from '@tanstack/react-query';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import SongCard from '@/components/SongCard';
import RenderList from '@/components/RenderList';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['recommended-songs'],
    queryFn: songServices.getRecommendedSongs
  });

  if (isLoading) return null;

  return (
    <section className="py-2">
      <div className="px-5 mx-5">
        <div className="mt-2 grid grid-cols-12 gap-2">
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
                <PlayAudio
                  className="absolute right-2 hidden shadow-2xl group-hover:flex"
                  iconColor="#000"
                  hasTooltip={false}
                />
              </div>
            ))}
        </div>

        <h3 className="mt-4 text-white text-2xl mb-2 font-semibold">
          Recommended for today
        </h3>
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll: 1,
            containScroll: 'trimSnaps'
          }}
        >
          <CarouselContent>
            <RenderList
              data={data?.data.data.songs}
              render={(song) => (
                <CarouselItem
                  key={song._id}
                  className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
                >
                  <SongCard song={song} />
                </CarouselItem>
              )}
            />
          </CarouselContent>
          <CarouselPrevious className="-left-5" />
          <CarouselNext className="-right-5" />
        </Carousel>
      </div>
    </section>
  );
}
