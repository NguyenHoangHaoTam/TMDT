import { cn } from "@/lib/utils";
import type { TProductDetail } from "@/types/home.type";
import { formatMoney } from "@/utils/helper";
import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const CardProduct = ({
  product,
  className,
}: {
  product: TProductDetail;
  className?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "bg-white rounded-lg cursor-pointer h-full overflow-hidden relative shadow-sm hover:shadow-md transition-shadow flex-none sm:w-[200px] lg:w-[260px]",
        className
      )}
      onClick={() =>
        navigate(`/products/${product?.slug}`)
      }
    >
      <div className="relative overflow-hidden bg-gray-100 h-[270px] aspect-square flex items-center justify-center  group">
        <img
          src={
            product?.images?.[0]?.url ?? "/src/assets/img/img-placeholder.png"
          }
          alt={product?.name || "product default view"}
          className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 group-hover:opacity-60"
        />

        <img
          src={product?.images?.[1]?.url ?? "/src/assets/about-1.jpg"}
          alt="hover img"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:scale-105"
        />
      </div>
      {!!product?.discountRate && (
        <div className=" top-2 right-2 bg-yellow-500 text-sm text-background text-center px-2 py-0.5 flex justify-center items-center rounded-2xl absolute  ">
          -{(product?.discountRate * 100)?.toFixed(0) ?? ""}%
        </div>
      )}

      <div className="px-4 pb-4 mt-3 ">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold min-h-12 line-clamp-2 text-foreground hover:text-green-primary/70 transition-colors cursor-pointer">
            {product?.name ? (
              <Tooltip>
                <TooltipTrigger className="block cursor-pointer overflow-hidden text-left">
                  {product?.name}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{product?.name}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              "--"
            )}
          </h3>

          <div className="flex items-center gap-2  justify-between">
            <span
              className={cn(
                "text-xs text-green-primary font-medium",
                product?.stockQuantity > 0 ? "" : "text-red-600"
              )}
            >
              {product?.stockQuantity > 0 ? "✓ Còn hàng" : "✗ Hết hàng"}
            </span>
            <div className=" flex items-center gap-1 ">
              <span className="text-base font-semibold text-foreground">
                {product?.ranking?.toFixed(1) ?? "0"}
              </span>
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <p
              className={cn(
                "text-base font-bold text-green-primary",
                !!product?.discountRate &&
                  "line-through text-muted-foreground text-sm"
              )}
            >
              {formatMoney(product?.price ?? 0)}đ
            </p>

            {!!product?.discountRate && (
              <span className="text-base font-bold text-green-primary">
                {formatMoney(
                  product?.price - product?.discountRate * product?.price || 0
                )}
                đ
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
