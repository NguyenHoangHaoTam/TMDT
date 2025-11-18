import { create } from "zustand";
import type {
  SharedCartDetail,
  SharedCartListItem,
  SharedCartCreateRequest,
  SharedCartAddItemRequest,
  SharedCartUpdateQuantityRequest,
  SharedCartRemoveItemRequest,
  SharedCartInviteRequest,
  SharedCartUpdateContributionRequest,
  SharedCartUpdateInfoRequest,
  SharedCartCheckoutRequest,
} from "@/types/shared-cart.type";
import {
  createSharedCart,
  getSharedCartList,
  getSharedCartDetail,
  updateSharedCartInfo,
  closeSharedCart,
  cancelSharedCart,
  addItemToSharedCart,
  updateSharedCartItemQuantity,
  removeItemFromSharedCart,
  inviteToSharedCart,
  updateParticipantContribution,
  leaveSharedCart,
  removeParticipant,
  checkoutSharedCart,
} from "@/service/shared-cart";
import { useAuthStore } from "./use-auth.store";

interface SharedCartState {
  // List state
  cartList: SharedCartListItem[];
  isLoadingList: boolean;
  
  // Detail state
  currentCart: SharedCartDetail | null;
  isLoadingDetail: boolean;
  
  // Actions
  fetchCartList: () => Promise<void>;
  fetchCartDetail: (id: number | string) => Promise<void>;
  createCart: (payload: Omit<SharedCartCreateRequest, "ownerId">) => Promise<boolean>;
  updateCartInfo: (payload: SharedCartUpdateInfoRequest) => Promise<void>;
  closeCart: (id: number | string) => Promise<void>;
  cancelCart: (id: number | string) => Promise<void>;
  addItem: (payload: Omit<SharedCartAddItemRequest, "addByUserId">) => Promise<void>;
  updateQuantity: (payload: SharedCartUpdateQuantityRequest) => Promise<void>;
  removeItem: (payload: SharedCartRemoveItemRequest) => Promise<void>;
  invite: (payload: SharedCartInviteRequest) => Promise<void>;
  updateContribution: (payload: SharedCartUpdateContributionRequest) => Promise<void>;
  leave: (id: number | string) => Promise<void>;
  removeParticipant: (cartId: number | string, participantUserId: number | string) => Promise<void>;
  checkout: (payload: SharedCartCheckoutRequest) => Promise<string | null>;
  clearCurrentCart: () => void;
}

export const useSharedCartStore = create<SharedCartState>((set, get) => ({
  cartList: [],
  isLoadingList: false,
  currentCart: null,
  isLoadingDetail: false,

  async fetchCartList() {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ cartList: [] });
      return;
    }
    set({ isLoadingList: true });
    try {
      const list = await getSharedCartList();
      set({ cartList: list });
    } catch (error) {
      console.error("fetchCartList error:", error);
      set({ cartList: [] });
    } finally {
      set({ isLoadingList: false });
    }
  },

  async fetchCartDetail(id) {
    set({ isLoadingDetail: true });
    try {
      const detail = await getSharedCartDetail(id);
      set({ currentCart: detail });
    } catch (error) {
      console.error("fetchCartDetail error:", error);
      set({ currentCart: null });
    } finally {
      set({ isLoadingDetail: false });
    }
  },

  async createCart(payload) {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new Error("UNAUTHENTICATED");
    }
    try {
      const newCart = await createSharedCart(payload);
      if (newCart) {
        // Refresh list
        await get().fetchCartList();
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  },

  async updateCartInfo(payload) {
    try {
      await updateSharedCartInfo(payload);
      // Refresh current cart if it's the one being updated
      if (get().currentCart?.id === payload.sharedCartId) {
        await get().fetchCartDetail(payload.sharedCartId);
      }
      // Refresh list
      await get().fetchCartList();
    } catch (error) {
      throw error;
    }
  },

  async closeCart(id) {
    try {
      await closeSharedCart(id);
      // Refresh current cart if it's the one being closed
      if (get().currentCart?.id === id) {
        await get().fetchCartDetail(id);
      }
      // Refresh list
      await get().fetchCartList();
    } catch (error) {
      throw error;
    }
  },

  async cancelCart(id) {
    try {
      await cancelSharedCart(id);
      // Refresh current cart if it's the one being cancelled
      if (get().currentCart?.id === id) {
        await get().fetchCartDetail(id);
      }
      // Refresh list
      await get().fetchCartList();
    } catch (error) {
      throw error;
    }
  },

  async addItem(payload) {
    try {
      await addItemToSharedCart(payload);
      // Refresh current cart if it's the one being updated
      if (get().currentCart?.id === payload.sharedCartId) {
        await get().fetchCartDetail(payload.sharedCartId);
      }
      // Refresh list
      await get().fetchCartList();
    } catch (error) {
      throw error;
    }
  },

  async updateQuantity(payload) {
    try {
      await updateSharedCartItemQuantity(payload);
      // Refresh current cart if it's the one being updated
      if (get().currentCart?.id === payload.sharedCartId) {
        await get().fetchCartDetail(payload.sharedCartId);
      }
      // Refresh list
      await get().fetchCartList();
    } catch (error) {
      throw error;
    }
  },

  async removeItem(payload) {
    try {
      await removeItemFromSharedCart(payload);
      // Refresh current cart if it's the one being updated
      if (get().currentCart?.id === payload.sharedCartId) {
        await get().fetchCartDetail(payload.sharedCartId);
      }
      // Refresh list
      await get().fetchCartList();
    } catch (error) {
      throw error;
    }
  },

  async invite(payload) {
    try {
      await inviteToSharedCart(payload);
      // Refresh current cart if it's the one being updated
      if (get().currentCart?.id === payload.sharedCartId) {
        await get().fetchCartDetail(payload.sharedCartId);
      }
      // Refresh list
      await get().fetchCartList();
    } catch (error) {
      throw error;
    }
  },

  async updateContribution(payload) {
    try {
      await updateParticipantContribution(payload);
      // Refresh current cart if it's the one being updated
      if (get().currentCart?.id === payload.sharedCartId) {
        await get().fetchCartDetail(payload.sharedCartId);
      }
    } catch (error) {
      throw error;
    }
  },

  async leave(id) {
    try {
      await leaveSharedCart(id);
      // Clear current cart if leaving it
      if (get().currentCart?.id === id) {
        set({ currentCart: null });
      }
      // Refresh list
      await get().fetchCartList();
    } catch (error) {
      throw error;
    }
  },

  async removeParticipant(cartId, participantUserId) {
    try {
      await removeParticipant(cartId, participantUserId);
      // Refresh current cart if it's the one being updated
      if (get().currentCart?.id === cartId) {
        await get().fetchCartDetail(cartId);
      }
    } catch (error) {
      throw error;
    }
  },

  async checkout(payload) {
    try {
      const paymentUrl = await checkoutSharedCart(payload);
      // Refresh current cart if it's the one being checked out
      if (get().currentCart?.id === payload.sharedCartId) {
        await get().fetchCartDetail(payload.sharedCartId);
      }
      // Refresh list
      await get().fetchCartList();
      return paymentUrl;
    } catch (error) {
      throw error;
    }
  },

  clearCurrentCart() {
    set({ currentCart: null });
  },
}));

