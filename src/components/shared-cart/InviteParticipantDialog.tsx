import { useState } from "react";
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
import { X } from "lucide-react";

interface InviteParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sharedCartId: number;
}

export function InviteParticipantDialog({
  open,
  onOpenChange,
  sharedCartId,
}: InviteParticipantDialogProps) {
  const { invite } = useSharedCartStore();
  const [identifiers, setIdentifiers] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddIdentifier = () => {
    setIdentifiers([...identifiers, ""]);
  };

  const handleRemoveIdentifier = (index: number) => {
    setIdentifiers(identifiers.filter((_, i) => i !== index));
  };

  const handleIdentifierChange = (index: number, value: string) => {
    const newIdentifiers = [...identifiers];
    newIdentifiers[index] = value;
    setIdentifiers(newIdentifiers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validIdentifiers = identifiers
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (validIdentifiers.length === 0) {
      return;
    }

    setIsLoading(true);
    try {
      await invite({
        sharedCartId,
        identifiers: validIdentifiers,
        contributionAmount: 0,
      });
      setIdentifiers([""]);
      onOpenChange(false);
    } catch (error) {
      console.error("Invite error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Mời người tham gia</DialogTitle>
          <DialogDescription>
            Mời bạn bè tham gia giỏ hàng chung bằng email hoặc username
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email hoặc Username *</Label>
              {identifiers.map((identifier, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="email@example.com hoặc username"
                    value={identifier}
                    onChange={(e) => handleIdentifierChange(index, e.target.value)}
                    disabled={isLoading}
                  />
                  {identifiers.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveIdentifier(index)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddIdentifier}
                disabled={isLoading}
              >
                + Thêm người
              </Button>
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
            <Button
              type="submit"
              disabled={
                isLoading ||
                identifiers.every((id) => !id.trim())
              }
            >
              {isLoading ? "Đang mời..." : "Gửi lời mời"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

