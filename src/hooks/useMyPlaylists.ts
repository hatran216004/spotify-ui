import { playlistServices } from '@/services/playlist';
import { useUserStore } from '@/store/ui.store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { isUndefined, omitBy } from 'lodash';
import useQueryConfig from './useQueryConfig';
import { LibraryItemList, LibraryItemPlaylist } from '@/types/libraryItem.type';
import { SuccessResponseApi } from '@/types/response.type';
import { AxiosResponse } from 'axios';

function useMyPlaylists() {
  const { isLogin } = useUserStore();
  const { query } = useQueryConfig();
  const queryConfig = omitBy(
    {
      limit: Number(query.limit)
    },
    isUndefined
  );

  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['my-playlists'],
    queryFn: ({ pageParam = 1 }) =>
      playlistServices.getMyPlaylists({ page: pageParam, ...queryConfig }),
    enabled: isLogin,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.data.pagination;
      if (!pagination) return;

      return pagination.currentPage < pagination.pageCount
        ? pagination.currentPage + 1
        : undefined;
    },
    initialPageParam: 1
  });

  const myPlaylists = data?.pages
    ? data.pages.reduce(
        (
          acc: LibraryItemPlaylist[],
          page: AxiosResponse<
            SuccessResponseApi<LibraryItemList<LibraryItemPlaylist>>
          >
        ) => {
          const items = page?.data?.data?.items ?? [];
          return [...acc, ...items];
        },
        []
      )
    : [];

  const pagination = data?.pages?.[data?.pages?.length - 1];

  return {
    myPlaylists,
    pagination,
    loading: isLoading || isFetchingNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    refetch,
    fetchNextPage
  };
}

export default useMyPlaylists;
