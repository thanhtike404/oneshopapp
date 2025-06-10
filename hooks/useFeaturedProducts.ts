import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchFeaturedProducts = async ({ pageParam = 1 }) => {
    console.log('Fetching page:', pageParam);
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/featuredProducts?page=${pageParam}`);
    console.log('API Response:', res.data);
    return res.data;
  };

  export const useFeaturedProducts = () => {
    return useInfiniteQuery({
      queryKey: ["featured-products"],
      queryFn: fetchFeaturedProducts,
      getNextPageParam: (lastPage) =>
        lastPage.pagination?.hasNextPage
          ? lastPage.pagination.currentPage + 1
          : undefined,
      initialPageParam: 1,
    });
  };

