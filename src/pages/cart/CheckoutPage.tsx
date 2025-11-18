import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import CheckoutProgress from "@/components/common/cart/checkout-progress";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart.store";
import { getAddresses } from "@/service/user/service";
import { Progress } from "@/components/ui/progress";
import toast from "@/components/ui/use-toast";
import { checkoutWithVNPay, checkoutWithCOD } from "@/service/order/service";

const formatCurrency = (value?: number) =>
  (value ?? 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const CheckoutPage = () => {
  const { cart, fetchCart, isLoading } = useCartStore();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"cod" | "vnpay">("vnpay");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    fetchCart().catch(() => undefined);
  }, [fetchCart]);

  useEffect(() => {
    let mounted = true;
    async function loadAddresses() {
      setIsAddressLoading(true);
      setAddressError(null);
      try {
        const list = await getAddresses();
        if (!mounted) return;
        setAddresses(Array.isArray(list) ? list : list ? [list] : []);
      } catch {
        if (!mounted) return;
        setAddressError("Không thể tải địa chỉ. Vui lòng thử lại hoặc cập nhật thông tin.");
      } finally {
        if (mounted) setIsAddressLoading(false);
      }
    }
    loadAddresses();
    return () => {
      mounted = false;
    };
  }, []);

  const defaultAddress = useMemo(
    () => addresses.find((addr) => addr.isDefault) ?? addresses[0] ?? null,
    [addresses]
  );

  const hasItems = (cart?.items?.length ?? 0) > 0;
  const subtotal = cart?.totalAmount ?? 0;
  const totalQuantity = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  const manageAddressLink = `/account/addresses?redirect=${encodeURIComponent("/checkout")}`;

  const paymentOptions: Array<{
    id: "cod" | "vnpay";
    label: string;
    desc: string;
    disabled?: boolean;
    helper?: string;
  }> = [
    {
      id: "cod",
      label: "Thanh toán khi nhận hàng (COD)",
      desc: "Thanh toán trực tiếp cho shipper khi nhận hàng.",
    },
    {
      id: "vnpay",
      label: "VNPay - Thẻ nội địa/QR",
      desc: "Thanh toán an toàn qua cổng VNPay. Chúng tôi sẽ chuyển bạn sang VNPay để hoàn tất.",
    },
  ];

  const canCheckout = hasItems && !isLoading && defaultAddress;
  const canCheckoutWithVNPay = selectedPaymentMethod === "vnpay" && canCheckout;
  const canCheckoutWithCOD = selectedPaymentMethod === "cod" && canCheckout;

  const handleVNPayCheckout = async () => {
    if (!canCheckoutWithVNPay || !cart?.items?.length) {
      toast.error("Giỏ hàng của bạn đang trống.");
      return;
    }

    const directItems = cart.items.map((item) => ({
      productId: item.productId,
      qty: item.quantity,
      unitPrice: item.price,
    }));

    setCheckoutError(null);
    setIsSubmittingOrder(true);

    try {
      const paymentUrl = await checkoutWithVNPay({
        orderType: "SINGLE",
        paymentMethod: "VNPAY",
        directItems,
        amount: subtotal,
      });
      window.location.href = paymentUrl;
    } catch (error: any) {
      console.error("checkout-vnpay", error);
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể khởi tạo thanh toán. Vui lòng thử lại.";
      setCheckoutError(message);
      toast.error(message);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const handleCODCheckout = async () => {
    if (!canCheckoutWithCOD || !cart?.items?.length) {
      toast.error("Giỏ hàng của bạn đang trống.");
      return;
    }

    const directItems = cart.items.map((item) => ({
      productId: item.productId,
      qty: item.quantity,
      unitPrice: item.price,
    }));

    setCheckoutError(null);
    setIsSubmittingOrder(true);

    try {
      await checkoutWithCOD({
        orderType: "SINGLE",
        directItems,
        amount: subtotal,
      });
      toast.success("Đơn hàng COD đã được tạo thành công!");
      // Clear cart after successful COD order
      const { finalizeCartAfterCheckout } = useCartStore.getState();
      await finalizeCartAfterCheckout();
      // Navigate to home or order confirmation
      window.location.href = "/";
    } catch (error: any) {
      console.error("checkout-cod", error);
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể tạo đơn hàng COD. Vui lòng thử lại.";
      setCheckoutError(message);
      toast.error(message);
    } finally {
      setIsSubmittingOrder(false);
    }
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
          <h1 className="text-4xl font-bold mt-2">ĐẶT HÀNG</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-10 space-y-6">
        <CheckoutProgress currentStep="checkout" />

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase font-semibold text-emerald-600 tracking-wide">Bước 1</p>
                  <h2 className="text-2xl font-semibold text-gray-900 mt-1">Thông tin nhận hàng</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Sử dụng địa chỉ mặc định để giao hàng. Bạn có thể thay đổi bất kỳ lúc nào.
                  </p>
                </div>
                <Button asChild variant="outline" className="rounded-full text-sm">
                  <Link to={manageAddressLink}>Cập nhật địa chỉ</Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-5">
                {isAddressLoading && (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-1/3 rounded bg-gray-200" />
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                  </div>
                )}

                {!isAddressLoading && addressError && (
                  <p className="text-sm text-red-600">{addressError}</p>
                )}

                {!isAddressLoading && !addressError && defaultAddress && (
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <span>{defaultAddress.recipientName || defaultAddress.fullName || "Người nhận"}</span>
                      {defaultAddress.isDefault && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <p>📞 {defaultAddress.phone || defaultAddress.phoneNumber || "Chưa cập nhật"}</p>
                    <p>
                      📍{" "}
                      {defaultAddress.detail ||
                        defaultAddress.addressLine ||
                        defaultAddress.fullAddress ||
                        "Không có địa chỉ chi tiết"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {[defaultAddress.ward, defaultAddress.district, defaultAddress.city, defaultAddress.province]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                )}

                {!isAddressLoading && !addressError && !defaultAddress && (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-gray-600">Bạn chưa có địa chỉ giao hàng mặc định.</p>
                    <Button asChild className="rounded-full bg-emerald-600 hover:bg-emerald-700">
                      <Link to={manageAddressLink}>Thêm địa chỉ ngay</Link>
                    </Button>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-semibold text-emerald-600 tracking-wide">Bước 2</p>
                  <h2 className="text-2xl font-semibold text-gray-900 mt-1">Sản phẩm</h2>
                </div>
                <Button asChild variant="ghost" className="text-sm text-orange-600">
                  <Link to="/cart">Quay lại giỏ hàng</Link>
                </Button>
              </div>

              {!hasItems && (
                <div className="text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 p-8">
                  <p className="text-gray-700 font-medium">Giỏ hàng của bạn đang trống.</p>
                  <p className="text-sm text-gray-500 mt-1">Hãy thêm sản phẩm để tiếp tục thanh toán.</p>
                  <Button asChild className="mt-4 rounded-full bg-orange-500 hover:bg-orange-600">
                    <Link to="/">Tiếp tục mua sắm</Link>
                  </Button>
                </div>
              )}

              {hasItems && (
                <div className="space-y-4">
                  <ul className="divide-y rounded-2xl border border-gray-100">
                    {cart!.items.map((item) => (
                      <li key={item.productId} className="p-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex flex-1 items-center gap-4">
                          <img
                            src={item.productImageUrl || "/src/assets/img/img-placeholder.png"}
                            alt={item.productName}
                            className="h-20 w-20 rounded-xl object-cover bg-gray-100"
                          />
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900">{item.productName}</p>
                            <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Tạm tính</p>
                          <p className="text-lg font-semibold text-green-600">{formatCurrency(item.subtotal)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
              <div>
                <p className="text-xs uppercase font-semibold text-emerald-600 tracking-wide">Bước 3</p>
                <h2 className="text-2xl font-semibold text-gray-900 mt-1">Hình thức thanh toán</h2>
                <p className="text-sm text-gray-500 mt-1">
                  VNPay đã sẵn sàng. Các phương thức khác sẽ được bổ sung sau khi hoàn tất cấu hình.
                </p>
              </div>

              <div className="space-y-3">
                {paymentOptions.map((method) => {
                  const isActive = selectedPaymentMethod === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 rounded-2xl border bg-gray-50/60 p-4 ${
                        isActive ? "border-emerald-400 bg-emerald-50/60" : "border-dashed border-gray-200"
                      } ${method.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <input
                        type="radio"
                        className="mt-1 h-4 w-4 text-orange-500"
                        checked={isActive}
                        onChange={() => setSelectedPaymentMethod(method.id)}
                        disabled={method.disabled}
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{method.label}</p>
                          {method.id === "vnpay" && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                              Khuyên dùng
                            </span>
                          )}
                          {method.disabled && method.helper && (
                            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                              {method.helper}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {selectedPaymentMethod === "vnpay" && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-700">
                  Chúng tôi sẽ chuyển hướng bạn tới trang VNPay để hoàn tất thanh toán. Vui lòng không đóng trình duyệt
                  trong quá trình này.
                </div>
              )}

              {selectedPaymentMethod === "cod" && (
                <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-700">
                  Bạn sẽ thanh toán trực tiếp cho shipper khi nhận hàng. Vui lòng chuẩn bị đúng số tiền.
                </div>
              )}

              <div className="pt-4 border-t space-y-5">
                <h2 className="text-lg font-semibold text-emerald-600 uppercase">Tổng cộng giỏ hàng</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Tạm tính</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-gray-700">Phí Giao Hàng</span>
                    <span className="font-semibold text-gray-900">0₫</span>
                  </div>

                  <div className="flex justify-between text-base font-semibold pt-2 border-t">
                    <span className="text-gray-900">Tổng</span>
                    <span className="text-emerald-600">{formatCurrency(subtotal)}</span>
                  </div>
                </div>

                <Button
                  className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                  disabled={!canCheckout || isSubmittingOrder}
                  onClick={selectedPaymentMethod === "cod" ? handleCODCheckout : handleVNPayCheckout}
                >
                  {isSubmittingOrder ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {selectedPaymentMethod === "cod" ? "Đang tạo đơn hàng..." : "Đang chuyển đến VNPay..."}
                    </>
                  ) : (
                    "TIẾN HÀNH THANH TOÁN"
                  )}
                </Button>
                {checkoutError && <p className="text-sm text-red-600 text-center">{checkoutError}</p>}
              </div>
            </section>

            <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
              <p className="text-sm font-semibold text-gray-900">Tiến độ hoàn tất</p>
              <Progress value={defaultAddress ? 66 : 33} className="h-2 bg-gray-100" />
              <p className="text-xs text-gray-500">
                Hoàn thành thông tin nhận hàng và chọn hình thức thanh toán để đặt hàng.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

