import { useEffect } from "react";
import { useNotificationStore } from "@/store/use-notification.store";
import { NotificationItem } from "@/components/notification/NotificationItem";
import { Button } from "@/components/ui/button";
import { CheckCheck, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationPage() {
  const {
    notifications,
    isLoading,
    fetchNotifications,
    markAllRead,
    removeNotification,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadNotifications = notifications.filter((n) => !n.readFlag);
  const readNotifications = notifications.filter((n) => n.readFlag);

  const handleMarkAllRead = async () => {
    await markAllRead();
    await fetchNotifications();
  };

  const handleDelete = async (id: number | string) => {
    await removeNotification(id);
    await fetchNotifications();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Đang tải thông báo...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Thông báo</h1>
          {unreadNotifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
              <CheckCheck size={16} className="mr-2" />
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">Không có thông báo nào</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {unreadNotifications.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  Chưa đọc ({unreadNotifications.length})
                </h2>
                <div className="space-y-2">
                  {unreadNotifications.map((notification) => (
                    <div key={notification.id} className="relative group">
                      <NotificationItem
                        notification={notification}
                        onAction={() => fetchNotifications()}
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {readNotifications.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  Đã đọc ({readNotifications.length})
                </h2>
                <div className="space-y-2">
                  {readNotifications.map((notification) => (
                    <div key={notification.id} className="relative group">
                      <NotificationItem
                        notification={notification}
                        onAction={() => fetchNotifications()}
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

