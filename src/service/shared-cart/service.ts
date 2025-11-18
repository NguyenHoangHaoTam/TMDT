import toast from "@/components/ui/use-toast";
import type { ApiResponse } from "@/types/response-api.type";
import SharedCartEndPoint from "./endpoint";
import { api } from "../config-api";
import type {
  SharedCartCreateRequest,
  SharedCartAddItemRequest,
  SharedCartUpdateQuantityRequest,
  SharedCartRemoveItemRequest,
  SharedCartInviteRequest,
  SharedCartUpdateContributionRequest,
  SharedCartUpdateInfoRequest,
  SharedCartCheckoutRequest,
  SharedCartDetail,
  SharedCartListItem,
  SharedCartCreateResponse,
  SharedCartAddItemResponse,
  SharedCartInviteResponse,
  SharedCartCloseResponse,
} from "@/types/shared-cart.type";

// Note: Backend tự động lấy ownerId và userId từ JWT token
// Nên frontend không cần gửi các field này trong một số request

// ====== CREATE & MANAGE ======
export async function createSharedCart(
  payload: Omit<SharedCartCreateRequest, "ownerId">
): Promise<SharedCartCreateResponse | null> {
  try {
    // Backend tự động lấy ownerId từ JWT token
    const res = await api.post<ApiResponse<SharedCartCreateResponse>>(
      SharedCartEndPoint.CREATE,
      payload
    );
    if (res?.data?.code === 200) {
      toast.success("Tạo giỏ hàng chung thành công");
      return res.data.data;
    }
    toast.error("Không thể tạo giỏ hàng chung");
    return null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể tạo giỏ hàng chung";
    toast.error(message);
    throw error;
  }
}

export async function getSharedCartList(): Promise<SharedCartListItem[]> {
  try {
    const res = await api.get<ApiResponse<SharedCartListItem[]>>(
      SharedCartEndPoint.LIST
    );
    if (res?.data?.code === 200) {
      return res.data.data || [];
    }
    return [];
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể lấy danh sách giỏ hàng";
    toast.error(message);
    return [];
  }
}

export async function getSharedCartDetail(
  id: number | string
): Promise<SharedCartDetail | null> {
  try {
    const res = await api.get<ApiResponse<SharedCartDetail>>(
      SharedCartEndPoint.DETAIL(id)
    );
    if (res?.data?.code === 200) {
      return res.data.data;
    }
    return null;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      toast.error("Không tìm thấy giỏ hàng chung");
      return null;
    }
    const message =
      error?.response?.data?.message || "Không thể lấy chi tiết giỏ hàng";
    toast.error(message);
    throw error;
  }
}

export async function updateSharedCartInfo(
  payload: SharedCartUpdateInfoRequest
): Promise<SharedCartCreateResponse | null> {
  try {
    const res = await api.put<ApiResponse<SharedCartCreateResponse>>(
      SharedCartEndPoint.UPDATE(payload.sharedCartId),
      {
        title: payload.title,
        expiresAt: payload.expiresAt,
      }
    );
    if (res?.data?.code === 200) {
      toast.success("Cập nhật thông tin giỏ hàng thành công");
      return res.data.data;
    }
    toast.error("Không thể cập nhật thông tin giỏ hàng");
    return null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể cập nhật thông tin giỏ hàng";
    toast.error(message);
    throw error;
  }
}

export async function closeSharedCart(
  id: number | string
): Promise<SharedCartCloseResponse | null> {
  try {
    const res = await api.put<ApiResponse<SharedCartCreateResponse>>(
      SharedCartEndPoint.CLOSE(id)
    );
    if (res?.data?.code === 200) {
      toast.success("Đóng giỏ hàng chung thành công");
      const data = res.data.data;
      return {
        id: data.id,
        title: data.title,
        status: data.status,
        message: res.data.message,
      };
    }
    toast.error("Không thể đóng giỏ hàng chung");
    return null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể đóng giỏ hàng chung";
    toast.error(message);
    throw error;
  }
}

export async function cancelSharedCart(
  id: number | string
): Promise<SharedCartCloseResponse | null> {
  try {
    const res = await api.put<ApiResponse<SharedCartCreateResponse>>(
      SharedCartEndPoint.CANCEL(id)
    );
    if (res?.data?.code === 200) {
      toast.success("Hủy giỏ hàng chung thành công");
      const data = res.data.data;
      return {
        id: data.id,
        title: data.title,
        status: data.status,
        message: res.data.message,
      };
    }
    toast.error("Không thể hủy giỏ hàng chung");
    return null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể hủy giỏ hàng chung";
    toast.error(message);
    throw error;
  }
}

