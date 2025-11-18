import toast from "@/components/ui/use-toast";
import { publicApi } from "../config-api";
import type { ApiResponse } from "@/types/response-api.type";
import type { TCategory } from "@/types/category.type";

export async function getAllCategories() {
  try {
    const res = await publicApi.get<ApiResponse<TCategory[]>>(
      "api/categories"
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }

    toast.error("Lỗi không thể lấy danh sách danh mục");
    return Promise.reject(new Error("Lỗi không thể lấy danh sách danh mục"));
  } catch (e) {
    toast.error("Lỗi không thể lấy danh sách danh mục");
    return Promise.reject(e);
  }
}

