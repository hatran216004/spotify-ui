import RenderList from '@/components/RenderList';
import SongCard from '@/components/SongCard';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem
} from '@/components/ui/carousel';
import { songServices } from '@/services/song';
import { useUserStore } from '@/store/ui.store';
import { useQuery } from '@tanstack/react-query';

export default function RecommendedList() {
  const { isLogin } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ['recommended-songs'],
    queryFn: songServices.getRecommendedSongs,
    enabled: !!isLogin
  });

  if (isLoading || !isLogin) return null;
  const songs = data?.data.data.songs;

  return (
    <section>
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
            data={songs}
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
    </section>
  );
}
