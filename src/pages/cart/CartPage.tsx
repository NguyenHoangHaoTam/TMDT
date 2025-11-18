import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart.store";
import CheckoutProgress from "@/components/common/cart/checkout-progress";
const formatCurrency = (value?: number) =>
  (value ?? 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const CartPage = () => {
  const {
    cart,
    fetchCart,
    updateQuantity,
    removeItem,
    clearCart,
    isLoading,
  } = useCartStore();
  const navigate = useNavigate();
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<"fast" | "express">("fast");

  useEffect(() => {
    fetchCart().catch(() => undefined);
  }, [fetchCart]);

  const hasItems = (cart?.items?.length ?? 0) > 0;
  const total = cart?.totalAmount ?? 0;

  return (
    <div className="pb-16">
      <section
        className="relative h-52 w-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <p className="text-sm uppercase tracking-wide">Giỏ hàng</p>
          <h1 className="text-4xl font-bold mt-2">GIỎ HÀNG → ĐẶT HÀNG → ĐẶT HÀNG THÀNH CÔNG</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-10 space-y-6">
        <CheckoutProgress currentStep="cart" />

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div>

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="hidden lg:grid grid-cols-12 text-sm font-semibold text-gray-600 px-6 py-3 border-b bg-gray-50">
              <span className="col-span-5">Sản phẩm</span>
              <span className="col-span-2 text-center">Giá</span>
              <span className="col-span-2 text-center">Số lượng</span>
              <span className="col-span-2 text-right">Tạm tính</span>
              <span className="col-span-1 text-right"> </span>
            </div>

            {!hasItems && (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-gray-700">
                  Giỏ hàng trống
                </p>
                <p className="text-gray-500 mt-2">
                  Bạn chưa thêm sản phẩm nào. Bắt đầu mua sắm nhé!
                </p>
                <Button asChild className="mt-6 bg-green-600 hover:bg-green-700">
                  <Link to="/">Tiếp tục mua sắm</Link>
                </Button>
              </div>
            )}

            {hasItems && (
              <ul className="divide-y">
                {cart!.items.map((item) => (
                  <li key={item.productId} className="p-4 lg:p-6">
                    <div className="grid lg:grid-cols-12 gap-4 items-center">
                      <div className="lg:col-span-5 flex items-center gap-4">
                        <img
                          src={item.productImageUrl || "/src/assets/img/img-placeholder.png"}
                          alt={item.productName}
                          className="h-24 w-24 rounded-lg object-cover bg-gray-50"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{item.productName}</p>
                          <p className="text-sm text-green-600 mt-1">HÀNG CÓ SẴN</p>
                        </div>
                      </div>

                      <div className="lg:col-span-2 text-center text-gray-800 font-semibold">
                        {formatCurrency(item.price)}
                      </div>

                      <div className="lg:col-span-2 flex items-center justify-center">
                        <div className="inline-flex items-center border rounded-full">
                          <button
                            type="button"
                            className="p-2 disabled:opacity-40"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="p-2 disabled:opacity-40"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-2 text-right font-bold text-green-600">
                        {formatCurrency(item.subtotal)}
                      </div>

                      <div className="lg:col-span-1 text-right">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {hasItems && (
            <div className="flex justify-end mt-6">
              <Button
                variant="ghost"
                className="text-red-500"
                onClick={() => clearCart()}
              >
                Xóa giỏ hàng
              </Button>
            </div>
          )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
              <h2 className="text-lg font-semibold text-emerald-600 uppercase">Tổng cộng giỏ hàng</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Tạm tính</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(total)}</span>
                </div>

                <div className="space-y-3 pt-2 border-t">
                  <p className="text-sm font-semibold text-gray-900">Vận chuyển</p>
                  
                  <div className="space-y-3">
                    <label
                      className={`flex items-start gap-3 rounded-2xl border p-4 transition-all ${
                        selectedShippingMethod === "fast"
                          ? "border-blue-500 bg-blue-50/50"
                          : "border-dashed border-gray-200 bg-gray-50/60"
                      } cursor-pointer hover:border-blue-300`}
                    >
                      <div className="relative mt-0.5">
                        <input
                          type="radio"
                          className="sr-only"
                          checked={selectedShippingMethod === "fast"}
                          onChange={() => setSelectedShippingMethod("fast")}
                        />
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selectedShippingMethod === "fast"
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {selectedShippingMethod === "fast" && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="font-semibold text-gray-900">Giao Hàng Nhanh</p>
                        <div className="flex items-start gap-2 text-sm text-orange-600">
                          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <p>Phí SHIP cụ thể sẽ được thông báo khi Đi Outdoor gọi điện xác nhận đơn hàng.</p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 rounded-2xl border p-4 transition-all ${
                        selectedShippingMethod === "express"
                          ? "border-blue-500 bg-blue-50/50"
                          : "border-dashed border-gray-200 bg-gray-50/60"
                      } cursor-pointer hover:border-blue-300`}
                    >
                      <div className="relative mt-0.5">
                        <input
                          type="radio"
                          className="sr-only"
                          checked={selectedShippingMethod === "express"}
                          onChange={() => setSelectedShippingMethod("express")}
                        />
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selectedShippingMethod === "express"
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {selectedShippingMethod === "express" && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="font-semibold text-gray-900">Hỏa Tốc</p>
                        <div className="flex items-start gap-2 text-sm text-blue-600">
                          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <p>Chỉ hỗ trợ tại Hồ Chí Minh, Đà Nẵng, Hà Nội.</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <p className="text-sm font-semibold text-blue-600">
                    Giao hàng đến...
                  </p>
                </div>

                <div className="flex justify-between text-sm pt-2 border-t">
                  <span className="text-gray-700">Phí Giao Hàng</span>
                  <span className="font-semibold text-gray-900">0₫</span>
                </div>

                <div className="flex justify-between text-base font-semibold pt-2 border-t">
                  <span className="text-gray-900">Tổng</span>
                  <span className="text-emerald-600">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button
                className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold uppercase"
                disabled={!hasItems}
                onClick={() => {
                  if (hasItems) {
                    navigate("/checkout");
                  }
                }}
              >
                Tiến hành thanh toán
              </Button>
            </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🚀 Giao hàng hỏa tốc
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Áp dụng cho đơn nội thành: Hồ Chí Minh, Đà Nẵng, Hà Nội</p>
              <p>• Dùng dịch vụ đối tác: Grab, Ahamove,…</p>
              <p>• Phí ship sẽ được nhân viên thông báo khi bạn đặt hàng và yêu cầu hỏa tốc</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-3 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">🎒 Tip:</span> Hãy đăng nhập để lưu giỏ hàng và theo dõi đơn nhanh hơn.
            </p>
            <p>
              <span className="font-semibold text-gray-900">☎ Hỗ trợ:</span> 1900 63 63 60 (8h30 - 21h30).
            </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

