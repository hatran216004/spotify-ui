import ArtistCard from '@/components/ArtistCard';
import RenderList from '@/components/RenderList';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem
} from '@/components/ui/carousel';
import { artistServices } from '@/services/artist';
import { useQuery } from '@tanstack/react-query';

export default function PopularArtists() {
  const { data, isLoading } = useQuery({
    queryKey: ['artists-popular'],
    queryFn: artistServices.getPopularArtists
  });

  if (isLoading) return null;
  const artists = data?.data.data.artists;

  return (
    <section>
      <h3 className="mt-4 text-white text-2xl mb-2 font-semibold">
        Popular Artists
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
            data={artists}
            render={(artist) => (
              <CarouselItem
                key={artist._id}
                className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                <ArtistCard artist={artist} />
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
