const ApiEndPoint = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  REFRESH_TOKEN: "auth/refresh-token",
  FORGOT_PASSWORD: "auth/forgot-password",
  PRODUCT_FEATURED: "api/products/filter?filter=featured",
  PRODUCT_TAB: "api/products/filter",
  PRODUCT_BY_CATEGORY_BY_ID: "api/products/category",
  GET_CATEGORY: "api/categories",
  DELETE_PRODUCT: "api/products",
  PRODUCT: "api/products",
  CART: "api/cart",
  CART_ADD: "api/cart/add",
  CART_CLEAR: "api/cart/clear",
  CART_REMOVE: (productId: number | string) => `api/cart/item/${productId}`,
  ORDERS_CHECKOUT_VNPAY: "api/orders/checkout-vnpay",
  ORDERS_VNPAY_RETURN: "api/orders/vnpay-return",
  // Shared Cart endpoints
  SHARED_CART_CREATE: "api/shared-carts/create",
  SHARED_CART_LIST: "api/shared-carts/my-carts",
  SHARED_CART_DETAIL: (id: number | string) => `api/shared-carts/${id}`,
  SHARED_CART_CLOSE: (id: number | string) => `api/shared-carts/${id}/close`,
  SHARED_CART_CANCEL: (id: number | string) => `api/shared-carts/${id}/cancel`,
  SHARED_CART_ADD_ITEM: "api/shared-carts/add-item",
  SHARED_CART_UPDATE_QUANTITY: "api/shared-carts/update-quantity",
  SHARED_CART_REMOVE_ITEM: "api/shared-carts/remove-item",
  SHARED_CART_INVITE: "api/shared-carts/invite",
  SHARED_CART_UPDATE_CONTRIBUTION: "api/shared-carts/update-contribution",
  SHARED_CART_LEAVE: (id: number | string) => `api/shared-carts/${id}/leave`,
  SHARED_CART_REMOVE_PARTICIPANT: (cartId: number | string, participantUserId: number | string) => 
    `api/shared-carts/${cartId}/participants/${participantUserId}`,
};

export default ApiEndPoint;
