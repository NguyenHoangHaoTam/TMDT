export interface TCartItem {
  productId: number;
  productName: string;
  productImageUrl: string | null;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface TCart {
  id: number;
  userId: number;
  items: TCartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface AddToCartPayload {
  productId: number;
  quantity: number;
}

