import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategoryId } from "@/service/home/service";
import type { TProductDetail } from "@/types/home.type";
import CardProduct from "@/components/common/card-product";
import { useCategories } from "@/hook/category/use-category";

export default function ProductListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories, isPending: isLoadingCategories } = useCategories();

  const categoryId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("category") || "";
  }, [location.search]);

  const { data: products, isPending, error } = useQuery({
    queryKey: ["PRODUCTS_BY_CATEGORY", categoryId],
    queryFn: () => getProductByCategoryId(categoryId),
    enabled: !!categoryId,
    refetchOnWindowFocus: false,
  });

  const category = useMemo(() => {
    if (!categoryId || isLoadingCategories) return undefined;
    return categories.find((c) => String(c.id) === String(categoryId));
  }, [categoryId, categories, isLoadingCategories]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            {category?.name || "Sản phẩm"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {category
              ? "Danh sách sản phẩm theo danh mục"
              : "Chọn danh mục để xem sản phẩm"}
          </p>
        </div>
        <button
          className="text-sm text-green-primary hover:underline"
          onClick={() => navigate("/")}
        >
          Về trang chủ
        </button>
      </div>

      {!categoryId && (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          Vui lòng chọn danh mục từ thanh điều hướng để xem sản phẩm.
        </div>
      )}

      {!!categoryId && isPending && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[350px] bg-gray-100 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {!!categoryId && error && (
        <div className="rounded-lg border p-6 text-center text-red-600">
          Không thể tải sản phẩm. Vui lòng thử lại sau.
        </div>
      )}

      {!!categoryId && !isPending && !error && (
        <>
          {(!products || products.length === 0) ? (
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              Chưa có sản phẩm trong danh mục này.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p: TProductDetail) => (
                <CardProduct key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}