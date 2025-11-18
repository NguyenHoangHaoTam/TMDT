import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSharedCartStore } from "@/store/use-shared-cart.store";
import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/service/home/service";
import type { TProductDetail } from "@/types/home.type";
import { formatMoney } from "@/utils/helper";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sharedCartId: number;
}

export function AddItemDialog({
  open,
  onOpenChange,
  sharedCartId,
}: AddItemDialogProps) {
  const { addItem } = useSharedCartStore();
  const [productIdOrSlug, setProductIdOrSlug] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch product details
  const { data: product, isLoading: isLoadingProduct } = useQuery<TProductDetail>({
    queryKey: ["PRODUCT_DETAIL", productIdOrSlug],
    queryFn: () => getProductDetail(productIdOrSlug),
    enabled: !!productIdOrSlug && productIdOrSlug.trim().length > 0,
    retry: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !quantity || parseInt(quantity) <= 0) {
      return;
    }

    setIsLoading(true);
    try {
      await addItem({
        sharedCartId,
        productId: product.id,
        quantity: parseInt(quantity),
        priceAtAdd: product.price * (1 - (product.discountRate || 0)),
      });
      setProductIdOrSlug("");
      setQuantity("1");
      onOpenChange(false);
    } catch (error) {
      console.error("Add item error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const finalPrice = product
    ? product.price * (1 - (product.discountRate || 0))
    : 0;
  const totalPrice = finalPrice * parseInt(quantity || "0");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm vào giỏ hàng</DialogTitle>
          <DialogDescription>
            Nhập ID hoặc slug của sản phẩm để thêm vào giỏ hàng chung
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="productId">ID hoặc Slug sản phẩm *</Label>
              <Input
                id="productId"
                placeholder="Ví dụ: 123 hoặc product-slug"
                value={productIdOrSlug}
                onChange={(e) => setProductIdOrSlug(e.target.value)}
                required
                disabled={isLoading}
              />
              {isLoadingProduct && productIdOrSlug && (
                <p className="text-xs text-muted-foreground">Đang tìm sản phẩm...</p>
              )}
              {product && (
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Giá: {formatMoney(finalPrice)}đ
                    {product.discountRate > 0 && (
                      <span className="line-through ml-2">
                        {formatMoney(product.price)}đ
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tồn kho: {product.stockQuantity} {product.unit}
                  </p>
                </div>
              )}
              {!isLoadingProduct && productIdOrSlug && !product && (
                <p className="text-xs text-red-500">Không tìm thấy sản phẩm</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Số lượng *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product?.stockQuantity || 999}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                disabled={isLoading || !product}
              />
              {product && (
                <p className="text-xs text-muted-foreground">
                  Tổng tiền: {formatMoney(totalPrice)}đ
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={
                isLoading ||
                !product ||
                !quantity ||
                parseInt(quantity) <= 0 ||
                (product && parseInt(quantity) > product.stockQuantity)
              }
            >
              {isLoading ? "Đang thêm..." : "Thêm sản phẩm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

