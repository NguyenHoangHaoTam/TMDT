import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyVNPayReturn } from "@/service/order/service";
import { useCartStore } from "@/store/use-cart.store";

const formatCurrency = (value?: number) =>
  (value ?? 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

type PaymentStatus = "pending" | "success" | "failed" | "error";

const VNPayReturnPage = () => {
  const [searchParams] = useSearchParams();
  const fetchCart = useCartStore((state) => state.fetchCart);
  const finalizeCartAfterCheckout = useCartStore((state) => state.finalizeCartAfterCheckout);
  const [status, setStatus] = useState<PaymentStatus>("pending");
  const [message, setMessage] = useState("Đang xác thực giao dịch với VNPay...");

  const summary = useMemo(() => {
    const txnRef = searchParams.get("vnp_TxnRef") ?? "-";
    const amount = searchParams.get("vnp_Amount");
    const bankCode = searchParams.get("vnp_BankCode") ?? "-";
    const payDate = searchParams.get("vnp_PayDate");
    const responseCode = searchParams.get("vnp_ResponseCode") ?? "-";

    return {
      txnRef,
      amount: amount ? Number(amount) / 100 : null,
      bankCode,
      payDate,
      responseCode,
    };
  }, [searchParams]);

  useEffect(() => {
    const paramsObj = Object.fromEntries(searchParams.entries());
    if (Object.keys(paramsObj).length === 0) {
      setStatus("error");
      setMessage("Thiếu tham số xác thực từ VNPay.");
      return;
    }

    let cancelled = false;
    async function run() {
      try {
        const res = await verifyVNPayReturn(paramsObj);
        if (cancelled) return;
        if (res.code === 200 && res.data === "success") {
          setStatus("success");
          setMessage(res.message || "Thanh toán thành công.");
          await finalizeCartAfterCheckout();
          fetchCart().catch(() => undefined);
        } else {
          setStatus("failed");
          setMessage(res.message || "Thanh toán thất bại hoặc đã bị hủy.");
        }
      } catch (error: any) {
        if (cancelled) return;
        const fallback =
          error?.response?.data?.message ?? "Không thể xác thực kết quả thanh toán. Vui lòng thử lại.";
        setStatus("error");
        setMessage(fallback);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [fetchCart, finalizeCartAfterCheckout, searchParams]);

  const renderIcon = () => {
    if (status === "pending") {
      return <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />;
    }
    if (status === "success") {
      return <CheckCircle className="h-12 w-12 text-emerald-600" />;
    }
    return <XCircle className="h-12 w-12 text-red-500" />;
  };

  return (
    <div className="pb-16">
      <section
        className="relative h-48 w-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <p className="text-sm uppercase tracking-wide">Thanh toán</p>
          <h1 className="text-4xl font-bold mt-2">Kết quả giao dịch VNPay</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-10">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border p-8 space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {renderIcon()}
            <h2 className="text-2xl font-semibold text-gray-900">
              {status === "success"
                ? "Thanh toán thành công"
                : status === "pending"
                  ? "Đang xác thực giao dịch"
                  : "Thanh toán chưa hoàn tất"}
            </h2>
            <p className="text-gray-600">{message}</p>
          </div>

          <div className="rounded-2xl border bg-gray-50/80 p-5 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Mã đơn hàng</span>
              <span className="font-semibold text-gray-900">#{summary.txnRef}</span>
            </div>
            <div className="flex justify-between">
              <span>Số tiền</span>
              <span className="font-semibold text-gray-900">{formatCurrency(summary.amount ?? undefined)}</span>
            </div>
            <div className="flex justify-between">
              <span>Ngân hàng</span>
              <span className="font-semibold text-gray-900">{summary.bankCode}</span>
            </div>
            <div className="flex justify-between">
              <span>Thời gian</span>
              <span className="font-semibold text-gray-900">
                {summary.payDate
                  ? `${summary.payDate.slice(0, 4)}-${summary.payDate.slice(4, 6)}-${summary.payDate.slice(6, 8)} ${summary.payDate.slice(8, 10)}:${summary.payDate.slice(10, 12)}:${summary.payDate.slice(12, 14)}`
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mã phản hồi</span>
              <span className="font-semibold text-gray-900">{summary.responseCode}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="outline">
              <Link to="/cart">Quay lại giỏ hàng</Link>
            </Button>
            <Button asChild>
              <Link to="/">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VNPayReturnPage;

