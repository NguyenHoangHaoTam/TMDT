import toast from "@/components/ui/use-toast";
import { publicApi } from "../config-api";
import type { ApiResponse } from "@/types/response-api.type";
import ApiEndPoint from "../api";
import type { TProductDetail } from "@/types/home.type";

export async function getFeatured() {
  try {
    const res = await publicApi.get<ApiResponse<TProductDetail[]>>(
      `${ApiEndPoint.PRODUCT_FEATURED}`
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }

    toast.error("lỗi không thể lấy danh sách nổi bật ");
    return Promise.reject(new Error("lỗi không thể lấy danh sách nổi bật"));
  } catch (e) {
    toast.error("lỗi không thể lấy danh sách nổi bật");

    return Promise.reject(e);
  }
}

export async function getProductTab(filter: string) {
  try {
    const res = await publicApi.get<ApiResponse<TProductDetail[]>>(
      `${ApiEndPoint.PRODUCT_TAB}?filter=${filter}`
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }

    toast.error("lỗi không thể lấy danh sách mới nhất ");
    return Promise.reject(new Error("lỗi không thể lấy danh sách mới nhất"));
  } catch (e) {
    toast.error("lỗi không thể lấy danh sách mới nhất");

    return Promise.reject(e);
  }
}

export async function getProductByCategoryId(id: string) {
  if (!id) {
    return [];
  }
  try {
    const res = await publicApi.get<ApiResponse<{ content: TProductDetail[] }>>(
      `${ApiEndPoint.PRODUCT_BY_CATEGORY_BY_ID}/${encodeURIComponent(id)}`
    );
    if (res?.data?.code === 200) {
      const payload = res.data?.data;
      const content =
        (payload as { content?: TProductDetail[] })?.content ??
        (Array.isArray(payload) ? payload : undefined);
      return Array.isArray(content) ? content : [];
    }
    if (res?.data?.code === 204) {
      return [];
    }
    throw new Error("Non-200 response code");
  } catch (e: any) {
    const status = e?.response?.status;
    const code =
      e?.response?.data?.code ?? e?.response?.data?.status ?? e?.response?.status;

    const message: string | undefined =
      e?.response?.data?.message ?? e?.message;

    if (
      status === 204 ||
      status === 404 ||
      status === 400 ||
      code === 204 ||
      code === 404 ||
      code === 400 ||
      message?.toLowerCase().includes("no products found")
    ) {
      return [];
    }

    toast.error("lỗi không thể lấy danh sách sản phẩm theo id ");
    return Promise.reject(e);
  }
}

export async function getProductDetail(idOrSlug: string) {
  try {
    const res = await publicApi.get<ApiResponse<TProductDetail>>(
      `api/products/detail/${idOrSlug}`
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }
    toast.error("Lỗi không thể lấy chi tiết sản phẩm");
    return Promise.reject(new Error("Lỗi không thể lấy chi tiết sản phẩm"));
  } catch (e) {
    toast.error("Lỗi không thể lấy chi tiết sản phẩm");
    return Promise.reject(e);
  }
}
