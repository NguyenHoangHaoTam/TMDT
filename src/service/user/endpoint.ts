const UserEndPoint = {
  PROFILE: "api/users/me", 
  CHANGE_PASSWORD: "api/users/change-password", 
  ADDRESS_ALL: "api/addresses",
  ADDRESS_CREATE: "api/addresses", 
  ADDRESS_UPDATE: (id: number) => `api/addresses/${id}`,
  ADDRESS_DELETE_BY_ID: (id: number) => `api/addresses/${id}`, 
  ADDRESS_SET_DEFAULT: (id: number) => `api/addresses/${id}/default`,
};

export default UserEndPoint;
