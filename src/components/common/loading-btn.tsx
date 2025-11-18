import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoadingBtn = ({ size = 4 }: { size?: number }) => {
  return <Loader2 className={cn(`size-${size}  animate-spin `)}></Loader2>;
};

export default LoadingBtn;
