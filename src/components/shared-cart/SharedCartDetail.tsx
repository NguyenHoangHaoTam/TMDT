import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Table component not used in this component
import { useSharedCartStore } from "@/store/use-shared-cart.store";
import { useAuthStore } from "@/store/use-auth.store";
import { InviteParticipantDialog } from "./InviteParticipantDialog";
import { SharedCartCheckoutDialog } from "./SharedCartCheckoutDialog";
import {
  Plus,
  UserPlus,
  X,
  Minus,
  Trash2,
  LogOut,
  CheckCircle,
  XCircle,
  Edit,
  Users,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { formatMoney } from "@/utils/helper";
// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
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

const statusColors = {
  OPEN: "bg-green-500",
  COMPLETED: "bg-blue-500",
  CANCELLED: "bg-gray-500",
};

const statusLabels = {
  OPEN: "Đang mở",
  COMPLETED: "Đã hoàn thành",
  CANCELLED: "Đã hủy",
};

export function SharedCartDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    currentCart,
    isLoadingDetail,
    fetchCartDetail,
    updateQuantity,
    removeItem,
    closeCart,
    cancelCart,
    leave,
    removeParticipant,
    updateCartInfo,
  } = useSharedCartStore();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isEditCartDialogOpen, setIsEditCartDialogOpen] = useState(false);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCartDetail(id);
    }
  }, [id, fetchCartDetail]);

  if (isLoadingDetail) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!currentCart) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Không tìm thấy giỏ hàng</p>
          <Button onClick={() => navigate("/shared-carts")}>
            Quay lại danh sách
          </Button>
        </Card>
      </div>
    );
  }

  const isOwner = user && Number(user.id) === currentCart.ownerId;
  const currentUserParticipant = currentCart.participants.find(
    (p) => user && Number(user.id) === p.userId
  );
  const isParticipant = !!currentUserParticipant;

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem({ sharedCartId: currentCart.id, productId });
    } else {
      await updateQuantity({
        sharedCartId: currentCart.id,
        productId,
        quantity: newQuantity,
      });
    }
  };

  const handleCloseCart = async () => {
    if (window.confirm("Bạn có chắc muốn đóng giỏ hàng này?")) {
      await closeCart(currentCart.id);
    }
  };

  const handleCancelCart = async () => {
    if (window.confirm("Bạn có chắc muốn hủy giỏ hàng này?")) {
      await cancelCart(currentCart.id);
    }
  };

  const handleLeave = async () => {
    if (window.confirm("Bạn có chắc muốn rời khỏi giỏ hàng này?")) {
      await leave(currentCart.id);
      navigate("/shared-carts");
    }
  };

  const handleRemoveParticipant = async (participantUserId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa người này khỏi giỏ hàng?")) {
      await removeParticipant(currentCart.id, participantUserId);
    }
  };

  const handleUpdateCartInfo = async (data: { title: string; expiresAt: string }) => {
    await updateCartInfo({
      sharedCartId: currentCart.id,
      title: data.title,
      expiresAt: data.expiresAt,
    });
    setIsEditCartDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate("/shared-carts")}
          className="mb-4"
        >
          ← Quay lại
        </Button>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{currentCart.title}</h1>
              {isOwner && currentCart.status === "OPEN" && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsEditCartDialogOpen(true)}
                  title="Chỉnh sửa thông tin giỏ hàng"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge className={`${statusColors[currentCart.status]} text-white`}>
                {statusLabels[currentCart.status]}
              </Badge>
              <span>Chủ sở hữu: {currentCart.ownerName}</span>
              <span>
                Hết hạn: {formatDate(currentCart.expiresAt)}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {currentCart.status === "OPEN" && (
              <>
                {isOwner && (
                  <>
                    {currentCart.items.length > 0 && (
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => setIsCheckoutDialogOpen(true)}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Thanh toán
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setIsInviteDialogOpen(true)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Mời người
                    </Button>
                    <Button variant="outline" onClick={handleCloseCart}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Đóng giỏ hàng
                    </Button>
                    <Button variant="destructive" onClick={handleCancelCart}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Hủy
                    </Button>
                  </>
                )}
                {isParticipant && !isOwner && (
                  <Button variant="outline" onClick={handleLeave}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Rời khỏi
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Items Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Sản phẩm ({currentCart.totalItems})
              </h2>
            </div>
            {currentCart.items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Chưa có sản phẩm nào</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentCart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <img
                      src={item.productImageUrl || "/src/assets/img/img-placeholder.png"}
                      alt={item.productName}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Thêm bởi: {item.addedByUserName}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {currentCart.status === "OPEN" && (
                            <>
                              <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={() =>
                                  handleUpdateQuantity(item.productId, item.quantity - 1)
                                }
                                disabled={isLoadingDetail}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={() =>
                                  handleUpdateQuantity(item.productId, item.quantity + 1)
                                }
                                disabled={isLoadingDetail}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {currentCart.status !== "OPEN" && (
                            <span className="font-semibold">{item.quantity}</span>
                          )}
                        </div>
                        <div className="flex-1 text-right">
                          <p className="text-sm text-muted-foreground">
                            {formatMoney(item.priceAtAdd)}đ x {item.quantity}
                          </p>
                          <p className="font-semibold text-green-600">
                            {formatMoney(item.subtotal)}đ
                          </p>
                        </div>
                        {currentCart.status === "OPEN" && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() =>
                              removeItem({
                                sharedCartId: currentCart.id,
                                productId: item.productId,
                              })
                            }
                            disabled={isLoadingDetail}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Participants */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Người tham gia ({currentCart.participants.length})
            </h2>
            <div className="space-y-3">
              {currentCart.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{participant.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {participant.userEmail}
                    </p>
                  </div>
                  {isOwner &&
                    currentCart.status === "OPEN" &&
                    participant.userId !== currentCart.ownerId && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRemoveParticipant(participant.userId)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Tóm tắt</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tổng sản phẩm:</span>
                <span className="font-semibold">{currentCart.totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tổng tiền:</span>
                <span className="font-semibold text-green-600 text-lg">
                  {formatMoney(currentCart.totalAmount)}đ
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Info - Only show when cart is COMPLETED and has payment info */}
          {currentCart.status === "COMPLETED" && currentCart.paymentInfo && (
            <Card className="p-6 bg-green-50 border-green-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                Lịch sử thanh toán
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Đã thanh toán bởi:</span>
                  <span className="font-semibold text-green-700">
                    {currentCart.paymentInfo.paidByName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Số tiền:</span>
                  <span className="font-semibold text-green-600 text-lg">
                    {formatMoney(currentCart.paymentInfo.paidAmount)}đ
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Phương thức:</span>
                  <Badge className="bg-green-600 text-white">
                    {currentCart.paymentInfo.paymentMethod === "VNPAY"
                      ? "VNPay"
                      : currentCart.paymentInfo.paymentMethod === "COD"
                      ? "COD"
                      : "MoMo"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Thời gian:</span>
                  <span className="text-sm font-medium">
                    {formatDate(currentCart.paymentInfo.paidAt)}
                  </span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <InviteParticipantDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        sharedCartId={currentCart.id}
      />

      {currentCart.status === "OPEN" && isOwner && (
        <SharedCartCheckoutDialog
          open={isCheckoutDialogOpen}
          onOpenChange={setIsCheckoutDialogOpen}
          sharedCart={currentCart}
        />
      )}

      {/* Edit Cart Info Dialog */}
      <Dialog
        open={isEditCartDialogOpen}
        onOpenChange={setIsEditCartDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin giỏ hàng</DialogTitle>
            <DialogDescription>
              Cập nhật tên và thời gian hết hạn của giỏ hàng
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const title = formData.get("title") as string;
              const expiresAt = formData.get("expiresAt") as string;
              handleUpdateCartInfo({
                title: title.trim(),
                expiresAt: new Date(expiresAt).toISOString(),
              });
            }}
          >
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Tên giỏ hàng *</Label>
                <Input
                  id="edit-title"
                  name="title"
                  defaultValue={currentCart.title}
                  required
                  disabled={isLoadingDetail}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-expiresAt">Hạn sử dụng *</Label>
                <Input
                  id="edit-expiresAt"
                  name="expiresAt"
                  type="datetime-local"
                  defaultValue={new Date(currentCart.expiresAt).toISOString().slice(0, 16)}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                  disabled={isLoadingDetail}
                />
                <p className="text-xs text-muted-foreground">
                  Giỏ hàng sẽ tự động đóng sau thời gian này
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditCartDialogOpen(false)}
                disabled={isLoadingDetail}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoadingDetail}>
                Cập nhật
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

