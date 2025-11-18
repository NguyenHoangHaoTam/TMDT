import { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import imgTet from "../../../assets/blog/lich-tet-2024.jpg";
import imgSale from "../../../assets/blog/wow-sale.jpg";
import imgCct from "../../../assets/blog/nhiet-do-mau.jpg";

import imgKh2 from "../../../assets/blog/quoc-khanh.jpg";
import imgCamp from "../../../assets/blog/camp-hcm.jpg";
import imgRent from "../../../assets/blog/thue-leu-dn.jpg";

type Post = {
  id: string;
  day: string;     
  month: string;    
  title: string;
  excerpt: string;
  image: string;
  categories: string[];
  date: string;     
  author?: string;
  to: string;
};

const posts: Post[] = [
  {
    id: "s1-1",
    day: "04",
    month: "TH2",
    title: "Lịch Nghỉ Tết Nguyên Đán 2024",
    excerpt: "Kính chào quý khách, nhân dịp đầu năm mới...",
    image: imgTet,
    categories: ["TIN TỨC"],
    date: "08/01/2025",
    author: "Đi Outdoor",
    to: "/blog/lich-nghi-tet-nguyen-dan-2024",
  },
  {
    id: "s1-2",
    day: "23",
    month: "TH1",
    title: "Chương Trình Giảm Giá Đặc Biệt Cho Đèn Pin",
    excerpt: "LED2024 - Đón đầu xu hướng, đáp ứng nhu cầu...",
    image: imgSale,
    categories: ["KHUYẾN MÃI"],
    date: "08/01/2025",
    author: "Đi Outdoor",
    to: "/blog/chuong-trinh-giam-gia-dac-biet-cho-den-pin",
  },
  {
    id: "s1-3",
    day: "23",
    month: "TH1",
    title: "Tìm Hiểu Nhiệt Độ Màu Đèn Pin & Màu Ánh Sáng",
    excerpt: "Warm/Daylight/Cold – chọn đèn phù hợp nhu cầu...",
    image: imgCct,
    categories: ["ĐÈN PIN & PIN", "THÔNG TIN"],
    date: "08/01/2025",
    author: "Đi Outdoor",
    to: "/blog/tim-hieu-nhiet-do-mau-den-pin",
  },
  {
    id: "s2-1",
    day: "31",
    month: "TH8",
    title: "THÔNG BÁO NGHỈ LỄ QUỐC KHÁNH VIỆT NAM 2/9/2023",
    excerpt: "Kính gửi Quý khách hàng và đối tác, Công Ty TNHH Đi Outdoor...",
    image: imgKh2,
    categories: ["TIN TỨC"],
    date: "08/01/2025",
    author: "Đi Outdoor",
    to: "/blog/thong-bao-nghi-le-2-9-2023",
  },
  {
    id: "s2-2",
    day: "04",
    month: "TH8",
    title: "Cửa Hàng Bán Đồ Cắm Trại – Dã Ngoại Hồ Chí Minh",
    excerpt: "Cắm trại dã ngoại từ lâu đã không còn xa lạ với nhiều người...",
    image: imgCamp,
    categories: ["TIN TỨC"],
    date: "11/09/2025",
    author: "Đi Outdoor",
    to: "/blog/cua-hang-ban-do-cam-trai-tphcm",
  },
  {
    id: "s2-3",
    day: "25",
    month: "TH3",
    title: "Dịch Vụ Cho Thuê Lều Trại, Dụng Cụ Dã Ngoại Tại Đà Nẵng",
    excerpt: "Dịch vụ cho thuê lều trại Đà Nẵng – Đi Outdoor hỗ trợ đầy đủ...",
    image: imgRent,
    categories: ["DỊCH VỤ"],
    date: "11/09/2025",
    author: "Đi Outdoor",
    to: "/blog/cho-thue-leu-trai-da-nang",
  },
];

function chunk3<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
  return out;
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-green-600/90 px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
      {label}
    </span>
  );
}

export default function BlogTeaserCarousel() {
  const slides = useMemo(() => chunk3(posts), []);
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);
  const goto = (i: number) => setIndex(((i % total) + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-8">
          BLOG DÃ NGOẠI
        </h2>

        <div className="relative" ref={containerRef}>
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((group, gi) => (
              <div key={gi} className="min-w-full">
                <div className="grid gap-6 md:grid-cols-3">
                  {group.map((p) => (
                    <article
                      key={p.id}
                      className="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      <Link to={p.to} className="block relative">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-56 w-full rounded-t-xl object-cover"
                        />
                        <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-center shadow">
                          <div className="text-2xl font-bold leading-none">{p.day}</div>
                          <div className="text-xs font-semibold text-gray-600">{p.month}</div>
                        </div>
                      </Link>

                      <div className="p-5">
                        <div className="mb-2 flex flex-wrap gap-2">
                          {p.categories.map((c) => (
                            <CategoryBadge key={c} label={c} />
                          ))}
                        </div>

                        <Link to={p.to} className="group">
                          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-green-700">
                            {p.title}
                          </h3>
                        </Link>

                        <div className="mt-2 text-xs text-gray-500">
                          {p.date}
                          {p.author && (
                            <> — Posted by <span className="font-medium text-gray-700">{p.author}</span></>
                          )}
                        </div>

                        <p className="mt-3 line-clamp-3 text-sm text-gray-700">{p.excerpt}</p>

                        <div className="mt-4">
                          <Link
                            to={p.to}
                            className="text-sm font-semibold text-green-700 hover:text-green-800"
                          >
                            ĐỌC TIẾP
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
              </div>
          </div>

          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          >
            ›
          </button>

          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => goto(i)}
                aria-label={`Chuyển đến slide ${i + 1}`}
                className={`h-2 w-6 rounded-full transition ${
                  i === index ? "bg-green-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
