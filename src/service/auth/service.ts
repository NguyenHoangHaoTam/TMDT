import type {
  ResponseLogin,
  ResponseRegister,
  TPayLoadLogin,
  TPayLoadRegister,
} from "@/types/auth.type";
import type { ApiResponse } from "@/types/response-api.type";
import toast from "@/components/ui/use-toast";
import { publicApi } from "../config-api";
import ApiEndPoint from "../api";

export async function Login({ username, password }: TPayLoadLogin) {
  try {
    if (!username || !password) {
      toast.error("Login missing information");
      return Promise.reject(new Error("Login missing information"));
    }

    const body = {
      username: username,
      password: password,
    };

    const res = await publicApi.post<ApiResponse<ResponseLogin>>(
      `${ApiEndPoint.LOGIN}`,
      body,
      {
        withCredentials: true,
      }
    );

    if (res?.data?.code === 200) {
      return res.data.data;
    }

    toast.error("Error: Login error");
    return Promise.reject(new Error("Error: Login error"));
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function register(body: TPayLoadRegister) {
  try {
    if (!body) {
      toast.error("REGISTER missing information");
      return Promise.reject(new Error("REGISTER missing information"));
    }

    if (body.password !== body.rePassword) {
      toast.error("Mật khẩu nhập lại không khớp");
      return Promise.reject(new Error("Mật khẩu nhập lại không khớp"));
    }

    const res = await publicApi.post<ApiResponse<ResponseRegister>>(
      `${ApiEndPoint.REGISTER}`,
      body,
      {
        withCredentials: true,
      }
    );

    if (res?.data?.code === 200) {
      toast.success("Đăng ký thành công");
      return res.data.data;
    }

    toast.error("đăng ký thất bại");
    return Promise.reject(new Error("đăng ký thất bại"));
  } catch (e) {
    toast.error("Đăng ký thất bại");

    return Promise.reject(e);
  }
}

export async function forgotPassword({ email }: { email?: string }) {
  try {
    if (!email) {
      toast.error("Chưa nhập email");
      return Promise.reject(new Error("Lỗi chưa nhaaoj email"));
    }
    const res = await publicApi.post<ApiResponse<ResponseRegister>>(
      `${ApiEndPoint.FORGOT_PASSWORD}`,
      email
    );
    if (res?.data?.code === 200) {
      toast.success("Gửi email thành công");
      return res.data.data;
    }

    toast.error("lỗi ");
    return Promise.reject(new Error("lỗi"));
  } catch (e) {
    toast.error("thất bại");

    return Promise.reject(e);
  }
}
