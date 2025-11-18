"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { User } from "@/types/user";

interface UserFormProps {
  user: User | null;
  onSubmit: (data: Omit<User, "id" | "joinDate">) => void;
  onClose: () => void;
}

export default function UserForm({ user, onSubmit, onClose }: UserFormProps) {
  const [formData, setFormData] = useState<Omit<User, "id" | "joinDate">>({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {user ? "Cập Nhật Người Dùng" : "Thêm Người Dùng Mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Tên Người Dùng</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nhập tên người dùng"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Nhập email"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium">Vai Trò</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "admin" | "user",
                })
              }
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Trạng Thái</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "locked",
                })
              }
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="active">Hoạt động</option>
              <option value="locked">Đã khóa</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Hủy
            </Button>
            <Button type="submit" className="flex-1">
              {user ? "Cập Nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}