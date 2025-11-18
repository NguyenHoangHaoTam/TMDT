import React, { useMemo } from "react";
import ComboImgWithText from "../card-img-with-text";
import { useCategories } from "@/hook/category/use-category";
import { useNavigate } from "react-router-dom";
import { useProdByCategory } from "@/hook/home/use-home";

const CATEGORY_IMAGE_OVERRIDES_BY_ID: Record<string, string> = {};
const CATEGORY_IMAGE_OVERRIDES_BY_NAME: Record<string, string> = {};

function slugifyForFileName(input: string): string {
  const slug = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return slug || "unnamed";
}

const CUSTOM_IMAGE_MODULES = import.meta.glob<true, string, string>(
  "/src/assets/custom/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

function extractSlugFromPath(filePath: string): string {
  const fileName = filePath.split("/").pop() || "";
  const withoutExt = fileName.replace(/\.(png|jpe?g|webp)$/i, "");
  return withoutExt;
}

const CUSTOM_IMAGES_BY_SLUG: Record<string, string> = Object.entries(
  CUSTOM_IMAGE_MODULES as Record<string, string>
).reduce((acc, [path, url]) => {
  const slug = extractSlugFromPath(path);
  acc[slug] = url;
  return acc;
}, {} as Record<string, string>);

const FEATURED_CATEGORY_KEYWORDS = [
  "đèn pin",
  "bếp",
  "lều",
  "bàn",
  "ghế",
  "túi ngủ",
  "balo",
  "giày",
] as const;

const EXCLUDED_CATEGORY_KEYWORDS = [
  "nồi",
  "chảo",
  "dao",
  "đũa",
  "bát",
  "dĩa",
  "đồ ăn",
  "thực phẩm",
  "giữ lạnh",
] as const;

function getImageForCategory(name: string, id?: string | number): string {

  if (id !== undefined) {
    const byId = CATEGORY_IMAGE_OVERRIDES_BY_ID[String(id)];
    if (byId) return byId;
  }

  if (CATEGORY_IMAGE_OVERRIDES_BY_NAME[name]) {
    return CATEGORY_IMAGE_OVERRIDES_BY_NAME[name];
  }

  const nameSlug = slugifyForFileName(name);
  const autoUrl = CUSTOM_IMAGES_BY_SLUG[nameSlug];
  if (autoUrl) {
    return autoUrl;
  }

  return "/src/assets/img/img-placeholder.png";
}

const ProdFeatured = ({
  isPending,
}: {
  isPending?: boolean;
}) => {
  const { rootCategories, isPending: loadingCategories } = useCategories();
  const navigate = useNavigate();

  const childCategories = useMemo(() => {
    const roots = rootCategories || [];
    return roots.flatMap((c) => c.children || []);
  }, [rootCategories]);

  const childIds = useMemo(
    () => childCategories.map((c) => String(c.id)),
    [childCategories]
  );
  const results = useProdByCategory(childIds);

  const featured = useMemo(() => {
    if (!childCategories.length) return [];

    const categoriesWithData = childCategories.filter((_cat, idx) => {
      const r = results[idx];
      if (!r || r.isPending || r.isError) return false;
      const data = r.data as unknown as Array<unknown> | undefined;
      return Array.isArray(data) && data.length > 0;
    });

    const isExcluded = (name: string) =>
      EXCLUDED_CATEGORY_KEYWORDS.some((kw) =>
        name.toLowerCase().includes(kw.toLowerCase())
      );

    const nonFood = categoriesWithData.filter((c) => !isExcluded(c.name));
    const food = categoriesWithData.filter((c) => isExcluded(c.name));

    const byPreference: Array<{ id: string | number; name: string }> = [];
    const remaining = [...nonFood];

    for (const kw of FEATURED_CATEGORY_KEYWORDS) {
      const idx = remaining.findIndex((c) =>
        c.name.toLowerCase().includes(kw.toLowerCase())
      );
      if (idx !== -1) {
        byPreference.push(remaining[idx]);
        remaining.splice(idx, 1);
      }
      if (byPreference.length >= 12) break;
    }

    for (const c of remaining) {
      if (byPreference.length >= 12) break;
      byPreference.push(c);
    }

    for (const c of food) {
      if (byPreference.length >= 12) break;
      byPreference.push(c);
    }

    if (byPreference.length < 12) {
      const selectedIds = new Set(byPreference.map((c) => String(c.id)));
      for (const c of childCategories) {
        if (byPreference.length >= 12) break;
        if (!selectedIds.has(String(c.id))) {
          if (!isExcluded(c.name)) {
            byPreference.push(c);
            selectedIds.add(String(c.id));
          }
        }
      }
      if (byPreference.length < 12) {
        const selectedIds2 = new Set(byPreference.map((c) => String(c.id)));
        for (const c of childCategories) {
          if (byPreference.length >= 12) break;
          if (!selectedIds2.has(String(c.id)) && isExcluded(c.name)) {
            byPreference.push(c);
          }
        }
      }
    }

    return byPreference.map((c) => ({
      id: c.id,
      title: c.name,
      image: getImageForCategory(c.name, c.id),
    }));
  }, [childCategories, results]);

  if (isPending || loadingCategories) {
    return (
      <div className="grid grid-cols-12 gap-6 animate-pulse">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="col-span-2">
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-square bg-gray-200 rounded-xl" />
              <div className="w-3/4 h-4 bg-gray-200 rounded mx-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <React.Fragment>
      <p className="uppercase font-semibold text-center text-3xl mb-4">
        Danh mục nổi bật
      </p>

      <div className="grid grid-cols-12 gap-6">
        {featured.map((item) => (
          <div key={item.id} className="col-span-2">
            <ComboImgWithText
              src={item.image}
              title={item.title}
              onClick={() => navigate(`/products?category=${item.id}`)}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProdFeatured;
