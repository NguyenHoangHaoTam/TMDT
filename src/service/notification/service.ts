import toast from "@/components/ui/use-toast";
import type { ApiResponse } from "@/types/response-api.type";
import NotificationEndPoint from "./endpoint";
import { api } from "../config-api";
import type {
  Notification,
  NotificationListResponse,
  AcceptInvitationRequest,
  RejectInvitationRequest,
} from "@/types/notification.type";

export async function getNotifications(): Promise<Notification[]> {
  try {
    const res = await api.get<ApiResponse<NotificationListResponse>>(
      NotificationEndPoint.LIST
    );
    if (res?.data?.code === 200) {
      return res.data.data?.notifications || [];
    }
    return [];
  } catch (error: any) {
    // Log chi tiết lỗi để debug
    if (error?.response?.status === 404) {
      console.warn("API notification chưa được implement trên backend:", NotificationEndPoint.LIST);
    } else {
      const message =
        error?.response?.data?.message || "Không thể lấy danh sách thông báo";
      console.error("Lỗi khi lấy thông báo:", {
        message,
        status: error?.response?.status,
        endpoint: NotificationEndPoint.LIST,
        error: error?.response?.data,
      });
    }
    return [];
  }
}

export async function getUnreadCount(): Promise<number> {
  try {
    const res = await api.get<ApiResponse<{ unreadCount: number }>>(
      NotificationEndPoint.UNREAD_COUNT
    );
    if (res?.data?.code === 200) {
      return res.data.data?.unreadCount || 0;
    }
    return 0;
  } catch (error: any) {
    // Không log lỗi 404 để tránh spam console khi backend chưa implement
    if (error?.response?.status !== 404) {
      console.error("Không thể lấy số lượng thông báo chưa đọc", {
        status: error?.response?.status,
        endpoint: NotificationEndPoint.UNREAD_COUNT,
        error: error?.response?.data,
      });
    }
    return 0;
  }
}

export async function markNotificationAsRead(
  id: number | string
): Promise<boolean> {
  try {
    const res = await api.put<ApiResponse<string>>(
      NotificationEndPoint.MARK_READ(id)
    );
    if (res?.data?.code === 200) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.error("Không thể đánh dấu đã đọc", error);
    return false;
  }
}

export async function markAllAsRead(): Promise<boolean> {
  try {
    const res = await api.put<ApiResponse<string>>(
      NotificationEndPoint.MARK_ALL_READ
    );
    if (res?.data?.code === 200) {
      toast.success("Đã đánh dấu tất cả là đã đọc");
      return true;
    }
    return false;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể đánh dấu tất cả là đã đọc";
    toast.error(message);
    return false;
  }
}

export async function acceptInvitation(
  payload: AcceptInvitationRequest
): Promise<boolean> {
  try {
    const res = await api.post<ApiResponse<string>>(
      NotificationEndPoint.ACCEPT_INVITATION,
      payload
    );
    if (res?.data?.code === 200) {
      toast.success("Đã chấp nhận lời mời tham gia giỏ hàng chung");
      return true;
    }
    toast.error("Không thể chấp nhận lời mời");
    return false;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể chấp nhận lời mời";
    toast.error(message);
    return false;
  }
}

export async function rejectInvitation(
  payload: RejectInvitationRequest
): Promise<boolean> {
  try {
    const res = await api.post<ApiResponse<string>>(
      NotificationEndPoint.REJECT_INVITATION,
      payload
    );
    if (res?.data?.code === 200) {
      toast.success("Đã từ chối lời mời");
      return true;
    }
    toast.error("Không thể từ chối lời mời");
    return false;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Không thể từ chối lời mời";
    toast.error(message);
    return false;
  }
}

export async function deleteNotification(
  id: number | string
): Promise<boolean> {
  try {
    const res = await api.delete<ApiResponse<string>>(
      NotificationEndPoint.DELETE(id)
    );
    if (res?.data?.code === 200) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.error("Không thể xóa thông báo", error);
    return false;
  }
}

