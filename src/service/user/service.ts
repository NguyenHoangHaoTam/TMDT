
import { api } from "@/service/config-api";
import UserEndPoint from "./endpoint";
import type { ApiResponse } from "@/types/response-api.type";
import toast from "@/components/ui/use-toast";

export async function getProfile() {
  try {
    const res = await api.get<ApiResponse<any>>(UserEndPoint.PROFILE);
    if (res.data.code === 200) return res.data.data;
    toast.error("Không thể lấy thông tin người dùng");
    return Promise.reject(new Error("Không thể lấy thông tin người dùng"));
  } catch (e) {
    console.error("getProfile error:", e);
    toast.error("Lỗi khi lấy thông tin người dùng");
    return Promise.reject(e);
  }
}

export async function changePassword(body: { oldPassword: string; newPassword: string }) {
  try {
    const res = await api.post<ApiResponse<any>>(UserEndPoint.CHANGE_PASSWORD, body);
    if (res.data.code === 200) {
      toast.success("Đổi mật khẩu thành công");
      return res.data.data;
    }
    toast.error("Đổi mật khẩu thất bại");
    return Promise.reject(new Error("Đổi mật khẩu thất bại"));
  } catch (e) {
    toast.error("Đổi mật khẩu thất bại");
    return Promise.reject(e);
  }
}

export async function getAddresses(userId?: number) {
  try {
    const url =
      userId != null
        ? `${UserEndPoint.ADDRESS_ALL}?userId=${encodeURIComponent(userId)}`
        : UserEndPoint.ADDRESS_ALL;
    const res = await api.get<ApiResponse<any>>(url);
    if (res.status >= 200 && res.status < 300) return (res.data as any)?.data ?? res.data;
    if ((res.data as any)?.code === 200) return (res.data as any).data;
    toast.error("Không thể lấy danh sách địa chỉ");
    return Promise.reject(new Error("Không thể lấy danh sách địa chỉ"));
  } catch (e) {
    toast.error("Lỗi khi tải danh sách địa chỉ");
    return Promise.reject(e);
  }
}

export async function addAddress(body: any, userId?: number) {
  try {
    const payload = {
      label: body.label, 
      recipientName: body.recipientName ?? body.fullName,
      phone: body.phone,
      province: body.province ?? body.city, 
      district: body.district,
      ward: body.ward,
      detail: body.detail ?? body.addressLine ?? body.fullAddress,
      isDefault: body.isDefault ?? false,
    };
    const url =
      userId != null
        ? `${UserEndPoint.ADDRESS_CREATE}?userId=${encodeURIComponent(userId)}`
        : UserEndPoint.ADDRESS_CREATE;
    const res = await api.post<ApiResponse<any>>(url, payload);
    if (res.status >= 200 && res.status < 300) {
      toast.success("Thêm địa chỉ thành công");
      return (res.data as any)?.data ?? res.data;
    }
    if ((res.data as any)?.code === 200 || (res.data as any)?.code === 201) {
      toast.success("Thêm địa chỉ thành công");
      return (res.data as any)?.data;
    }
    toast.error("Không thể thêm địa chỉ");
    return Promise.reject(new Error("Không thể thêm địa chỉ"));
  } catch (e) {
    toast.error("Thêm địa chỉ thất bại");
    return Promise.reject(e);
  }
}

export async function updateAddress(id: number, body: any) {
  try {
    const payload = {
      label: body.label, 
      recipientName: body.recipientName ?? body.fullName,
      phone: body.phone,
      province: body.province ?? body.city, 
      district: body.district,
      ward: body.ward,
      detail: body.detail ?? body.addressLine ?? body.fullAddress,
      isDefault: body.isDefault ?? false,
    };
    const res = await api.put<ApiResponse<any>>(UserEndPoint.ADDRESS_UPDATE(id), payload);
    if (res.status >= 200 && res.status < 300) {
      toast.success("Cập nhật địa chỉ thành công");
      return (res.data as any)?.data ?? res.data;
    }
    if ((res.data as any)?.code === 200) {
      toast.success("Cập nhật địa chỉ thành công");
      return (res.data as any)?.data;
    }
    toast.error("Không thể cập nhật địa chỉ");
    return Promise.reject(new Error("Không thể cập nhật địa chỉ"));
  } catch (e) {
    toast.error("Cập nhật địa chỉ thất bại");
    return Promise.reject(e);
  }
}

export async function deleteAddress(id: number) {
  try {
    const res = await api.delete<ApiResponse<any>>(UserEndPoint.ADDRESS_DELETE_BY_ID(id));
    if (res.status >= 200 && res.status < 300) {
      toast.success("Xóa địa chỉ thành công");
      return (res.data as any)?.data ?? res.data;
    }
    if ((res.data as any)?.code === 200) {
      toast.success("Xóa địa chỉ thành công");
      return (res.data as any)?.data;
    }
    toast.error("Không thể xoá địa chỉ");
    return Promise.reject(new Error("Không thể xoá địa chỉ"));
  } catch (e) {
    toast.error("Xoá địa chỉ thất bại");
    return Promise.reject(e);
  }
}

export async function setDefaultAddress(id: number) {
  try {
    const res = await api.patch<ApiResponse<any>>(UserEndPoint.ADDRESS_SET_DEFAULT(id), {});
    if (res.status >= 200 && res.status < 300) {
      toast.success("Đặt địa chỉ mặc định thành công");
      return (res.data as any)?.data ?? res.data;
    }
    if ((res.data as any)?.code === 200) {
      toast.success("Đặt địa chỉ mặc định thành công");
      return (res.data as any)?.data;
    }
    toast.error("Không thể đặt mặc định");
    return Promise.reject(new Error("Không thể đặt mặc định"));
  } catch (e) {
    toast.error("Đặt mặc định thất bại");
    return Promise.reject(e);
  }
}

