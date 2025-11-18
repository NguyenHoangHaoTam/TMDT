const SharedCartEndPoint = {
  CREATE: "api/shared-carts/create",
  LIST: "api/shared-carts/my-carts",
  DETAIL: (id: number | string) => `api/shared-carts/${id}`,
  UPDATE: (id: number | string) => `api/shared-carts/${id}`,
  CLOSE: (id: number | string) => `api/shared-carts/${id}/close`,
  CANCEL: (id: number | string) => `api/shared-carts/${id}/cancel`,
  ADD_ITEM: "api/shared-carts/add-item",
  UPDATE_QUANTITY: "api/shared-carts/update-quantity",
  REMOVE_ITEM: "api/shared-carts/remove-item",
  INVITE: "api/shared-carts/invite",
  UPDATE_CONTRIBUTION: "api/shared-carts/update-contribution",
  LEAVE: (id: number | string) => `api/shared-carts/${id}/leave`,
  REMOVE_PARTICIPANT: (cartId: number | string, participantUserId: number | string) => 
    `api/shared-carts/${cartId}/participants/${participantUserId}`,
  CHECKOUT: "api/shared-carts/checkout",
};

export default SharedCartEndPoint;

