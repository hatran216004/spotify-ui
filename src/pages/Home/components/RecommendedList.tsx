import RenderList from '@/components/RenderList';
import TrackCard from '@/components/TrackCard';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem
} from '@/components/ui/carousel';
import { trackServices } from '@/services/track';
import { useUserStore } from '@/store/ui.store';
import { useQuery } from '@tanstack/react-query';

export default function RecommendedList() {
  const { isLogin } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ['recommended-tracks'],
    queryFn: trackServices.getRecommendedTracks,
    enabled: isLogin
  });

  if (!isLogin || isLoading) return null;
  const tracks = data?.data?.data?.tracks;

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
            data={tracks}
            render={(track) => (
              <CarouselItem
                key={track._id}
                className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                <TrackCard track={track} />
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
