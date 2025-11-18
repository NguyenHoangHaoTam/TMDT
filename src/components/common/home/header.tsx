import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function CarouselPlugin({ className }: { readonly className?: string }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  const navigate = useNavigate();

  const slides = React.useMemo(
    () => [
      {
        id: "outdoor-store",
        image: "/src/assets/img/img5.jpg",
        title: "Cửa hàng dã ngoại",
        subtitle: "Lều và thảm dã ngoại ngoài trời",
        category: 6,
      },
      {
        id: "cooler-box",
        image: "/src/assets/blog/2.png",
        title: "Thùng Đá Giữ Nhiệt",
        subtitle: "Thùng đá xếp thương hiệu hàng đầu thế giới",
        category: 18,
      },
    ],
    []
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true }}
      className={cn("w-full border-none shadow-none h-full ", className)}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-full p-0 border-none shadow-none">
        {slides.map((slide) => (
          <CarouselItem
            key={slide.id}
            className="h-full border-none shadow-none"
          >
            <div className="h-full border-none">
              <Card className="h-full border-none shadow-none py-0">
                <CardContent className=" h-full w-full px-0 border-none  shadow-none relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="size-full rounded-lg object-cover"
                  />

                  <div className="absolute top-6 -translate-x-1/2  left-1/2 space-y-3">
                    <div className="text-center text-white">
                      <p className="text-2xl">{slide.title}</p>
                      <p className="text-xl">{slide.subtitle}</p>
                    </div>

                    <div className="flex justify-center items-center">
                      <button
                        className="bg-green-primary px-5 py-2 mx-auto text-lg cursor-pointer text-white rounded-md"
                        onClick={() =>
                          navigate(`/products?category=${slide.category}`)
                        }
                      >
                        Xem ngay
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute top-1/2 bg-transparent hover:bg-transparent left-4 z-10 border-none text-muted-foreground cursor-pointer" />
      <CarouselNext className="absolute top-1/2 right-4 z-10 border-none text-muted-foreground bg-transparent hover:bg-transparent cursor-pointer" />
    </Carousel>
  );
}
