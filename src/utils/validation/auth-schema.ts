import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("Tên đăng nhập được để trống"),
  password: z.string().min(6, "mật khẩu ít nhất 6 ký tự"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .nonempty("Tên đăng nhập không được để trống")
    .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự"),

  email: z
    .string()
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),

  password: z
    .string()
    .nonempty("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),

  rePassword: z
    .string()
    .nonempty("Mật khẩu nhập lại không được để trống")
    .min(6, "Mật khẩu nhập lại phải có ít nhất 6 ký tự"),

  fullName: z
    .string()
    .nonempty("Họ và tên không được để trống")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự"),

  phone: z
    .string()
    .nonempty("Số điện thoại không được để trống")
    .regex(/^(0|\+84)(\d{9})$/, "Số điện thoại không hợp lệ"),
});
