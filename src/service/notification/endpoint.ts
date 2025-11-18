const NotificationEndPoint = {
  LIST: "api/notifications",
  UNREAD_COUNT: "api/notifications/unread-count",
  MARK_READ: (id: number | string) => `api/notifications/${id}/read`,
  MARK_ALL_READ: "api/notifications/read-all",
  ACCEPT_INVITATION: "api/notifications/accept-invitation",
  REJECT_INVITATION: "api/notifications/reject-invitation",
  DELETE: (id: number | string) => `api/notifications/${id}`,
};

export default NotificationEndPoint;

