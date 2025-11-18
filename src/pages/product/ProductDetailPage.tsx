import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  Heart,
  Star,
  Share2,
  Gift,
  Truck,
  Ticket,
  Smile,
} from "lucide-react";
import { getProductDetail, getProductByCategoryId } from "@/service/home/service";
import type { TProductDetail } from "@/types/home.type";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import CardProduct from "@/components/common/card-product";
import { useCartStore } from "@/store/use-cart.store";
import { SelectCartDialog } from "@/components/shared-cart/SelectCartDialog";
import { useAuthStore } from "@/store/use-auth.store";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function QuantitySelector({
  maxQuantity,
  value,
  onChange,
}: {
  maxQuantity: number;
  value: number;
  onChange: (q: number) => void;
}) {
  const safeMax = Math.max(1, maxQuantity);

  const increment = () => {
    const newQty = Math.min(value + 1, safeMax);
    onChange(newQty);
  };

  const decrement = () => {
    const newQty = Math.max(value - 1, 1);
    onChange(newQty);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">Số lượng:</span>
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={decrement}
          disabled={value <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-10 text-center font-medium">{value}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={increment}
          disabled={value >= safeMax || maxQuantity === 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {maxQuantity > 0 && (
        <span className="text-sm text-muted-foreground">
          (Còn {maxQuantity} sản phẩm)
        </span>
      )}
    </div>
  );
}

function GiftSection() {
  const gifts = [
    {
      icon: <Truck className="h-6 w-6 text-green-600" />,
      title: "Miễn phí vận chuyển",
      description: "Cho mọi đơn hàng từ 300.000đ.",
    },
    {
      icon: <Ticket className="h-6 w-6 text-orange-500" />,
      title: "Voucher giảm 5%",
      description: "Cho lần mua hàng tiếp theo.",
    },
    {
      icon: <Gift className="h-6 w-6 text-blue-500" />,
      title: "Móc khoá ĐI OUTDOOR",
      description: "Quà tặng lưu niệm độc quyền.",
    },
    {
      icon: <Smile className="h-6 w-6 text-yellow-500" />,
      title: "Bộ Sticker Dã Ngoại",
      description: "Dán nón bảo hiểm, bình nước.",
    },
  ];

  return (
    <Card className="p-5 bg-gray-50/50">
      <ul className="space-y-4">
        {gifts.map((gift) => (
          <li key={gift.title} className="flex items-center gap-4">
            <div className="flex-shrink-0">{gift.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-800">{gift.title}</h4>
              <p className="text-sm text-gray-600">{gift.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ReviewSection({ product }: { product: TProductDetail }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6 border-b-2 border-green-600 inline-block pb-2">
        Khách Hàng Đánh Giá
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div className="text-center">
            <h3 className="text-5xl font-bold">{product.ranking ?? 5}</h3>
            <div className="flex justify-center text-yellow-400">
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
            </div>
            <p className="text-sm text-muted-foreground">1 review</p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <h4 className="font-semibold mb-2">Thêm một đánh giá</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Email của bạn sẽ không được hiển thị công khai.
          </p>
          <form className="space-y-4">
            <div>
              <label className="font-medium text-sm">Đánh giá của bạn *</label>
              <div className="flex text-gray-300 text-2xl gap-1 mt-1">
                <Star className="hover:text-yellow-400 cursor-pointer" />
                <Star className="hover:text-yellow-400 cursor-pointer" />
                <Star className="hover:text-yellow-400 cursor-pointer" />
                <Star className="hover:text-yellow-400 cursor-pointer" />
                <Star className="hover:text-yellow-400 cursor-pointer" />
              </div>
            </div>
            <div>
              <label className="font-medium text-sm">Đánh giá của bạn *</label>
              <textarea
                rows={5}
                className="w-full border rounded-md p-2 mt-1"
                placeholder="Viết đánh giá..."
              />
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Gửi đánh giá
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}

function SimilarProducts({ 
  categoryId, 
  currentProductId 
}: { 
  categoryId: number; 
  currentProductId: number;
}) {
  const { data: products, isPending } = useQuery({
    queryKey: ["SIMILAR_PRODUCTS", categoryId],
    queryFn: () => getProductByCategoryId(String(categoryId)),
    enabled: !!categoryId,
    refetchOnWindowFocus: false,
  });

  // Lọc bỏ sản phẩm hiện tại và chỉ lấy 4 sản phẩm đầu tiên
  const similarProducts = products
    ?.filter((p) => p.id !== currentProductId)
    .slice(0, 4) || [];

  if (isPending) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-green-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Sản Phẩm Tương Tự</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg h-[400px] animate-pulse"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (!similarProducts || similarProducts.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-green-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-800">Sản Phẩm Tương Tự</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {similarProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </Card>
  );
}

export default function ProductDetailPage() {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<TProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);
  const [isSelectCartDialogOpen, setIsSelectCartDialogOpen] = useState(false);
  const addItemToCart = useCartStore((state) => state.addItem);
  const isCartLoading = useCartStore((state) => state.isLoading);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!idOrSlug) return;
    setLoading(true);
    setError(null);
    getProductDetail(idOrSlug)
      .then((data) => {
        setProduct(data);
        setSelectedQuantity(1);
        setCurrentImageIndex(0);
        setSelectedThumbnailIndex(0);
      })
      .catch((_e) => {
        setError("Không tìm thấy sản phẩm hoặc lỗi hệ thống!");
      })
      .finally(() => setLoading(false));
  }, [idOrSlug]);

  const handleImageClick = (index: number) => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedThumbnailIndex(index);
  };

  const goToNextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % product.images.length
      );
    }
  };

  const goToPrevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };

  // 🎯 Lắng nghe phím mũi tên khi modal mở
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNextImage();
      } else if (event.key === "ArrowLeft") {
        goToPrevImage();
      } else if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, product?.images]);

  if (loading) {
    return (
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            {/* Breadcrumb skeleton */}
            <div className="h-4 bg-gray-200 rounded w-64"></div>
            
            {/* Main product skeleton */}
            <Card className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <div className="flex gap-4">
                  <div className="hidden sm:flex sm:flex-col gap-3 w-24">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-full h-20 bg-gray-200 rounded-md"></div>
                    ))}
                  </div>
                  <div className="flex-1 aspect-square bg-gray-200 rounded-md"></div>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gray-50 py-6 min-h-screen">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Không tìm thấy sản phẩm
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/">Về trang chủ</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link to="/products">Xem tất cả sản phẩm</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  if (!product) return null;

  const handleAddToCart = async () => {
    if (!product) return;
    if (!user) {
      navigate("/login");
      return;
    }
    setIsSelectCartDialogOpen(true);
  };

  const mainImageUrl = product.images?.[selectedThumbnailIndex]?.url || product.images?.[0]?.url;
  const modalImageUrl =
    product.images?.[currentImageIndex]?.url ||
    "/src/assets/img/img-placeholder.png";
  
  const finalPrice = product.discountRate 
    ? product.price - (product.price * product.discountRate)
    : product.price;
  const freeShippingThreshold = 300000;
  const isEligibleForFreeShipping = finalPrice >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - finalPrice);
  
  const stockStatus = product.stockQuantity > 0 
    ? { text: "✓ Còn hàng", color: "text-green-600", bg: "bg-green-50" }
    : { text: "✗ Hết hàng", color: "text-red-600", bg: "bg-red-50" };

  return (
    <div className="bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <nav className="text-sm mb-4 flex flex-wrap items-center gap-1 text-muted-foreground">
          <Link to="/" className="hover:underline">
            ĐI OUTDOOR
          </Link>
          <span>/</span>
          <Link to="#" className="hover:underline">
            {product.categoryName || "--"}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name || idOrSlug}</span>
        </nav>

        <Card className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="flex gap-4">
              <div className="hidden sm:flex sm:flex-col gap-3 w-24">
                {(product.images?.slice(0, 4) || []).map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={img.altText || `thumb-${i}`}
                    className={`w-full h-full object-cover rounded-md border-2 bg-gray-50 cursor-pointer transition-all ${
                      selectedThumbnailIndex === i
                        ? "border-green-600 ring-2 ring-green-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleThumbnailClick(i)}
                  />
                ))}
              </div>

              <Card className="relative flex-1 overflow-hidden group">
                <div className="aspect-square bg-white flex items-center justify-center">
                  <img
                    src={mainImageUrl || "/src/assets/img/img-placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-contain cursor-zoom-in transition-transform group-hover:scale-105"
                    onClick={() => handleImageClick(selectedThumbnailIndex)}
                  />
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedThumbnailIndex + 1} / {product.images.length}
                  </div>
                )}
              </Card>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div>
              <h1 className="text-3xl font-bold leading-snug mb-2">
                {product.name || "--"}
              </h1>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                {stockStatus.text}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                SKU: <span className="text-foreground">{product.id}</span>
              </span>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-4 w-4" fill="currentColor" />
                <span className="text-foreground font-medium">
                  {product.ranking?.toFixed(1) ?? "4.9"}
                </span>
                <span className="text-muted-foreground">(81 Reviews)</span>
              </div>
            </div>

            <div className="pt-2">
              {product.discountRate ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-bold text-green-600">
                      {formatVND(finalPrice)}
                    </span>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      -{(product.discountRate * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-xl text-gray-400 line-through">
                    {formatVND(product.price)}
                  </div>
                </div>
              ) : (
                <div className="text-5xl font-bold text-green-600">
                  {formatVND(product.price)}
                </div>
              )}
            </div>

            <div>
              <span className="font-semibold">Color:</span>
              <span className="ml-2">Light Green</span>
            </div>

            <div className="pt-2">
              <QuantitySelector
                maxQuantity={product.stockQuantity}
                value={selectedQuantity}
                onChange={setSelectedQuantity}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-lg disabled:opacity-50"
                disabled={product.stockQuantity === 0 || isCartLoading}
                onClick={() => {
                  if (product.stockQuantity === 0) return;
                  handleAddToCart().catch(() => undefined);
                }}
              >
                {isCartLoading ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700 text-lg disabled:opacity-50"
                disabled={product.stockQuantity === 0 || isCartLoading}
                onClick={async () => {
                  if (product.stockQuantity === 0) return;
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  setIsSelectCartDialogOpen(true);
                }}
              >
                Mua ngay
              </Button>
            </div>

            <div className="border-t border-b py-3 text-sm text-gray-600 space-y-2">
              <div className="flex items-center">
                <span className="font-semibold min-w-[120px]">
                  Danh sách cửa hàng:
                </span>
                <a href="#" className="text-green-600 hover:underline ml-2">
                  Hồ Chí Minh, Đà Nẵng, Hà Nội
                </a>
              </div>
            </div>

            <div className="text-sm text-green-700 font-medium bg-green-50 p-3 rounded-md">
              {isEligibleForFreeShipping ? (
                <span>Sản phẩm đủ điều kiện giao hàng miễn phí.</span>
              ) : (
                <>
                  Thêm{" "}
                  <span className="font-bold">{formatVND(amountToFreeShipping)}</span>{" "}
                  để đủ điều kiện giao hàng miễn phí!
                </>
              )}
            </div>

            <div className="flex items-center gap-6 pt-2">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500">
                <Heart className="h-5 w-5" /> Thêm yêu thích
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Share2 className="h-5 w-5" /> Chia sẻ:
              </div>
            </div>

            <div className="text-sm text-gray-500 pt-2">
              <span className="font-semibold text-gray-700">Thẻ:</span>
              <a href="#" className="ml-1 hover:text-green-600">
                lều cắm trại 2 người
              </a>
              ,
              <a href="#" className="ml-1 hover:text-green-600">
                lều dã ngoại
              </a>
              ,
              <a href="#" className="ml-1 hover:text-green-600">
                lều naturehike
              </a>
            </div>
          </div>
        </Card>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Card className="p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-green-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-800">Mô Tả Sản Phẩm</h2>
              </div>
              <div
                className="product-description prose prose-lg max-w-none
                  prose-headings:text-gray-800 prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8 prose-headings:first:mt-0
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:break-words prose-p:whitespace-pre-wrap
                  prose-ul:text-gray-700 prose-ul:ml-6 prose-ul:mb-4 prose-ul:list-disc
                  prose-ol:text-gray-700 prose-ol:ml-6 prose-ol:mb-4 prose-ol:list-decimal
                  prose-li:mb-2 prose-li:leading-relaxed prose-li:break-words
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-em:text-gray-800 prose-em:italic
                  prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-a:break-words
                  prose-img:rounded-lg prose-img:shadow-md prose-img:my-6 prose-img:w-full prose-img:h-auto
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800 prose-code:break-words
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-4
                  prose-blockquote:border-l-4 prose-blockquote:border-green-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-table:w-full prose-table:border-collapse prose-table:my-6
                  prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-300
                  prose-td:p-3 prose-td:border prose-td:border-gray-300
                  break-words overflow-wrap-anywhere"
                dangerouslySetInnerHTML={{
                  __html:
                    product.description || 
                    `<div class="text-center py-12 text-gray-400">
                      <p class="text-lg">Sản phẩm chưa có mô tả chi tiết.</p>
                    </div>`,
                }}
              />
            </Card>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-green-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Quà Tặng Kèm</h2>
                </div>
                <GiftSection />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ReviewSection product={product} />
        </div>

        {product.categoryId && (
          <div className="mt-16">
            <SimilarProducts 
              categoryId={product.categoryId} 
              currentProductId={product.id}
            />
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent [&>button]:hidden"
        >
          <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={currentImageIndex}
                src={modalImageUrl}
                alt={product.images?.[currentImageIndex]?.altText || "Product large view"}
                className="max-w-full max-h-full object-contain rounded-md"
                initial={{ opacity: 0, x: 100, scale: 1.3 }}
                animate={{ opacity: 1, x: 0, scale: 1.3 }}
                exit={{ opacity: 0, x: -100, scale: 1.3 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Select Cart Dialog */}
      {product && (
        <SelectCartDialog
          open={isSelectCartDialogOpen}
          onOpenChange={setIsSelectCartDialogOpen}
          productId={product.id}
          quantity={selectedQuantity}
          price={finalPrice}
          onSuccess={() => {
            // Optionally navigate to cart after adding
          }}
        />
      )}
    </div>
  );
}