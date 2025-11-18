import { useState } from "react";
import { Check, X, ShoppingCart, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "@/store/use-notification.store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Notification } from "@/types/notification.type";
import { NotificationActionType } from "@/types/notification.type";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/utils/helper";

interface NotificationItemProps {
  notification: Notification;
  onAction?: () => void;
}

export function NotificationItem({ notification, onAction }: NotificationItemProps) {
  const navigate = useNavigate();
  const { acceptInvitation, rejectInvitation, markAsRead } = useNotificationStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = async () => {
    if (
      notification.actionType === NotificationActionType.SHARED_CART_INVITATION &&
      notification.metadata?.sharedCartId
    ) {
      setIsProcessing(true);
      try {
        await acceptInvitation(
          notification.id,
          notification.metadata.sharedCartId
        );
        await markAsRead(notification.id);
        onAction?.();
        // Navigate to shared cart detail
        navigate(`/shared-carts/${notification.metadata.sharedCartId}`);
      } catch (error) {
        console.error("Failed to accept invitation:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleReject = async () => {
    if (notification.actionType === NotificationActionType.SHARED_CART_INVITATION) {
      setIsProcessing(true);
      try {
        await rejectInvitation(notification.id);
        await markAsRead(notification.id);
        onAction?.();
      } catch (error) {
        console.error("Failed to reject invitation:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleClick = async () => {
    if (!notification.readFlag) {
      await markAsRead(notification.id);
    }
    if (
      (notification.actionType === NotificationActionType.SHARED_CART_INVITATION ||
        notification.actionType === NotificationActionType.SHARED_CART_CHECKOUT) &&
      notification.metadata?.sharedCartId
    ) {
      navigate(`/shared-carts/${notification.metadata.sharedCartId}`);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };

  const isInvitation =
    notification.actionType === NotificationActionType.SHARED_CART_INVITATION;
  const isCheckout =
    notification.actionType === NotificationActionType.SHARED_CART_CHECKOUT;

  const getIcon = () => {
    if (isInvitation) {
      return <ShoppingCart className="text-green-primary" size={18} />;
    }
    if (isCheckout) {
      return <CheckCircle2 className="text-green-600" size={18} />;
    }
    return <Clock className="text-gray-400" size={18} />;
  };

  const getBackgroundColor = () => {
    if (!notification.readFlag) {
      if (isCheckout) {
        return "bg-green-50/50 border-green-200";
      }
      return "bg-blue-50/50 border-blue-200";
    }
    return "";
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-colors cursor-pointer hover:bg-gray-50",
        getBackgroundColor()
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                {notification.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {notification.message}
              </p>
              
              {/* Payment info for checkout notifications */}
              {isCheckout && notification.metadata && (
                <div className="mt-2 space-y-1">
                  {notification.metadata.paidAmount && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-green-600">
                        {formatMoney(notification.metadata.paidAmount)}đ
                      </span>
                      {notification.metadata.paymentMethod && (
                        <Badge className="bg-green-600 text-white text-xs">
                          {notification.metadata.paymentMethod === "VNPAY"
                            ? "VNPay"
                            : notification.metadata.paymentMethod === "COD"
                            ? "COD"
                            : "MoMo"}
                        </Badge>
                      )}
                    </div>
                  )}
                  {notification.metadata.paidByName && (
                    <p className="text-xs text-gray-500">
                      Thanh toán bởi: {notification.metadata.paidByName}
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">
                  {formatTime(notification.createdAt)}
                </span>
                {!notification.readFlag && (
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      isCheckout ? "bg-green-500" : "bg-blue-500"
                    )}
                  />
                )}
              </div>
            </div>
          </div>
          {isInvitation && (
            <div className="flex items-center gap-2 mt-3">
              <Button
                size="sm"
                variant="default"
                className="h-7 text-xs flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAccept();
                }}
                disabled={isProcessing}
              >
                <Check size={14} className="mr-1" />
                Chấp nhận
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReject();
                }}
                disabled={isProcessing}
              >
                <X size={14} className="mr-1" />
                Từ chối
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

