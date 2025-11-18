import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSharedCartStore } from "@/store/use-shared-cart.store";

interface CreateSharedCartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (data: { title: string; expiresAt: string }) => Promise<void>;
}

export function CreateSharedCartDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateSharedCartDialogProps) {
  const { createCart } = useSharedCartStore();
  const [title, setTitle] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set default expiry to 7 days from now
  const getDefaultExpiry = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
  };

  // Set default expiry when dialog opens
  useEffect(() => {
    if (open) {
      setExpiresAt(getDefaultExpiry());
    } else {
      // Reset form when dialog closes
      setTitle("");
      setExpiresAt("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !expiresAt) {
      return;
    }

    setIsLoading(true);
    try {
      if (onCreate) {
        await onCreate({
          title: title.trim(),
          expiresAt: new Date(expiresAt).toISOString(),
        });
      } else {
        const success = await createCart({
          title: title.trim(),
          expiresAt: new Date(expiresAt).toISOString(),
        });
        if (success) {
          setTitle("");
          setExpiresAt("");
          onOpenChange(false);
        }
      }
    } catch (error) {
      console.error("Create cart error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tạo giỏ hàng chung mới</DialogTitle>
          <DialogDescription>
            Tạo một giỏ hàng chung để mời bạn bè cùng mua sắm
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tên giỏ hàng *</Label>
              <Input
                id="title"
                placeholder="Ví dụ: Giỏ hàng picnic cuối tuần"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiresAt">Hạn sử dụng *</Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                value={expiresAt || getDefaultExpiry()}
                onChange={(e) => setExpiresAt(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Giỏ hàng sẽ tự động đóng sau thời gian này
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading || !title.trim()}>
              {isLoading ? "Đang tạo..." : "Tạo giỏ hàng"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

