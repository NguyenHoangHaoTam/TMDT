import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { TProductDetail } from "@/types/home.type";
import { type ProductFormData } from "@/service/admin/product/service";
import toast from "@/components/ui/use-toast";
import type { Category } from "@/types/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import LoadingBtn from "@/components/common/loading-btn";

interface ProductFormProps {
  product: TProductDetail | null;
  onClose: () => void;
  categories?: Category[];
  isPending?: boolean;
  addProductFn: (formData: ProductFormData, files: File[]) => void;
  isUpdate?: boolean;
  updateProductFn: (
    formData: ProductFormData,
    files: File[],
    id: number
  ) => void;
}

type NewImagePreview = {
  file: File;
  previewUrl: string;
};

const MAX_IMAGES = 4;
const MAX_IMAGE_SIZE = 1024 * 1024;

export default function ProductForm({
  isUpdate = false,
  product,
  onClose,
  categories,
  isPending,
  addProductFn,
  updateProductFn,
}: Readonly<ProductFormProps>) {
  const [newImages, setNewImages] = useState<NewImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const flatCategories = useMemo(() => {
    if (!categories) {
      return [];
    }
    const traverse = (
      nodes: Category[],
      depth = 0
    ): Array<{
      id: number;
      name: string;
    }> => {
      return nodes.flatMap((node) => {
        const childNodes =
          node.children && node.children.length > 0
            ? traverse(node.children, depth + 1)
            : [];

        return [
          {
            id: node.id,
            name: `${depth > 0 ? `${"- ".repeat(depth)}` : ""}${node.name}`,
          },
          ...childNodes,
        ];
      });
    };

    return traverse(categories);
  }, [categories]);

  const displayedExistingImages = useMemo(
    () => (product?.images ? product.images.slice(0, MAX_IMAGES) : []),
    [product?.images]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const existingCount = displayedExistingImages.length;
    const currentNewCount = newImages.length;
    const remainingSlots = MAX_IMAGES - (existingCount + currentNewCount);

    if (remainingSlots <= 0) {
      toast.error(`Bạn chỉ có thể chọn tối đa ${MAX_IMAGES} hình ảnh.`);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const acceptedFiles = files.filter((file) => {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`"${file.name}" vượt quá 1MB! Vui lòng chọn ảnh nhỏ hơn.`);
        return false;
      }
      return true;
    });

    if (acceptedFiles.length === 0) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const limitedFiles = acceptedFiles.slice(0, remainingSlots);

    setIsUploading(true);

    Promise.all(
      limitedFiles.map(
        (file) =>
          new Promise<NewImagePreview>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                file,
                previewUrl: reader.result as string,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    )
      .then((previews) => {
        setNewImages((prev) => [...prev, ...previews]);
      })
      .catch(() => {
        toast.error("Có lỗi khi đọc file ảnh, vui lòng thử lại.");
      })
      .finally(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setIsUploading(false);
      });
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const [formData, setFormData] = useState({
    name: isUpdate && product ? product.name : "",
    slug: isUpdate && product ? product.slug : "",
    description: isUpdate && product ? product.description : "",
    price: isUpdate && product ? String(product.price) : "",
    stockQuantity: isUpdate && product ? String(product.stockQuantity) : "",
    unit: isUpdate && product ? product?.unit : "cái",
    isActive: true,
    categoryId: isUpdate && product ? product.categoryId : 1,
  });

  useEffect(() => {
    if (isUpdate && product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: String(product.price),
        stockQuantity: String(product.stockQuantity),
        unit: product.unit,
        isActive: true,
        categoryId: product.categoryId,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setNewImages([]);
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        price: "",
        stockQuantity: "",
        unit: "cái",
        isActive: true,
        categoryId: categories?.[0]?.id ?? 1,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setNewImages([]);
    }
    setIsUploading(false);
  }, [isUpdate, product, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filesToUpload = newImages.map((image) => image.file);

    if (isUpdate && product?.id) {
      updateProductFn(formData, filesToUpload, product.id);
    } else {
      addProductFn(formData, filesToUpload);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50  ">
      <Card className="w-full max-w-md p-3 h-[90vh] ">
        <div className="flex items-center justify-between mb-6  ">
          <h2 className="text-xl font-bold">
            {isUpdate ? "Cập Nhật Sản Phẩm" : "Thêm Sản Phẩm Mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 h-[90%]  px-1 overflow-y-auto scroll-pl-0.5"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Tên Sản Phẩm</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Tên sản phẩm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="Tên Slug"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Đơn vị</label>
            <Input
              value={formData.unit}
              onChange={(e) =>
                setFormData({ ...formData, unit: e.target.value })
              }
              placeholder="Tên đơn vị"
              required
            />
          </div>

          {/* Category */}
          <div className="w-full">
            <label className="text-sm font-medium">Danh mục</label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: Number(value) })
              }
              defaultValue={product ? String(product.categoryId) : undefined}
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-lg text-sm h-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <SelectValue placeholder="Chọn danh mục sản phẩm" />
              </SelectTrigger>

              <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200">
                {flatCategories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={String(cat.id)}
                    className="text-gray-700 hover:bg-blue-100 cursor-pointer transition-all"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium">Giá (₫)</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              placeholder="0"
              required
              min={0}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm font-medium">Số Lượng Kho</label>
            <Input
              type="number"
              value={formData.stockQuantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stockQuantity: e.target.value,
                })
              }
              placeholder="0"
              required
              min={0}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Hình Ảnh (tối đa {MAX_IMAGES})
            </label>
            <p className="text-xs text-muted-foreground mt-1">
              Mỗi ảnh không vượt quá 1MB. Ảnh đã có sẽ được giữ nguyên nếu bạn
              không tải ảnh mới.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {displayedExistingImages.map((image) => (
                <div
                  key={image.id}
                  className="relative h-20 w-20 rounded-md border border-slate-200 shadow-sm overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={image.altText ?? product?.name ?? "Ảnh sản phẩm"}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 py-[1px] text-[10px] text-white">
                    Đã có
                  </span>
                </div>
              ))}

              {newImages.map((image, index) => (
                <div
                  key={`new-image-${index}`}
                  className="relative h-20 w-20 rounded-md border border-slate-200 shadow-sm overflow-hidden"
                >
                  <img
                    src={image.previewUrl}
                    alt={`Ảnh mới ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600 transition"
                    title="Xóa ảnh này"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {displayedExistingImages.length + newImages.length < MAX_IMAGES && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm text-slate-500 transition hover:border-emerald-500 hover:text-emerald-600"
                >
                  {isUploading ? "Đang tải..." : <Upload className="h-4 w-4" />}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Mô Tả</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả sản phẩm"
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>

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
              {isPending && <LoadingBtn />}
              {product ? "Cập Nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}