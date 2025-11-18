import ApiEndPoint from "@/service/api";
import { api, publicApi } from "@/service/config-api";
import type { Category } from "@/types/category";
import type { ApiResponse } from "@/types/response-api.type";
import toast from "@/components/ui/use-toast";
import { isAxiosError } from "axios";

export type ProductFormData = {
  name: string;
  slug: string;
  description: string;
  price: string;
  stockQuantity: string;
  unit: string;
  isActive: boolean;
  categoryId: number;
};

export async function getAllCategory() {
  try {
    const res = await publicApi.get<ApiResponse<Category[]>>(
      `${ApiEndPoint.GET_CATEGORY}`
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }

    toast.error("lỗi không thể lấy danh mục ");
    return Promise.reject(new Error("lỗi không thể lấy danh mục "));
  } catch (e) {
    toast.error("lỗi không thể lấy danh mục ");

    return Promise.reject(e);
  }
}
export async function deleteProduct(id: number) {
  try {
    const res = await api.delete<ApiResponse<string>>(
      `${ApiEndPoint.DELETE_PRODUCT}/${id}`
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }

    const message =
      res?.data?.message ?? "lỗi không thể xóa sản phẩm này được ";
    toast.error(message);
    return Promise.reject(new Error(message));
  } catch (e) {
    if (isAxiosError(e)) {
      const message =
        e.response?.data?.message ?? "lỗi không thể xóa sản phẩm này được";
      toast.error(message);
      return Promise.reject(new Error(message));
    }
    toast.error("lỗi không thể xóa sản phẩm này được");
    return Promise.reject(e);
  }
}
export async function addProduct(
  formData: ProductFormData,
  files: File[] = []
) {
  const formDataPayload = new FormData();
  formDataPayload.append("product", JSON.stringify(formData));

  files.forEach((file) => {
    formDataPayload.append("images", file);
  });

  try {
    if (!formDataPayload) return;
    const res = await api.post<ApiResponse<string>>(
      `${ApiEndPoint.PRODUCT}`,
      formDataPayload
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }

    toast.error(res?.data?.message ?? "lỗi không thể thêm sản phẩm này được ");
    return Promise.reject(new Error("lỗi không thể thêm sản phẩm này được"));
  } catch (e) {
    toast.error("lỗi không thể thêm sản phẩm này được");

    return Promise.reject(e);
  }
}

export async function updateProduct(
  formData: ProductFormData,
  files: File[] = [],
  id: number
) {
  if (!id) return Promise.reject(new Error("Không có id sản phẩm"));
  const formDataPayload = new FormData();
  formDataPayload.append("product", JSON.stringify(formData));

  files.forEach((file) => {
    formDataPayload.append("images", file);
  });

  try {
    if (!formDataPayload) return;
    const res = await api.put<ApiResponse<string>>(
      `${ApiEndPoint.PRODUCT}/${id}`,
      formDataPayload
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }

    toast.error(res?.data?.message ?? "lỗi không thể thêm sản phẩm này được ");
    return Promise.reject(new Error("lỗi không thể thêm sản phẩm này được"));
  } catch (e) {
    toast.error("lỗi không thể thêm sản phẩm này được");

    return Promise.reject(e);
  }
}