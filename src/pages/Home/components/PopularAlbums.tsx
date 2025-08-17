import AlbumCard from '@/components/AlbumCard';
import RenderList from '@/components/RenderList';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem
} from '@/components/ui/carousel';
import { albumServices } from '@/services/album';
import { useQuery } from '@tanstack/react-query';

export default function PopularAlbums() {
  const { data, isLoading } = useQuery({
    queryKey: ['albums-popular'],
    queryFn: albumServices.getPopularAlbums
  });

  if (isLoading) return null;

  return (
    <>
      <h3 className="mt-4 text-white text-2xl mb-2 font-semibold">
        Popular Albums
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
            data={data?.data.data?.albums || []}
            render={(album) => (
              <CarouselItem
                key={album._id}
                className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                <AlbumCard album={album} />
              </CarouselItem>
            )}
          />
        </CarouselContent>
        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel>
    </>
  );
}
