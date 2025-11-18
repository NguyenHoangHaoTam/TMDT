import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSharedCartStore } from "@/store/use-shared-cart.store";
import { CreateSharedCartDialog } from "./CreateSharedCartDialog";
import { Plus, ShoppingCart, Users, Calendar, Clock } from "lucide-react";
import { formatMoney } from "@/utils/helper";
// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

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

export function SharedCartList() {
  const { cartList, isLoadingList, fetchCartList } = useSharedCartStore();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchCartList();
  }, [fetchCartList]);

  if (isLoadingList) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Giỏ hàng chung</h1>
          <p className="text-muted-foreground">
            Quản lý và chia sẻ giỏ hàng với bạn bè
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tạo giỏ hàng mới
        </Button>
      </div>

      {cartList.length === 0 ? (
        <Card className="p-12 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            Chưa có giỏ hàng chung nào
          </h3>
          <p className="text-muted-foreground mb-4">
            Tạo giỏ hàng chung đầu tiên để bắt đầu mua sắm cùng bạn bè
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo giỏ hàng mới
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cartList.map((cart) => (
            <Card key={cart.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {cart.title}
                  </h3>
                  <Badge
                    className={`${statusColors[cart.status]} text-white`}
                  >
                    {statusLabels[cart.status]}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{cart.totalParticipants + 1} người tham gia</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>{cart.totalItems} sản phẩm</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Hết hạn: {formatDate(cart.expiresAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    Tạo: {formatDate(cart.createdAt)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tổng tiền:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatMoney(cart.totalAmount)}đ
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/shared-carts/${cart.id}`}>Xem chi tiết</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateSharedCartDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}