// ====== ITEM MANAGEMENT ======
export async function addItemToSharedCart(
  payload: Omit<SharedCartAddItemRequest, "addByUserId">
): Promise<SharedCartAddItemResponse | null> {
  try {
    // Backend tự động lấy addByUserId từ JWT token
    const res = await api.post<ApiResponse<SharedCartAddItemResponse>>(
      SharedCartEndPoint.ADD_ITEM,
      payload
    );
    if (res?.data?.code === 200) {
      toast.success("Thêm sản phẩm vào giỏ hàng chung thành công");
      return res.data.data;
    }
    toast.error("Không thể thêm sản phẩm vào giỏ hàng chung");
    return null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Không thể thêm sản phẩm vào giỏ hàng chung";
    toast.error(message);
    throw error;
  }
}

export async function updateSharedCartItemQuantity(
  payload: SharedCartUpdateQuantityRequest
): Promise<SharedCartAddItemResponse | null> {
  try {
    const res = await api.put<ApiResponse<SharedCartAddItemResponse>>(
      SharedCartEndPoint.UPDATE_QUANTITY,
      payload
    );
    if (res?.data?.code === 200) {
      toast.success("Cập nhật số lượng thành công");
      return res.data.data;
    }
    toast.error("Không thể cập nhật số lượng");
    return null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể cập nhật số lượng";
    toast.error(message);
    throw error;
  }
}

export async function removeItemFromSharedCart(
  payload: SharedCartRemoveItemRequest
): Promise<boolean> {
  try {
    const res = await api.delete<ApiResponse<string>>(
      SharedCartEndPoint.REMOVE_ITEM,
      { data: payload }
    );
    if (res?.data?.code === 200) {
      toast.success("Xóa sản phẩm khỏi giỏ hàng chung thành công");
      return true;
    }
    toast.error("Không thể xóa sản phẩm");
    return false;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể xóa sản phẩm";
    toast.error(message);
    throw error;
  }
}

// ====== PARTICIPANT MANAGEMENT ======
export async function inviteToSharedCart(
  payload: SharedCartInviteRequest
): Promise<SharedCartInviteResponse[]> {
  try {
    const res = await api.post<ApiResponse<SharedCartInviteResponse[]>>(
      SharedCartEndPoint.INVITE,
      payload
    );
    if (res?.data?.code === 200) {
      toast.success("Đã gửi lời mời thành công. Người được mời cần chấp nhận để tham gia.");
      return res.data.data || [];
    }
    toast.error("Không thể mời người dùng");
    return [];
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể mời người dùng";
    toast.error(message);
    throw error;
  }
}

export async function updateParticipantContribution(
  payload: SharedCartUpdateContributionRequest
): Promise<SharedCartInviteResponse | null> {
  try {
    const res = await api.put<ApiResponse<SharedCartInviteResponse>>(
      SharedCartEndPoint.UPDATE_CONTRIBUTION,
      payload
    );
    if (res?.data?.code === 200) {
      toast.success("Cập nhật đóng góp thành công");
      return res.data.data;
    }
    toast.error("Không thể cập nhật đóng góp");
    return null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể cập nhật đóng góp";
    toast.error(message);
    throw error;
  }
}

export async function leaveSharedCart(
  id: number | string
): Promise<boolean> {
  try {
    const res = await api.delete<ApiResponse<string>>(
      SharedCartEndPoint.LEAVE(id)
    );
    if (res?.data?.code === 200) {
      toast.success("Rời khỏi giỏ hàng chung thành công");
      return true;
    }
    toast.error("Không thể rời khỏi giỏ hàng chung");
    return false;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể rời khỏi giỏ hàng chung";
    toast.error(message);
    throw error;
  }
}

export async function removeParticipant(
  cartId: number | string,
  participantUserId: number | string
): Promise<boolean> {
  try {
    const res = await api.delete<ApiResponse<string>>(
      SharedCartEndPoint.REMOVE_PARTICIPANT(cartId, participantUserId)
    );
    if (res?.data?.code === 200) {
      toast.success("Xóa người tham gia thành công");
      return true;
    }
    toast.error("Không thể xóa người tham gia");
    return false;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể xóa người tham gia";
    toast.error(message);
    throw error;
  }
}

// ====== CHECKOUT ======
export async function checkoutSharedCart(
  payload: SharedCartCheckoutRequest
): Promise<string | null> {
  try {
    const res = await api.post<ApiResponse<string>>(
      SharedCartEndPoint.CHECKOUT,
      payload
    );
    if (res?.data?.code === 200) {
      const paymentUrl = res.data.data;
      
      // Nếu là COD, paymentUrl sẽ là "success"
      if (paymentUrl === "success" || !paymentUrl) {
        toast.success(res.data.message || "Thanh toán thành công! Đơn hàng đã được tạo.");
        return null;
      }
      
      // Nếu là VNPay, trả về payment URL
      toast.success(res.data.message || "Tạo đơn hàng thành công. Chuyển hướng đến VNPay để thanh toán.");
      return paymentUrl;
    }
    toast.error("Không thể thanh toán giỏ hàng chung");
    return null;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể thanh toán giỏ hàng chung";
    toast.error(message);
    throw error;
  }
}

