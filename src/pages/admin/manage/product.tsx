import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import ProductTable from "../components/table";
import ProductForm from "../components/product-form";
import { useManageProduct } from "@/hook/admin/use-manage-product";
import type { TProductDetail } from "@/types/home.type";

export default function ProductsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TProductDetail | null>(
    null
  );
  const [idCategory, setIdCategory] = useState<number | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    allCategory: categories,
    isPending,
    productByCategoryId,
    deleteProductId,
    addProductFn,
    isPendingAdd,
    updateProductFn,
    isPendingUpdate,
  } = useManageProduct({
    idCat: idCategory ? String(idCategory) : "",
    setIsFormOpen,
  });

  useEffect(() => {
    if (!categories || categories.length === 0 || selectedParentId) {
      return;
    }

    const defaultParent = categories[0];
    setSelectedParentId(defaultParent.id);
    if (defaultParent.children && defaultParent.children.length > 0) {
      setIdCategory(defaultParent.children[0].id);
    } else {
      setIdCategory(defaultParent.id);
    }
  }, [categories, selectedParentId]);

  useEffect(() => {
    if (!idCategory && selectedParentId && categories) {
      const parent = categories.find((cat) => cat.id === selectedParentId);
      if (!parent) return;
      if (parent.children && parent.children.length > 0) {
        setIdCategory(parent.children[0].id);
      } else {
        setIdCategory(parent.id);
      }
    }
  }, [categories, idCategory, selectedParentId]);

  const selectedParent = categories?.find(
    (cat) => cat.id === selectedParentId
  );

  const handleEditProduct = (product: TProductDetail) => {
    setEditingProduct(product);
    setIsFormOpen(true);
    setIsUpdate(true);
  };

  useEffect(() => {
    console.log("render product page", isPendingAdd, isPendingUpdate);
  }, [isPendingAdd, isPendingUpdate]);

  return (
    <div className="min-h-screen ">
      <div className="space-y-6 ">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1 ">Quản Lý Sản Phẩm</h1>
            <p className="text-sm text-muted-foreground">
              Quản lý kho hàng sản phẩm dã ngoại của bạn
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="gap-2"
            size="lg"
          >
            <Plus className="h-5 w-5" />
            Thêm Sản Phẩm
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Tìm kiếm sản phẩm..." className="pl-10" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {isPending
              ? [...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg w-24 h-8 bg-muted animate-pulse"
                  />
                ))
              : categories?.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedParentId(cat.id);
                      if (cat.children && cat.children.length > 0) {
                        setIdCategory(cat.children[0].id);
                      } else {
                        setIdCategory(cat.id);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedParentId === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
          </div>
          {selectedParent?.children && selectedParent.children.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {selectedParent.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => {
                    setIdCategory(child.id);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    idCategory === child.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {child.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Table */}
        <Card className="border-0 py-0">
          <ProductTable
            products={productByCategoryId}
            onEdit={handleEditProduct}
            onDelete={deleteProductId}
          />
        </Card>

        {/* Product Form Modal */}
        {isFormOpen && (
          <ProductForm
            product={editingProduct}
            isUpdate={isUpdate}
            addProductFn={(formData, files) =>
              addProductFn({ formData, files })
            }
            updateProductFn={(formData, files, id) =>
              updateProductFn({ formData, files, id })
            }
            isPending={isPendingAdd || isPendingUpdate}
            onClose={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
}

