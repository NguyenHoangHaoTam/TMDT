import toast from "@/components/ui/use-toast";
import type { ApiResponse } from "@/types/response-api.type";
import ApiEndPoint from "../api";
import { api } from "../config-api";
import type { AddToCartPayload, TCart } from "@/types/cart";

const isCartMissingError = (error: unknown) => {
  const message =
    (error as any)?.response?.data?.message ??
    (error as any)?.message ??
    "";
  return typeof message === "string" && /cart not found/i.test(message);
};

export async function fetchCart() {
  try {
    const res = await api.get<ApiResponse<TCart>>(ApiEndPoint.CART);
    if (res?.data?.code === 200) {
      return res.data.data;
    }
    return null;
  } catch (error: any) {
    if (error?.response?.status === 404 || isCartMissingError(error)) {
      return null;
    }
    throw error;
  }
}

export async function addItemToCart(payload: AddToCartPayload) {
  try {
    const res = await api.post<ApiResponse<TCart>>(ApiEndPoint.CART_ADD, payload);
    if (res?.data?.code === 200) {
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
      return res.data.data;
    }
    toast.error("Không thể thêm sản phẩm vào giỏ hàng");
    throw new Error("Add to cart failed");
  } catch (error: any) {
    if (isCartMissingError(error)) {
      toast.error("Giỏ hàng chưa được tạo. Vui lòng thử lại.");
    } else {
      const message =
        error?.response?.data?.message || "Không thể thêm sản phẩm vào giỏ hàng";
      toast.error(message);
    }
    throw error;
  }
}

export async function removeItemFromCart(productId: number) {
  try {
    await api.delete<ApiResponse<string>>(ApiEndPoint.CART_REMOVE(productId));
  } catch (error) {
    toast.error("Không thể xóa sản phẩm khỏi giỏ hàng");
    throw error;
  }
}

export async function clearCartItems() {
  try {
    await api.delete<ApiResponse<string>>(ApiEndPoint.CART_CLEAR);
  } catch (error) {
    toast.error("Không thể xóa giỏ hàng");
    throw error;
  }
}

