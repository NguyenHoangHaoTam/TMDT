export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    status: "active" | "locked";
    joinDate: string;
  }