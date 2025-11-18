"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import type { User } from "@/types/user";
import { UserTable } from "../components/user/user-table";
import Pagination from "../components/pagination";
import UserForm from "../components/user/user-form";

const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    role: "user",
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Lê Minh C",
    email: "leminhc@email.com",
    role: "user",
    status: "locked",
    joinDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Phạm Quốc D",
    email: "phamquocd@email.com",
    role: "user",
    status: "active",
    joinDate: "2024-04-05",
  },
  {
    id: 5,
    name: "Vũ Hồng E",
    email: "vuhonge@email.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-01",
  },
  {
    id: 6,
    name: "Đặng Thế F",
    email: "dangthef@email.com",
    role: "user",
    status: "active",
    joinDate: "2024-05-12",
  },
  {
    id: 7,
    name: "Bùi Anh G",
    email: "buianng@email.com",
    role: "user",
    status: "locked",
    joinDate: "2024-02-28",
  },
  {
    id: 8,
    name: "Hoàng Hữu H",
    email: "hoanghuu@email.com",
    role: "user",
    status: "active",
    joinDate: "2024-03-15",
  },
];

const ITEMS_PER_PAGE = 5;

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const roles = ["Tất cả", "admin", "user"];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "Tất cả" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleAddUser = (data: Omit<User, "id" | "joinDate">) => {
    const newUser: User = {
      ...data,
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      joinDate: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newUser]);
    setIsFormOpen(false);
  };

  const handleUpdateUser = (data: Omit<User, "id" | "joinDate">) => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...data, id: u.id, joinDate: u.joinDate }
            : u
        )
      );
      setEditingUser(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    if (paginatedUsers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleToggleLock = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "locked" : "active" }
          : u
      )
    );
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Quản Lý Người Dùng
            </h1>
            <p className="text-sm text-muted-foreground">
              Quản lý tài khoản và quyền hạn người dùng
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingUser(null);
              setIsFormOpen(true);
            }}
            className="gap-2"
            size="lg"
          >
            <Plus className="h-5 w-5" />
            Thêm Người Dùng
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="flex gap-2 flex-wrap">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedRole === role
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {role === "admin" ? "Admin" : role === "user" ? "User" : role}
              </button>
            ))}
          </div>
        </div>

        {/* User Table */}
        <Card className="border-0">
          <UserTable
            users={paginatedUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onToggleLock={handleToggleLock}
          />
        </Card>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* User Form Modal */}
        {isFormOpen && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleUpdateUser : handleAddUser}
            onClose={() => {
              setIsFormOpen(false);
              setEditingUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
}