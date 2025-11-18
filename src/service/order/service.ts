import toast from "@/components/ui/use-toast";
import type { ApiResponse } from "@/types/response-api.type";
import ApiEndPoint from "../api";
import { api } from "../config-api";

export type OrderType = "SINGLE" | "GROUP";
export type PaymentMethod = "VNPAY" | "COD" | "MOMO";

export interface CheckoutPayload {
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  amount?: number;
  cartItems?: Array<{
    id: number;
    productId: number;
    quantity: number;
  }>;
  directItems?: Array<{
    productId: number;
    qty: number;
    unitPrice?: number;
  }>;
}

export interface CheckoutVNPayPayload extends CheckoutPayload {
  paymentMethod: Extract<PaymentMethod, "VNPAY">;
}

export async function checkoutWithVNPay(payload: CheckoutVNPayPayload) {
  try {
    const res = await api.post<ApiResponse<string>>(ApiEndPoint.ORDERS_CHECKOUT_VNPAY, payload);
    if (res?.data?.code === 200 && res.data.data) {
      return res.data.data;
    }
    toast.error("Không lấy được URL thanh toán VNPay");
    throw new Error("Missing payment URL");
  } catch (error) {
    toast.error("Không thể khởi tạo thanh toán VNPay");
    throw error;
  }
}

export async function verifyVNPayReturn(params: Record<string, string>) {
  try {
    const res = await api.get<ApiResponse<string>>(ApiEndPoint.ORDERS_VNPAY_RETURN, { params });
    return res.data;
  } catch (error) {
    toast.error("Không thể xác thực kết quả thanh toán");
    throw error;
  }
}

export async function checkoutWithCOD(payload: Omit<CheckoutPayload, "paymentMethod">) {
  try {
    const res = await api.post<ApiResponse<any>>(ApiEndPoint.ORDERS_CHECKOUT_VNPAY, {
      ...payload,
      paymentMethod: "COD",
    });
    if (res?.data?.code === 200) {
      return res.data.data;
    }
    toast.error("Không thể tạo đơn hàng COD");
    throw new Error("Failed to create COD order");
  } catch (error) {
    toast.error("Không thể tạo đơn hàng COD");
    throw error;
  }
}

