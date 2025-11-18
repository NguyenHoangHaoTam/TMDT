import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "@/store/use-notification.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NotificationItem } from "./NotificationItem";

export function NotificationBell() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    fetchUnreadCount,
    refresh,
  } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch notifications on mount and when opened
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, fetchNotifications]);

  // Show only unread notifications in dropdown, max 5
  const unreadNotifications = notifications
    .filter((n) => !n.readFlag)
    .slice(0, 5);

  const handleViewAll = () => {
    setIsOpen(false);
    navigate("/notifications");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={22} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[500px] overflow-y-auto">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="font-semibold text-sm">Thông báo</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-gray-500">
                {unreadCount} chưa đọc
              </span>
            )}
          </div>
          {unreadNotifications.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-500">
              Không có thông báo mới
            </div>
          ) : (
            <div className="space-y-1">
              {unreadNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onAction={() => {
                    refresh();
                  }}
                />
              ))}
            </div>
          )}
          {notifications.length > 0 && (
            <div className="mt-2 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={handleViewAll}
              >
                Xem tất cả thông báo
              </Button>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

