import { cn } from "@/lib/utils";

type CheckoutStep = "cart" | "checkout" | "success";

const STEPS: Array<{ id: CheckoutStep; label: string }> = [
  { id: "cart", label: "Giỏ hàng" },
  { id: "checkout", label: "Đặt hàng" },
  { id: "success", label: "Đặt hàng thành công" },
];

type CheckoutProgressProps = {
  currentStep?: CheckoutStep;
  className?: string;
};

const CheckoutProgress = ({ currentStep = "cart", className }: CheckoutProgressProps) => {
  const currentIndex = Math.max(0, STEPS.findIndex((step) => step.id === currentStep));

  return (
    <div className={cn("rounded-2xl border bg-white p-4 shadow-sm", className)}>
      <div className="grid grid-cols-3 gap-4 text-center text-xs font-semibold uppercase tracking-wide">
        {STEPS.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-orange-600"
                    : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                )}
              >
                {step.label}
              </span>
              <span
                className={cn(
                  "inline-block h-1 w-full rounded-full bg-gray-200 transition-colors",
                  isActive && "bg-orange-500",
                  isCompleted && "bg-green-500"
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutProgress;


