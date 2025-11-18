export enum NotificationType {
  INFO = "INFO",
  WARNING = "WARNING",
  SUCCESS = "SUCCESS",
}

export enum NotificationActionType {
  SHARED_CART_INVITATION = "SHARED_CART_INVITATION",
  SHARED_CART_CHECKOUT = "SHARED_CART_CHECKOUT",
  // Có thể thêm các loại khác sau
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  readFlag: boolean;
  createdAt: string; // ISO date string
  // Metadata cho shared cart invitation và checkout
  actionType?: NotificationActionType;
  metadata?: {
    sharedCartId?: number;
    sharedCartTitle?: string;
    inviterName?: string;
    inviterId?: number;
    // Checkout metadata
    paidByName?: string;
    paidByUserId?: number;
    paidAmount?: number;
    paymentMethod?: "VNPAY" | "COD" | "MOMO";
  };
}

export interface NotificationListResponse {
  notifications: Notification[];
  unreadCount: number;
}

export interface AcceptInvitationRequest {
  notificationId: number;
  sharedCartId: number;
}

export interface RejectInvitationRequest {
  notificationId: number;
}

