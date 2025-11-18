"use client";

import { Edit2, Trash2, Lock, LockOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onToggleLock: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onToggleLock,
}) => {
  return (
    <div className="space-y-3">
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <Users className="h-12 w-12 text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">Không có người dùng nào</p>
          <p className="text-slate-400 text-sm">
            Thêm người dùng mới để bắt đầu quản lý
          </p>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Người Dùng
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Vai Trò
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Trạng Thái
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Ngày Tham Gia
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    Hành Động
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
            <table className="w-full">
              <tbody className="divide-y divide-slate-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-emerald-50 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {user.name}
                        </p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status === "active" ? "Hoạt động" : "Đã khóa"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(user.joinDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(user)}
                          className="hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all p-2"
                          title="Sửa"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onToggleLock(user.id)}
                          className={`transition-all p-2 ${
                            user.status === "active"
                              ? "hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
                              : "hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                          }`}
                          title={
                            user.status === "active"
                              ? "Khóa tài khoản"
                              : "Mở khóa"
                          }
                        >
                          {user.status === "active" ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <LockOpen className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(user.id)}
                          className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all text-slate-600 p-2"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export { UserTable };