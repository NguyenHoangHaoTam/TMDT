import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Users, Plus } from "lucide-react";
import { useCartStore } from "@/store/use-cart.store";
import { useSharedCartStore } from "@/store/use-shared-cart.store";
import { useAuthStore } from "@/store/use-auth.store";
import { formatMoney } from "@/utils/helper";
import { CreateSharedCartDialog } from "./CreateSharedCartDialog";

interface SelectCartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: number;
  quantity: number;
  price: number;
  onSuccess?: () => void;
}

export function SelectCartDialog({
  open,
  onOpenChange,
  productId,
  quantity,
  price,
  onSuccess,
}: SelectCartDialogProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addItem: addToPersonalCart } = useCartStore();
  const { cartList, fetchCartList, addItem: addToSharedCart, createCart } = useSharedCartStore();
  const [selectedCartType, setSelectedCartType] = useState<"personal" | "shared" | null>(null);
  const [selectedSharedCartId, setSelectedSharedCartId] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && user) {
      fetchCartList();
    }
  }, [open, user, fetchCartList]);

  // Filter only OPEN shared carts
  const openSharedCarts = cartList.filter((cart) => cart.status === "OPEN");

  const handleAddToPersonalCart = async () => {
    setIsLoading(true);
    try {
      await addToPersonalCart({ productId, quantity });
      onSuccess?.();
      onOpenChange(false);
      setSelectedCartType(null);
    } catch (error: any) {
      if (error?.message === "UNAUTHENTICATED") {
        onOpenChange(false);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToSharedCart = async () => {
    if (!selectedSharedCartId) return;
    setIsLoading(true);
    try {
      await addToSharedCart({
        sharedCartId: selectedSharedCartId,
        productId,
        quantity,
        priceAtAdd: price,
      });
      onSuccess?.();
      onOpenChange(false);
      setSelectedCartType(null);
      // Navigate to shared cart detail page
      navigate(`/shared-carts/${selectedSharedCartId}`);
      setSelectedSharedCartId(null);
    } catch (error) {
      console.error("Add to shared cart error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAndAdd = async (cartData: { title: string; expiresAt: string }) => {
    setIsLoading(true);
    try {
      const success = await createCart(cartData);
      if (success) {
        // Wait a bit for the list to refresh
        await new Promise((resolve) => setTimeout(resolve, 500));
        await fetchCartList();
        // Get the updated list
        const updatedList = useSharedCartStore.getState().cartList;
        // Select the newest OPEN cart
        const newCart = updatedList.find((cart) => cart.status === "OPEN");
        if (newCart) {
          setSelectedSharedCartId(newCart.id);
          // Add item to the new cart
          await addToSharedCart({
            sharedCartId: newCart.id,
            productId,
            quantity,
            priceAtAdd: price,
          });
          onSuccess?.();
          onOpenChange(false);
          setSelectedCartType(null);
          // Navigate to shared cart detail page
          navigate(`/shared-carts/${newCart.id}`);
          setSelectedSharedCartId(null);
        }
      }
    } catch (error) {
      console.error("Create cart error:", error);
    } finally {
      setIsLoading(false);
      setIsCreateDialogOpen(false);
    }
  };

  const totalPrice = price * quantity;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chọn giỏ hàng</DialogTitle>
            <DialogDescription>
              Chọn giỏ hàng cá nhân hoặc giỏ hàng chung để thêm sản phẩm
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Personal Cart Option */}
            <Card
              className={`p-4 cursor-pointer transition-all ${
                selectedCartType === "personal"
                  ? "border-2 border-orange-500 bg-orange-50"
                  : "hover:border-orange-300"
              }`}
              onClick={() => setSelectedCartType("personal")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedCartType === "personal"
                      ? "border-orange-500 bg-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedCartType === "personal" && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <ShoppingCart className="w-6 h-6 text-orange-500" />
                <div className="flex-1">
                  <h3 className="font-semibold">Giỏ hàng cá nhân</h3>
                  <p className="text-sm text-muted-foreground">
                    Thêm vào giỏ hàng của bạn
                  </p>
                </div>
              </div>
            </Card>

            {/* Shared Cart Option */}
            {user && (
              <div className="space-y-2">
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    selectedCartType === "shared"
                      ? "border-2 border-blue-500 bg-blue-50"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedCartType("shared")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedCartType === "shared"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedCartType === "shared" && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <Users className="w-6 h-6 text-blue-500" />
                    <div className="flex-1">
                      <h3 className="font-semibold">Giỏ hàng chung</h3>
                      <p className="text-sm text-muted-foreground">
                        Thêm vào giỏ hàng chung với người khác
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Shared Cart List */}
                {selectedCartType === "shared" && (
                  <div className="ml-8 space-y-2 max-h-[300px] overflow-y-auto">
                    {openSharedCarts.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">
                        Bạn chưa có giỏ hàng chung nào
                      </p>
                    ) : (
                      openSharedCarts.map((cart) => (
                        <Card
                          key={cart.id}
                          className={`p-3 cursor-pointer transition-all ${
                            selectedSharedCartId === cart.id
                              ? "border-2 border-blue-500 bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedSharedCartId(cart.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{cart.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {cart.totalParticipants + 1} người tham gia •{" "}
                                {formatMoney(cart.totalAmount)}
                              </p>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                selectedSharedCartId === cart.id
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedSharedCartId === cart.id && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        </Card>
                      ))
                    )}

                    {/* Create New Shared Cart */}
                    <Card
                      className="p-3 cursor-pointer border-dashed hover:bg-gray-50 transition-all"
                      onClick={() => setIsCreateDialogOpen(true)}
                    >
                      <div className="flex items-center gap-2 text-blue-600">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Tạo giỏ hàng chung mới</span>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                if (selectedCartType === "personal") {
                  handleAddToPersonalCart();
                } else if (selectedCartType === "shared" && selectedSharedCartId) {
                  handleAddToSharedCart();
                }
              }}
              disabled={
                isLoading ||
                !selectedCartType ||
                (selectedCartType === "shared" && !selectedSharedCartId)
              }
            >
              {isLoading ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CreateSharedCartDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreate={handleCreateAndAdd}
      />
    </>
  );
}

