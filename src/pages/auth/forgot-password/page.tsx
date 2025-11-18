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
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackgroundAnimated from "@/components/common/auth/bg-animated";
import BackgroundBottomImg from "@/components/common/auth/bg-bottom-img";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/utils/validation/auth-schema";
import { z } from "zod";
import { useForgotPassword } from "@/hook/auth/use-auth";
import LoadingBtn from "@/components/common/loading-btn";

type FormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const navigator = useNavigate();
  const { handleForgotPass, isPending } = useForgotPassword();
  const onSubmit = (data: FormData) => {
    handleForgotPass(data);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-100 via-green-50 to-green-100">
      <BackgroundAnimated />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-6">
        <Card className="w-full max-w-lg  shadow-2xl border-2 border-[#74A031]/20 backdrop-blur-sm bg-white/95 animate-fade-in-up">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#74A031] to-[#5a8028] flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Lock className="text-white" size={40} />
            </div>
            <CardTitle className="text-3xl font-bold text-green-primary text-balance">
              Bạn quên mật khẩu ?
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground">
              Lấy lại mật khẩu để bắt đầu chuyến picnic tuyệt vời
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-3"
            >
              {/* Email */}
              <div className="space-y-2 col-span-2 ">
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

              <div className="flex flex-col gap-4 justify-center items-center col-span-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isPending && <LoadingBtn />}
                  <div className="flex items-center space-x-2">
                    <span>Lấy lại mật khẩu</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                  onClick={() => navigator("/login")}
                >
                  <div className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Quay lại đăng nhập</span>
                  </div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <BackgroundBottomImg />
    </div>
  );
}
