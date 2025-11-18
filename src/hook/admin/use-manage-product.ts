import ProductManageKeys from "@/service/admin/product/endpoint";
import {
  addProduct,
  deleteProduct,
  getAllCategory,
  updateProduct,
  type ProductFormData,
} from "@/service/admin/product/service";
import HomeKeys from "@/service/home/endpoint";
import { getProductByCategoryId } from "@/service/home/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "@/components/ui/use-toast";

export function useManageProduct({
  idCat,
  setIsFormOpen,
}: {
  idCat: string;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const { data: allCategory, isPending } = useQuery({
    queryKey: [ProductManageKeys.GET_CATEGORY],
    queryFn: () => getAllCategory(),
    refetchOnWindowFocus: false,
  });

  const { data: productByCategoryId, isPending: isPendingCategory } = useQuery({
    queryKey: [HomeKeys.PRODUCT_BY_CATEGORY_BY_ID, idCat],
    queryFn: () => getProductByCategoryId(idCat),
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteProductId, isPending: isPendingDelete } = useMutation({
    mutationKey: [ProductManageKeys.DELETE_PRODUCT],
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [HomeKeys.PRODUCT_BY_CATEGORY_BY_ID, idCat],
      });

      toast.success("xóa sản phẩm thành công");
    },
  });
  const { mutate: addProductFn, isPending: isPendingAdd } = useMutation({
    mutationKey: [ProductManageKeys.ADD_PRODUCT],
    mutationFn: ({
      formData,
      files,
    }: {
      formData: ProductFormData;
      files: File[];
    }) => addProduct(formData, files),
    onSuccess: () => {
      setIsFormOpen(false);
      queryClient.invalidateQueries({
        queryKey: [HomeKeys.PRODUCT_BY_CATEGORY_BY_ID, idCat],
      });

      toast.success("thêm sản phẩm thành công");
    },
  });
  const { mutate: updateProductFn, isPending: isPendingUpdate } = useMutation({
    mutationKey: [ProductManageKeys.UPDATE_PRODUCT],
    mutationFn: ({
      formData,
      files,
      id,
    }: {
      formData: ProductFormData;
      files: File[];
      id: number;
    }) => updateProduct(formData, files, id),
    onSuccess: () => {
      setIsFormOpen(false);

      queryClient.invalidateQueries({
        queryKey: [HomeKeys.PRODUCT_BY_CATEGORY_BY_ID, idCat],
      });

      toast.success("cập nhật sản phẩm thành công");
    },
  });

  return {
    allCategory,
    isPending,
    productByCategoryId,
    isPendingCategory,
    deleteProductId,
    isPendingDelete,
    addProductFn,
    isPendingAdd,
    updateProductFn,
    isPendingUpdate,
  };
}