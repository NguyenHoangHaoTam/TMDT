import { Edit2, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TProductDetail } from "@/types/home.type";
interface ProductTableProps {
  products?: TProductDetail[];
  onEdit: (product: TProductDetail) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: Readonly<ProductTableProps>) {
  return (
    <div className="space-y-3">
      {products?.length === 0 || !products ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <Package className="h-12 w-12 text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">Không có sản phẩm nào</p>
          <p className="text-slate-400 text-sm">
            Thêm sản phẩm mới để bắt đầu quản lý
          </p>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-sm">
                <tr className="border-b border-slate-200">
                  <th className="px-2 py-4 text-left text-sm font-semibold text-slate-700">
                    Sản Phẩm
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Danh Mục
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Giá
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Kho
                  </th>
                  <th className="px-2 py-4 text-right text-sm font-semibold text-slate-700">
                    Hành Động
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {products?.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-emerald-50 transition-colors duration-200 group"
                  >
                    <td className="px-2 py-4 max-w-[270px]">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={product.images?.[0]?.url || "/placeholder.svg"}
                            alt={product.name}
                            className="h-14 w-14 rounded-lg object-cover ring-2 ring-slate-100 group-hover:ring-emerald-200 transition-all"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                        {product.categoryName}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-emerald-600 text-lg">
                        {product.price.toLocaleString("vi-VN")} ₫
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                            product.stockQuantity > 10
                              ? "bg-emerald-100 text-emerald-700"
                              : product.stockQuantity > 0
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.stockQuantity} cái
                        </span>
                        <span className="text-xs text-slate-500">
                          {product.stockQuantity > 10
                            ? "✓ Có sẵn"
                            : product.stockQuantity > 0
                            ? "⚠ Sắp hết"
                            : "✕ Hết"}
                        </span>
                      </div>
                    </td>

                    <td className="px-2 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(product)}
                          className="hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all p-2"
                          title="Sửa"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(product.id)}
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
}