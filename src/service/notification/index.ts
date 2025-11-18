// Export all notification service functions
export {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllAsRead,
  acceptInvitation,
  rejectInvitation,
  deleteNotification,
} from "./service";

export { default as NotificationEndPoint } from "./endpoint";

