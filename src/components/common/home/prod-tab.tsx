import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardProduct from "../card-product";
import type { TProductDetail } from "@/types/home.type";
import type { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonCardProduct from "../skeleton-card-product";

const ProductTab = ({
  data,
  isPending,
  activeTab,
  setActiveTab,
}: {
  data?: TProductDetail[];
  isPending: boolean;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      {" "}
      <div className="flex justify-center items-center mb-2">
        <Tabs
          defaultValue="newest"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="w-[400px]"
        >
          <TabsList className="mx-auto flex gap-6  bg-transparent">
            {["newest", "best-seller", "discount"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={`
          relative text-lg font-medium text-gray-600
          transition-all duration-300 ease-in-out
          data-[state=active]:text-muted-foreground
          data-[state=active]:bg-transparent
          data-[state=active]:shadow-none
          after:absolute after:bottom-0 after:left-0 after:h-[1.5px]
          after:w-0 after:bg-green-primary after:transition-all after:duration-300 after:ease-in-out
          hover:after:w-full
          data-[state=active]:after:w-full
          hover:text-muted-foreground
        `}
              >
                {tab === "newest"
                  ? "Mới nhất"
                  : tab === "best-seller"
                  ? "Bán chạy"
                  : "Giảm giá"}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full  px-8 "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="w-full"
            >
              <CarouselContent className="p-0 grow">
                {isPending
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/3 lg:basis-1/5 animate-fade-up"
                      >
                        <div className="p-1">
                          <Card className="bg-transparent border-none p-0 shadow-none">
                            <CardContent className="flex items-center justify-center gap-2 px-0">
                              <SkeletonCardProduct />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))
                  : data?.map((item) => (
                      <CarouselItem
                        key={item?.id}
                        className="md:basis-1/3 lg:basis-1/5 animate-fade-up"
                      >
                        <div className="p-1">
                          <Card className="bg-transparent border-none p-0 shadow-none">
                            <CardContent className="flex items-center justify-center gap-2 px-0">
                              <CardProduct product={item} />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
              </CarouselContent>
            </motion.div>
          </AnimatePresence>

          <CarouselPrevious className="  text-sm hover:bg-green-primary hover:text-white  duration-500 absolute top-1/2 bg-transparent p-1 left-1 z-10 border-none text-muted-foreground cursor-pointer" />
          <CarouselNext className=" hover:bg-green-primary absolute top-1/2 duration-500 hover:text-white bg-transparent p-1 right-1 z-10 border-none text-muted-foreground cursor-pointer" />
        </Carousel>
      </div>
    </div>
  );
};
export default ProductTab;
