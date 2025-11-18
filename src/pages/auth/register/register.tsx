"use client";

// import type React from "react";
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundAnimated from "@/components/common/auth/bg-animated";
import BackgroundBottomImg from "@/components/common/auth/bg-bottom-img";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/validation/auth-schema";
import { z } from "zod";
import { useRegister } from "@/hook/auth/use-auth";
import LoadingBtn from "@/components/common/loading-btn";

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const { handleRegister, isPending } = useRegister();

  const onSubmit = (data: FormData) => {
    handleRegister(data);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-100 via-green-50 to-green-100">
      <BackgroundAnimated />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-6">
        <Card className="w-full max-w-2xl  shadow-2xl border-2 border-[#74A031]/20 backdrop-blur-sm bg-white/95 animate-fade-in-up">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#74A031] to-[#5a8028] flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <User className="text-white" size={40} />
            </div>
            <CardTitle className="text-3xl font-bold text-green-primary text-balance">
              Tham gia cùng chúng tôi
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Tạo tài khoản để bắt đầu chuyến picnic tuyệt vời
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-3"
            >
              {/* Họ và tên */}
              <div className="space-y-2 col-span-1">
                <Label
                  htmlFor="fullName"
                  className="text-foreground font-medium"
                >
                  Họ và tên
                </Label>
                <Input
                  {...register("fullName")}
                  id="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  required
                  className="h-11 border-2 border-input focus:border-[#74A031] transition-colors duration-300"
                />
                {errors.fullName && (
                  <p className="px-1 text-sm text-red-600 ">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Tên đăng nhập */}
              <div className="space-y-2 col-span-1">
                <Label
                  htmlFor="username"
                  className="text-foreground font-medium"
                >
                  Tên đăng nhập
                </Label>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="vinhnguyen"
                  required
                  className="h-11 border-2 border-input focus:border-[#74A031] transition-colors duration-300"
                />

                {errors.username && (
                  <p className="px-1 text-sm text-red-600 ">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="h-11 border-2 border-input focus:border-[#74A031] transition-colors duration-300"
                />
                {errors.email && (
                  <p className="px-1 text-sm text-red-600 ">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Số điện thoại */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Số điện thoại
                </Label>
                <Input
                  {...register("phone")}
                  id="phone"
                  type="tel"
                  placeholder="0123456789"
                  required
                  className="h-11 border-2 border-input focus:border-[#74A031] transition-colors duration-300"
                />

                {errors.phone && (
                  <p className="px-1 text-sm text-red-600 ">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Mật khẩu */}
              <div className="space-y-2 col-span-1">
                <Label
                  htmlFor="password"
                  className="text-foreground font-medium"
                >
                  Mật khẩu
                </Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="h-11 border-2 border-input focus:border-[#74A031] transition-colors duration-300"
                />

                {errors.password && (
                  <p className="px-1 text-sm text-red-600 ">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 col-span-1">
                <Label
                  htmlFor="rePassword"
                  className="text-foreground font-medium"
                >
                  Nhập lại mật khẩu
                </Label>
                <Input
                  {...register("rePassword")}
                  id="rePassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="h-11 border-2 border-input focus:border-[#74A031] transition-colors duration-300"
                />
                {errors.rePassword && (
                  <p className="px-1 text-sm text-red-600 ">
                    {errors.rePassword.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <div className="flex items-start gap-2 text-sm  ">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-0.5 rounded border-2 border-input accent-[#74A031] cursor-pointer"
                  />
                  <span className="text-muted-foreground leading-relaxed">
                    Tôi đồng ý với{" "}
                    <a
                      href="#"
                      className="text-green-primary hover:text-[#5a8028] font-medium transition-colors"
                    >
                      Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a
                      href="#"
                      className="text-green-primary hover:text-[#5a8028] font-medium transition-colors"
                    >
                      Chính sách bảo mật
                    </a>
                  </span>
                </div>

                <div className="flex justify-center items-center">
                  <Button
                    type="submit"
                    className=" my-2 w-1/2  h-12 bg-[#74A031] hover:bg-[#5a8028] text-white font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    {isPending && <LoadingBtn />}
                    Đăng ký
                  </Button>
                </div>
              </div>
            </form>

            {/* Điều khoản */}

            <div className="flex gap-3 flex-col justify-center">
              {/* Đã có tài khoản */}
              <div className="text-center text-sm text-muted-foreground ">
                Đã có tài khoản?{" "}
                <Link
                  to="/"
                  className="text-green-primary hover:text-[#5a8028] font-semibold transition-colors"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BackgroundBottomImg />
    </div>
  );
}
