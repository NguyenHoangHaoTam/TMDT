import HomeKeys from "@/service/home/endpoint";
import {
  getFeatured,
  getProductByCategoryId,
  getProductTab,
} from "@/service/home/service";
import { useQueries, useQuery } from "@tanstack/react-query";

export function useHomePage(valueTab: string) {
  const { data: prodFeatured, isPending } = useQuery({
    queryKey: [HomeKeys.PRODUCT_FEATURED],
    queryFn: () => getFeatured(),
    refetchOnWindowFocus: false,
  });

  const { data: prodTab, isPending: isPendingTab } = useQuery({
    queryKey: [HomeKeys.PRODUCT_TAB, valueTab],
    queryFn: () => getProductTab(valueTab),
    enabled: Boolean(valueTab),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { prodFeatured, isPending, prodTab, isPendingTab };
}

export function useProdByCategory(ids: string[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: [HomeKeys.PRODUCT_BY_CATEGORY_BY_ID, id],
      queryFn: () => getProductByCategoryId(id),
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    })),
  });

  return results;
}
