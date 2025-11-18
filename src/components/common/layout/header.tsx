import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  UserRound,
  ChevronDown,
  LogOut,
  Tent,
  Table,
  Bed,
  BedDouble,
  TreePine,
  Package,
  Utensils,
  Flame,
  Shirt,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuthStore } from "@/store/use-auth.store";
import { useCartStore } from "@/store/use-cart.store";
import toast from "@/components/ui/use-toast";
import { useCategories } from "@/hook/category/use-category";
import type { TCategory } from "@/types/category.type";
import { NotificationBell } from "@/components/notification/NotificationBell";

const Header = () => {
  const { user, clearAuth } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { rootCategories, isPending: isLoadingCategories } = useCategories();

  // Tính số lượng sản phẩm và tổng tiền
  const totalQuantity = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  const totalAmount = cart?.totalAmount ?? 0;
  
  const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Fetch cart khi user đăng nhập
  useEffect(() => {
    if (user) {
      fetchCart().catch(() => undefined);
    }
  }, [user, fetchCart]);

  useEffect(() => {
    if (!isLoadingCategories && rootCategories.length > 0) {
      const childNames = rootCategories.flatMap((cat) => cat.children ?? []).map((c) => c.name);
      const uniqueSlugs = Array.from(new Set(childNames.map((n) => slugify(n))));
      if (uniqueSlugs.length > 0) {
        console.log("[Category slugs] Drop images into src/assets/categories/ with these filenames:");
        console.log(uniqueSlugs.map((s) => `${s}.png`).join(", "));
      }
    }
  }, [isLoadingCategories, rootCategories]);

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("token");
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (location.pathname === "/") {
        navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`, { replace: true });
        setTimeout(() => {
          const searchResults = document.getElementById("search-results");
          if (searchResults) {
            searchResults.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-green-primary text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="GOPICNIC" className="h-10 w-auto rounded-sm" />
              <span className="text-[26px] font-semibold tracking-tight">GOPICNIC</span>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 mx-6 max-w-3xl hidden md:block">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm, đồ dã ngoại..."
                  className="w-full rounded-full bg-white text-gray-800 placeholder:text-gray-400 pl-10 pr-4 py-3 text-[15px] outline-none border-0 focus:ring-2 focus:ring-white/40"
                />
              </div>
            </form>

            <div className="flex items-center gap-6">
              {user ? (
                <AccountMenu 
                  onNavigateAccount={() => navigate("/account")} 
                  onLogout={handleLogout} 
                />
              ) : (
                <div className="flex items-center gap-2 hover:opacity-90">
                  <UserRound size={22} />
                  <Link to="/login" className="text-[15px]">
                    Đăng nhập
                  </Link>
                  <span className="opacity-80">/</span>
                  <Link to="/register" className="text-[15px]">
                    Đăng ký
                  </Link>
                </div>
              )}

              <div className="h-6 w-px bg-white/50" />

              <Link to="/cart" className="relative flex items-center gap-2 hover:opacity-90 group">
                <div className="relative">
                  <ShoppingCart size={22} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] px-1">
                      {totalQuantity > 99 ? "99+" : totalQuantity}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px]">Giỏ hàng</span>
                  {totalAmount > 0 && (
                    <span className="text-xs opacity-90 font-semibold">
                      {formatCurrency(totalAmount)}
                    </span>
                  )}
                </div>
              </Link>

              {user && (
                <>
                  <div className="h-6 w-px bg-white/50" />
                  <NotificationBell />
                  <div className="h-6 w-px bg-white/50" />
                  <Link to="/shared-carts" className="flex items-center gap-2 hover:opacity-90">
                    <Users size={22} />
                    <span className="text-[15px]">Giỏ hàng chung</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full rounded-full bg-white text-gray-800 placeholder:text-gray-400 pl-10 pr-4 py-3 text-[15px] outline-none border-0 focus:ring-2 focus:ring-white/40"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="bg-[#f7f7f7] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex w-full overflow-x-auto md:overflow-x-visible justify-start md:justify-center">
            <div className="flex items-center gap-6 py-3">
              {isLoadingCategories ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-9 w-40 rounded-full bg-gray-200/80 animate-pulse"
                  />
                ))
              ) : rootCategories.length > 0 ? (
                rootCategories.map((category) => (
                  <CategoryMenuItem key={category.id} category={category} />
                ))
              ) : (
                <div className="text-sm text-gray-500 py-2">
                  Không có danh mục
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const iconMappings: Array<{ icon: LucideIcon; keywords: string[] }> = [
  {
    icon: Tent,
    keywords: ["lều", "tăng", "trại", "camp", "cắm trại"],
  },
  {
    icon: Table,
    keywords: ["bàn", "ghế", "bàn ghế"],
  },
  {
    icon: Bed,
    keywords: ["túi ngủ", "đệm ngủ", "gối"],
  },
  {
    icon: BedDouble,
    keywords: ["giường", "võng"],
  },
  {
    icon: Utensils,
    keywords: ["đồ ăn", "đồ uống", "ẩm thực", "thực phẩm", "ăn uống"],
  },
  {
    icon: Flame,
    keywords: ["nấu", "nướng", "bếp", "đun", "cooking"],
  },
  {
    icon: Shirt,
    keywords: ["thời trang", "quần áo", "trang phục", "áo", "giày dép"],
  },
  {
    icon: Sparkles,
    keywords: ["tiện ích", "vệ sinh", "cá nhân", "hygiene", "chăm sóc"],
  },
  {
    icon: Package,
    keywords: ["phụ kiện", "dụng cụ", "gậy", "xe", "đồ nghề"],
  },
];

const getCategoryIcon = (categoryName: string): LucideIcon => {
  const normalizedName = categoryName.toLowerCase();

  const matchedMapping = iconMappings.find((mapping) =>
    mapping.keywords.some((keyword) => normalizedName.includes(keyword))
  );

  if (matchedMapping) {
    return matchedMapping.icon;
  }

  return TreePine;
};


const categoryImageModules = import.meta.glob(
  "/src/assets/categories/*.{png,jpg,jpeg,svg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const categorySlugToUrl: Record<string, string> = {};
for (const fullPath in categoryImageModules) {
  const fileName = fullPath.split("/").pop() || "";
  const baseName = fileName.replace(/\.(png|jpe?g|svg|webp)$/i, "");
  categorySlugToUrl[baseName] = categoryImageModules[fullPath];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const CategoryImage = ({
  name,
  providedUrl,
  className,
  icon: FallbackIcon,
  size = 22,
}: {
  name: string;
  providedUrl?: string;
  className?: string;
  icon: LucideIcon;
  size?: number;
}) => {
  const [hasError, setHasError] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);

  const slug = slugify(name);
  const srcFromSrcAssets = categorySlugToUrl[slug];
  const publicCandidates = [
    `/assets/categories/${slug}.png`,
    `/assets/categories/${slug}.jpg`,
    `/assets/categories/${slug}.jpeg`,
    `/assets/categories/${slug}.svg`,
    `/assets/categories/${slug}.webp`,
  ];

  const candidates = [
    ...(providedUrl ? [providedUrl] : []),
    ...(srcFromSrcAssets ? [srcFromSrcAssets] : []),
    ...publicCandidates,
  ];

  const src = candidates[candidateIndex];

  if (hasError) {
    return <FallbackIcon size={size} className="text-green-primary" />;
  }

  console.debug("[CategoryImage] slug:", slug, "candidates:", candidates);

  return (
    <img
      src={src}
      alt={name}
      className={className}
      loading="lazy"
      onError={() => {

        console.warn("[CategoryImage] load failed:", name, "->", src);
        if (candidateIndex < candidates.length - 1) {
          setCandidateIndex((idx) => idx + 1);
        } else {
          setHasError(true);
        }
      }}
    />
  );
};


const CategoryMenuItem = ({ category }: { category: TCategory }) => {
  const navigate = useNavigate();
  const directChildren = category.children || [];
  const hasChildren = directChildren.length > 0;
  const RootIcon = getCategoryIcon(category.name);

  const handleClick = () => {
    if (!hasChildren) {
      navigate(`/products?category=${category.id}`);
    } else {
      navigate(`/products?category=${category.id}`);
    }
  };

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleClick}
        aria-haspopup={hasChildren ? "menu" : undefined}
        aria-expanded="false"
        className="inline-flex items-center gap-2 rounded-full border border-green-primary text-green-primary bg-white text-xs font-medium px-5 py-2 whitespace-nowrap transition-all duration-200 hover:shadow-md group-hover:bg-green-primary group-hover:text-white focus:outline-none focus:ring-2 focus:ring-green-primary/40"
      >
        <RootIcon size={16} />
        {category.name.toUpperCase()}
        {hasChildren && <ChevronDown size={16} />}
      </button>
      {hasChildren && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-auto min-w-[340px] max-w-[480px] rounded-xl border border-gray-200 bg-white shadow-2xl z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-auto"
          role="menu"
          onMouseEnter={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="p-4 max-h-[420px] overflow-y-auto">
            <div className="px-1 pb-2 text-sm font-semibold text-gray-700">
              {category.name}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {directChildren.map((child) => {
                const ChildIcon = getCategoryIcon(child.name);
                const imgUrl =
                  (child as unknown as { imageUrl?: string }).imageUrl ||
                  (child as unknown as { iconUrl?: string }).iconUrl ||
                  (child as unknown as { thumbnail?: string }).thumbnail ||
                  (child as unknown as { image?: string }).image;
                return (
                  <Link
                    key={child.id}
                    to={`/products?category=${child.id}`}
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-primary/30"
                    role="menuitem"
                    title={child.name}
                  >
                    <div className="rounded-md flex-shrink-0 flex items-center justify-center bg-gray-100 border border-gray-200 h-9 w-9 overflow-hidden">
                      <CategoryImage
                        name={child.name}
                        providedUrl={imgUrl}
                        className="h-8 w-8 object-contain"
                        icon={ChildIcon}
                        size={22}
                      />
                    </div>
                    <span className="truncate text-sm font-medium text-gray-800 group-hover:text-green-primary">
                      {child.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AccountMenu = ({
  onNavigateAccount,
  onLogout,
}: {
  onNavigateAccount: () => void;
  onLogout: () => void;
}) => {
  return (
    <div className="relative group">
      <button
        type="button"
        aria-haspopup="menu"
        className="flex items-center gap-2 hover:opacity-90"
      >
        <UserRound size={22} />
        <ChevronDown size={18} />
      </button>

      <div
        role="menu"
        className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-xl z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
      >
        <button
          type="button"
          onClick={onNavigateAccount}
          className="w-full text-left px-4 py-2.5 text-[15px] hover:bg-gray-50 transition-colors"
        >
          Hồ sơ cá nhân
        </button>
        <div className="h-px bg-gray-200 mx-2" />
        <button
          type="button"
          onClick={onLogout}
          className="w-full text-left px-4 py-2.5 text-[15px] hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};
