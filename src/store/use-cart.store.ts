import { create } from "zustand";
import toast from "@/components/ui/use-toast";
import type { AddToCartPayload, TCart } from "@/types/cart";
import {
  addItemToCart,
  clearCartItems,
  fetchCart as fetchCartApi,
  removeItemFromCart,
} from "@/service/cart/service";
import { useAuthStore } from "./use-auth.store";

interface CartState {
  cart: TCart | null;
  isLoading: boolean;
  isDrawerOpen: boolean;
  initialized: boolean;
  fetchCart: () => Promise<TCart | null>;
  addItem: (payload: AddToCartPayload) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, nextQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  finalizeCartAfterCheckout: () => Promise<void>;
  resetCartState: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  isDrawerOpen: false,
  initialized: false,

  async fetchCart() {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ cart: null, initialized: true });
      return null;
    }
    set({ isLoading: true });
    try {
      const cart = await fetchCartApi();
      set({ cart: cart ?? null, initialized: true });
      return cart ?? null;
    } catch (error) {
      set({ initialized: true });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  async addItem(payload) {
    const token = useAuthStore.getState().token;
    if (!token) {
      toast.error("Vui lòng đăng nhập để sử dụng giỏ hàng");
      throw new Error("UNAUTHENTICATED");
    }
    set({ isLoading: true });
    try {
      const cart = await addItemToCart(payload);
      set({ cart, isDrawerOpen: true });
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    } finally {
      set({ isLoading: false });
    }
  },

  async removeItem(productId) {
    set({ isLoading: true });
    try {
      await removeItemFromCart(productId);
      const cart = await fetchCartApi();
      set({ cart: cart ?? null });
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } finally {
      set({ isLoading: false });
    }
  },

  async updateQuantity(productId, nextQuantity) {
    const currentCart = get().cart;
    const item = currentCart?.items.find((i) => i.productId === productId);
    if (!item) return;

    const safeQuantity = Math.max(0, nextQuantity);
    if (safeQuantity === item.quantity) {
      return;
    }
    if (safeQuantity === 0) {
      await get().removeItem(productId);
      return;
    }

    const delta = safeQuantity - item.quantity;
    set({ isLoading: true });
    try {
      const cart = await addItemToCart({
        productId,
        quantity: delta,
      });
      set({ cart });
    } finally {
      set({ isLoading: false });
    }
  },

  async clearCart() {
    set({ isLoading: true });
    try {
      await clearCartItems();
      const cart = await fetchCartApi();
      set({ cart: cart ?? null });
      toast.success("Đã xóa giỏ hàng");
    } finally {
      set({ isLoading: false });
    }
  },

  async finalizeCartAfterCheckout() {
    try {
      await clearCartItems();
    } catch (error) {
      console.error("finalizeCartAfterCheckout", error);
    } finally {
      set({ cart: null });
    }
  },

  resetCartState() {
    set({ cart: null });
  },

  openDrawer() {
    set({ isDrawerOpen: true });
  },
  closeDrawer() {
    set({ isDrawerOpen: false });
  },
  setDrawerOpen(open) {
    set({ isDrawerOpen: open });
  },
}));

