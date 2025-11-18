// Shared Cart Types
export type SharedCartStatus = "OPEN" | "COMPLETED" | "CANCELLED";

// Request Types
export interface SharedCartCreateRequest {
  title: string;
  ownerId: number;
  expiresAt: string; // ISO date string
}

export interface SharedCartAddItemRequest {
  sharedCartId: number;
  productId: number;
  addByUserId: number;
  quantity: number;
  priceAtAdd: number;
}

export interface SharedCartUpdateQuantityRequest {
  sharedCartId: number;
  productId: number;
  quantity: number;
}

export interface SharedCartRemoveItemRequest {
  sharedCartId: number;
  productId: number;
}

export interface SharedCartInviteRequest {
  sharedCartId: number;
  identifiers: string[]; // email or username
  contributionAmount: number;
}

export interface SharedCartUpdateContributionRequest {
  sharedCartId: number;
  userId: number;
  contributionAmount: number;
}

export interface SharedCartUpdateInfoRequest {
  sharedCartId: number;
  title: string;
  expiresAt: string; // ISO date string
}

export interface SharedCartCheckoutRequest {
  sharedCartId: number;
  paymentMethod: "VNPAY" | "COD" | "MOMO";
}

// Response Types
export interface SharedCartItemDetail {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string | null;
  addedByUserId: number;
  addedByUserName: string;
  quantity: number;
  priceAtAdd: number;
  subtotal: number;
}

export interface SharedCartParticipantDetail {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  contributionAmount: number;
  joinedAt: string; // ISO date string
}

export interface SharedCartDetail {
  id: number;
  title: string;
  ownerId: number;
  ownerName: string;
  expiresAt: string; // ISO date string
  status: SharedCartStatus;
  createdAt: string; // ISO date string
  items: SharedCartItemDetail[];
  participants: SharedCartParticipantDetail[];
  totalAmount: number;
  totalItems: number;
  // Payment information (only available when status is COMPLETED)
  paymentInfo?: {
    paidBy: number; // userId
    paidByName: string;
    paidAmount: number;
    paidAt: string; // ISO date string
    paymentMethod: "VNPAY" | "COD" | "MOMO";
  };
}

export interface SharedCartListItem {
  id: number;
  title: string;
  ownerId: number;
  ownerName: string;
  expiresAt: string; // ISO date string
  status: SharedCartStatus;
  createdAt: string; // ISO date string
  totalItems: number;
  totalParticipants: number;
  totalAmount: number;
}

export interface SharedCartCreateResponse {
  id: number;
  title: string;
  ownerId: number;
  message?: string;
  expiresAt: string; // ISO date string
  createdAt: string; // ISO date string
  status: SharedCartStatus;
}

export interface SharedCartAddItemResponse {
  id: number;
  sharedCartId: number;
  productId: number;
  userId: number;
  quantity: number;
  priceAtAdd: number;
  message?: string;
}

export interface SharedCartInviteResponse {
  id: number;
  sharedCartId: number;
  userId: number;
  contributionAmount: number;
  joinedAt: string; // ISO date string
}

export interface SharedCartCloseResponse {
  id: number;
  title: string;
  status: string;
  message?: string;
}

