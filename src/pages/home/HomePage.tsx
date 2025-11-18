import { CarouselPlugin } from "@/components/common/home/header";
import { listLogo } from "@/utils/constant";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import CardProduct from "@/components/common/card-product";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ChevronRight,
  Clock,
  MessageCircle,
  PhoneCall,
  Send,
} from "lucide-react";
import BlogCard from "@/components/common/home/blog-card";
import { useHomePage, useProdByCategory } from "@/hook/home/use-home";
import ProdFeatured from "@/components/common/home/prod-featured";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import ProductTab from "@/components/common/home/prod-tab";
import SkeletonCardProduct from "@/components/common/skeleton-card-product";
import imgTet from "@/assets/blog/lich-tet-2024.jpg";
import imgSale from "@/assets/blog/wow-sale.jpg";
import imgCct from "@/assets/blog/nhiet-do-mau.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TProductDetail } from "@/types/home.type";

const blogPosts = [
  {
    id: 1,
    date: "04",
    month: "TH2",
    category: "TÍN TỨC",
    categoryColor: "bg-green-600",
    title: "Lịch Nghỉ Tết Nguyên Đán 2024",
    author: "GOPICNIC",
    publishDate: "08/01/2025",
    description:
      "Kính chào quý khách, Nhân dịp đầu năm mới, DI OUTDOOR kính chúc quý khách và gia đình một năm mới An Khang – Thịnh Vượng và gặp nhiều may mắn. Với tất cả sự chân thành, chủ...",
    image: imgTet,
    imageHeight: "h-48",
    to: "/blog/lich-nghi-tet-nguyen-dan-2024",
  },
  {
    id: 2,
    date: "23",
    month: "TH1",
    category: "KHUYẾN MẠI",
    categoryColor: "bg-green-600",
    title: "Chương Trình Giảm Giá Đặc Biệt Cho Đèn Pin",
    author: "GOPICNIC",
    publishDate: "08/01/2025",
    description:
      "Chương Trình Giảm Giá Đặc Biệt: LED2024 - Đón Đầu Xu Hướng Để chào đón mùa xuân sôi động và đáp ứng nhu cầu của công đông yêu thích hoạt động đã ngoài ngoài trời, chúng tôi...",
    image: imgSale,
    imageHeight: "h-48",
    to: "/blog/chuong-trinh-giam-gia-dac-biet-cho-den-pin",
  },
  {
    id: 3,
    date: "23",
    month: "TH1",
    category: "ĐÈN PIN & PIN, THÔNG TIN",
    categoryColor: "bg-green-600",
    title: "Tìm Hiểu Nhiệt Độ Màu Đèn & Màu Ánh Sáng",
    author: "GOPICNIC",
    publishDate: "08/01/2025",
    description:
      "Hiểu rõ về nhiệt độ màu đèn led Trên thị trường đèn pin chiếu sáng hiện nay, với công nghệ LED đang chiếm lĩnh, mỗi người đều tìm kiếm một chiếc đèn pin với nhiệt độ màu hoàn...",
    image: imgCct,
    imageHeight: "h-48",
    to: "/blog/tim-hieu-nhiet-do-mau-den-pin",
  },
];
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("newest");
  const { prodFeatured, prodTab, isPendingTab } = useHomePage(activeTab);
  const results = useProdByCategory(["6", "7"]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const supportRef = useRef<HTMLDivElement | null>(null);

  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  }, [location.search]);

  const filterProducts = (products: TProductDetail[] | undefined): TProductDetail[] => {
    if (!products || !searchQuery.trim()) return products || [];
    
    const searchTerms = searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(term => term.length >= 2); 
    
    if (searchTerms.length === 0) return [];
    
    const isWordMatch = (text: string, term: string, isPrimary: boolean = false): boolean => {
      const lowerText = text.toLowerCase();
      const lowerTerm = term.toLowerCase();
      
      const words = lowerText.split(/[\s\-_,.()\[\]{};:!?/\\|"'`~@#$%^&*+=<>]+/).filter(w => w.length > 0);
      
      for (const word of words) {
        if (word === lowerTerm) {
          return true;
        }
      }
      
      if (lowerTerm.length >= 4 && isPrimary) {
        for (const word of words) {
          if (word.startsWith(lowerTerm) && word.length >= lowerTerm.length + 1) {
            return true;
          }
        }
        if (lowerText.startsWith(lowerTerm)) {
          return true;
        }
      }
      
      
      return false;
    };
    
    return products.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const description = (product.description || "").toLowerCase();
      const categoryName = (product.categoryName || "").toLowerCase();
      
      const primaryMatches = searchTerms.filter((term) => 
        isWordMatch(name, term, true) || isWordMatch(categoryName, term, true)
      );
      
      if (primaryMatches.length === 0) {
        return false;
      }
      

      return searchTerms.every((term) => {
        if (isWordMatch(name, term, true) || isWordMatch(categoryName, term, true)) {
          return true;
        }
        return isWordMatch(description, term, false);
      });
    });
  };

  const allProducts = useMemo(() => {
    const products: TProductDetail[] = [];
    if (prodFeatured) products.push(...prodFeatured);
    if (prodTab) products.push(...prodTab);
    results.forEach((result) => {
      if (result.data) products.push(...result.data);
    });
    const uniqueProducts = products.filter(
      (product, index, self) => index === self.findIndex((p) => p.id === product.id)
    );
    return uniqueProducts;
  }, [prodFeatured, prodTab, results]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return filterProducts(allProducts);
  }, [searchQuery, allProducts]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setTimeout(() => {
        const searchResultsEl = document.getElementById("search-results");
        if (searchResultsEl) {
          searchResultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        supportRef.current &&
        !supportRef.current.contains(event.target as Node)
      ) {
        setIsSupportOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const highlightCards = useMemo(
    () => [
      {
        id: "folding-furniture",
        image: "/src/assets/img/img6.jpg",
        title: "Bàn Ghế Xếp Gọn Dã Ngoại - Cắm Trại",
        subtitle: "",
        buttonText: "XEM NGAY",
        buttonVariant: "primary" as const,
        span: "col-span-2",
        align: "center" as const,
        categoryId: 7,
        searchFallback: "bàn ghế xếp gọn dã ngoại",
      },
      {
        id: "camp-cooking",
        image: "/src/assets/img/img2.jpg",
        title: "Bếp Nồi Du Lịch",
        subtitle: "Cho hoạt động ngoài trời",
        buttonText: "CHI TIẾT",
        buttonVariant: "light" as const,
        span: "",
        align: "left" as const,
        categoryId: 18,
        searchFallback: "bếp du lịch",
      },
      {
        id: "hiking-backpack",
        image: "/src/assets/img/img3.jpg",
        title: "Balo Leo Núi",
        subtitle: "Trợ lực & xếp gọn",
        buttonText: "CHI TIẾT",
        buttonVariant: "light" as const,
        span: "",
        align: "left" as const,
        categoryId: 10,
        searchFallback: "balo leo núi",
      },
    ],
    []
  );

  const multiToolSection = useMemo(
    () => ({
      tagLine: "Leatherman Multi-Tools",
      title: "Dụng cụ đa năng",
      description: "Dụng cụ đa năng cho hoạt động đã ngoài và đi phượt",
      buttonText: "XEM TẤT CẢ",
      categoryId: 21,
      searchFallback: "dụng cụ đa năng",
    }),
    []
  );

  const handleNavigateHighlight = useCallback(
    (categoryId: string | number | undefined, fallbackSearch?: string) => {
      if (categoryId !== undefined) {
        navigate(`/products?category=${categoryId}`);
        return;
      }
      if (fallbackSearch) {
        navigate(`/products?q=${encodeURIComponent(fallbackSearch)}`);
        return;
      }
      navigate("/products");
    },
    [navigate]
  );

  return (
    <div className=" min-h-screen mx-auto">
      <div className="flex px-10 gap-4 w-full py-4   ">
        <div className="w-1/2">
          <CarouselPlugin />
        </div>

        <div className="grid grid-cols-2 gap-4 w-1/2 ">
          {highlightCards.map((card) => (
            <div
              key={card.id}
              className={`overflow-hidden rounded-lg relative ${card.span}`}
            >
              <img
                src={card.image}
                alt={card.title}
                className={`w-full object-cover rounded-lg hover:scale-110 transition-transform duration-500 ${
                  card.span ? "object-right" : ""
                }`}
              />
              <div
                className={`absolute top-6 space-y-3 ${
                  card.align === "center"
                    ? "left-1/2 -translate-x-1/2 text-center"
                    : "left-0 pl-4 text-left"
                }`}
              >
                <div className="text-white">
                  <p
                    className={`${
                      card.span ? "text-3xl font-semibold" : "text-xl font-semibold"
                    } uppercase`}
                  >
                    {card.title}
                  </p>
                  {card.subtitle && (
                    <p className={`${card.span ? "text-xl" : "text-sm"} capitalize`}>
                      {card.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex justify-center items-center">
                  <button
                    className={`px-5 py-2 mx-auto text-lg cursor-pointer rounded-md transition-colors ${
                      card.buttonVariant === "light"
                        ? "bg-white/90 text-green-primary hover:bg-white"
                        : "bg-green-primary text-white hover:bg-green-primary/90"
                    }`}
                    onClick={() =>
                      handleNavigateHighlight(card.categoryId, card.searchFallback)
                    }
                  >
                    {card.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {searchQuery.trim() && (
        <div id="search-results" className="px-10 mt-14">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Kết quả tìm kiếm cho "{searchQuery}"
            </h2>
            <p className="text-muted-foreground">
              Tìm thấy {searchResults.length} sản phẩm
            </p>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Không tìm thấy sản phẩm nào phù hợp với từ khóa "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      )}

      {!searchQuery.trim() && (
        <div className="px-10 mt-14">
          <ProdFeatured />
        </div>
      )}

      <div className="h-40 bg-background grid grid-cols-8 items-center px-10 gap-4 mt-14">
        {listLogo.map((item, index) => (
          <div
            key={`logo-${index}`}
            className="col-span-1 overflow-hidden w-[150px]  flex-none"
          >
            <img
              src={item.src}
              alt={`logo ${index + 1}`}
              className=" object-contain bg-background "
            />
          </div>
        ))}
      </div>

      {!searchQuery.trim() && (
        <div className="py-4 px-10">
          <ProductTab
            data={prodTab}
            isPending={isPendingTab}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {!searchQuery.trim() && (
        <div>
          <div className="px-10 py-4">
            <p className="text-2xl font-semibold mb-2 pl-8">
              {results?.[0]?.data?.[0]?.categoryName}
            </p>

          <div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full  px-8 "
            >
              <CarouselContent className="p-0 ">
                {results?.[0]?.isPending && results?.[1]?.isPending
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
                  : results?.[0]?.data?.map((item) => (
                      <CarouselItem
                        key={item?.id}
                        className="md:basis-1/3 lg:basis-1/5  "
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
              <CarouselPrevious className="  text-sm hover:bg-green-primary hover:text-white  duration-500 absolute top-1/2 bg-transparent p-1 left-1 z-10 border-none text-muted-foreground cursor-pointer" />
              <CarouselNext className=" hover:bg-green-primary absolute top-1/2 duration-500 hover:text-white bg-transparent p-1 right-1 z-10 border-none text-muted-foreground cursor-pointer" />
            </Carousel>
          </div>
        </div>
        <div className="px-10 py-4">
          <p className="text-2xl font-semibold mb-2 pl-8">
            {results?.[1]?.data?.[0]?.categoryName}
          </p>

          <div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full  px-8 "
            >
              <CarouselContent className="p-0 ">
                {results?.[0]?.isPending && results?.[1]?.isPending
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
                  : results?.[1]?.data?.map((item) => (
                      <CarouselItem
                        key={item?.id}
                        className="md:basis-1/3 lg:basis-1/5  "
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
              <CarouselPrevious className="  text-sm hover:bg-green-primary hover:text-white  duration-500 absolute top-1/2 bg-transparent p-1 left-1 z-10 border-none text-muted-foreground cursor-pointer" />
              <CarouselNext className=" hover:bg-green-primary absolute top-1/2 duration-500 hover:text-white bg-transparent p-1 right-1 z-10 border-none text-muted-foreground cursor-pointer" />
            </Carousel>
          </div>
        </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-200">
        <div className="w-full px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start px-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl ">
                <div>
                  <img
                    src="/src/assets/img/leatherman-multitools-home.png.webp"
                    alt="tua vít"
                    className="size-full object-cover bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col justify-center space-y-8 lg:pl-8">
              <div className="space-y-4">
                {multiToolSection.tagLine && (
                  <p className="text-gray-400 text-sm font-medium tracking-wide">
                    {multiToolSection.tagLine}
                  </p>
                )}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-balance">
                  {multiToolSection.title}
                </h1>
                {multiToolSection.description && (
                  <p className="text-gray-600 text-base leading-relaxed">
                    {multiToolSection.description}
                  </p>
                )}
              </div>

              <div>
                <Button
                  className="bg-green-primary hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-300"
                  onClick={() =>
                    handleNavigateHighlight(
                      multiToolSection.categoryId,
                      multiToolSection.searchFallback
                    )
                  }
                >
                  {multiToolSection.buttonText}
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={supportRef}
          className="fixed bottom-8 left-8 flex items-end gap-4 z-50"
        >
          {isSupportOpen && (
            <div className="mb-20 rounded-3xl border border-blue-100 bg-white/95 shadow-2xl shadow-blue-200/50 backdrop-blur-sm transition-all duration-300 w-72">
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    Luôn Sẵn Sàng
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">
                    Hỗ trợ khách hàng
                  </h3>
                </div>
                <span className="inline-flex items-center justify-center rounded-full bg-blue-100 p-2 text-blue-600">
                  <MessageCircle size={18} />
                </span>
              </div>
              <div className="space-y-4 px-6 pb-6">
                <div className="rounded-2xl border border-blue-50 bg-blue-50/60 px-4 py-3 text-sm text-blue-700">
                  <p className="font-semibold">Hotline trải nghiệm</p>
                  <a
                    href="tel:0901234567"
                    className="mt-1 inline-flex items-center gap-1.5 text-base font-bold text-blue-600"
                  >
                    0901 234 567
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <PhoneCall size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">Zalo tư vấn</p>
                      <p className="text-xs text-gray-500">0901 234 567 (GOPICNIC)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                      <Send size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">Messenger</p>
                      <p className="text-xs text-gray-500">
                        Phản hồi trong vòng 15 phút
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Clock size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">Thời gian hoạt động</p>
                      <p className="text-xs text-gray-500">08:00 - 21:00 (Thứ 2 - CN)</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Chat ngay
                </Button>
              </div>
            </div>
          )}
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="Mở hỗ trợ khách hàng"
                  aria-expanded={isSupportOpen}
                  onClick={() => setIsSupportOpen((prev) => !prev)}
                  className="group relative flex h-16 w-16 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/40 duration-[1500ms] group-hover:opacity-0" />
                  <span className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-sky-400 shadow-lg shadow-blue-500/40 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/50" />
                  <span className="absolute inset-1 rounded-full border border-white/40" />
                  <MessageCircle
                    size={26}
                    className="relative text-white transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg"
              >
                Nhắn cho GOPICNIC
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="hidden select-none items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-blue-600 shadow-md backdrop-blur lg:flex">
            Hỗ trợ
          </div>
        </div>
      </div>

      <div className="">
        <div className="border-b  border-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-semibold text-center text-foreground ">
              BLOG ĐÃ NGOÀI
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Khám phá những bài viết mới nhất về đèn pin và thiết bị ngoài trời
            </p>
          </div>
        </div>

        <div className="px-16 mx-auto  py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
