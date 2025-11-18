import { create } from "zustand";
import type { Notification } from "@/types/notification.type";
import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllAsRead,
  acceptInvitation,
  rejectInvitation,
  deleteNotification,
} from "@/service/notification";

interface NotificationState {
  // State
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;

  // Actions
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: number | string) => Promise<void>;
  markAllRead: () => Promise<void>;
  acceptInvitation: (notificationId: number, sharedCartId: number) => Promise<void>;
  rejectInvitation: (notificationId: number) => Promise<void>;
  removeNotification: (id: number | string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  async fetchNotifications() {
    set({ isLoading: true });
    try {
      const notifications = await getNotifications();
      set({ notifications });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  async fetchUnreadCount() {
    try {
      const count = await getUnreadCount();
      set({ unreadCount: count });
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  },

  async markAsRead(id) {
    try {
      await markNotificationAsRead(id);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, readFlag: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  },

  async markAllRead() {
    try {
      await markAllAsRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          readFlag: true,
        })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  },

  async acceptInvitation(notificationId, sharedCartId) {
    try {
      await acceptInvitation({ notificationId, sharedCartId });
      // Remove notification after accepting
      await get().removeNotification(notificationId);
      // Refresh notifications
      await get().fetchNotifications();
      await get().fetchUnreadCount();
    } catch (error) {
      console.error("Failed to accept invitation:", error);
      throw error;
    }
  },

  async rejectInvitation(notificationId) {
    try {
      await rejectInvitation({ notificationId });
      // Remove notification after rejecting
      await get().removeNotification(notificationId);
      // Refresh notifications
      await get().fetchNotifications();
      await get().fetchUnreadCount();
    } catch (error) {
      console.error("Failed to reject invitation:", error);
      throw error;
    }
  },

  async removeNotification(id) {
    try {
      await deleteNotification(id);
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.notifications.find((n) => n.id === id && !n.readFlag)
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      }));
    } catch (error) {
      console.error("Failed to remove notification:", error);
    }
  },

  async refresh() {
    await Promise.all([
      get().fetchNotifications(),
      get().fetchUnreadCount(),
    ]);
  },
}));

