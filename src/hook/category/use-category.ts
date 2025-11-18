import CategoryKeys from "@/service/category/endpoint";
import { getAllCategories } from "@/service/category/service";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { data: categories, isPending, error } = useQuery({
    queryKey: [CategoryKeys.GET_ALL_CATEGORIES],
    queryFn: () => getAllCategories(),
    refetchOnWindowFocus: false,
    staleTime: Infinity, // Categories ít thay đổi nên cache vĩnh viễn
  });

  // Lọc chỉ lấy root categories (parentId === null)
  const rootCategories = categories?.filter((cat) => cat.parentId === null) || [];

  return { 
    categories: categories || [], 
    rootCategories,
    isPending, 
    error 
  };
}

