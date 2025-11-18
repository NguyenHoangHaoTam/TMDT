import { useEffect, useRef } from "react";
import PolicyLayout from "@/pages/policy/PolicyLayout";
import { Facebook, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";

function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            io.unobserve(el);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

const MAP_IMAGE = "/src/assets/mapvietnam.png"; 
const COMPANY = {
  name: "GOPICNIC",
  hotline: "0122 335 566",
  email: "support@gopicnic.vn",
  address: "72 Tô Ký, Quận 12, TP.HCM",
};

const HOURS: { day: string; time: string }[] = [
  { day: "THỨ HAI", time: "09:30 - 18:00" },
  { day: "THỨ BA", time: "09:30 - 18:00" },
  { day: "THỨ TƯ", time: "09:30 - 18:00" },
  { day: "THỨ NĂM", time: "09:30 - 18:00" },
  { day: "THỨ SÁU", time: "09:30 - 18:00" },
  { day: "THỨ BẢY", time: "09:30 - 18:00" },
  { day: "CHỦ NHẬT", time: "14:00 - 18:00" },
];

function Marker({
  top,
  left,
  label,
}: {
  top: string;
  left: string;
  label: string;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 text-[13px]"
      style={{ top, left }}
    >
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-green-primary ring-2 ring-white shadow" />
        <span className="font-semibold drop-shadow">{label}</span>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>();

  return (
    <PolicyLayout
      title="Liên hệ"
      boxed={false}
      hero={{
        image: "/src/assets/banner-page-title.png",
        centerTitle: "LIÊN HỆ",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Liên hệ" },
        ],
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
<div
  ref={leftRef}
  className="rounded-xl border border-gray-200 bg-white overflow-hidden reveal reveal-left"
>
  <div className="relative w-full h-[520px] md:h-[680px] lg:h-[760px]">
    <img
      src={MAP_IMAGE}
      alt="Bản đồ Việt Nam"
      className="absolute inset-0 w-full h-full object-contain bg-gray-50"
    />

    <Marker top="26%" left="49%" label="Hà Nội" />
    <Marker top="49%" left="56%" label="Đà Nẵng" />
    <Marker top="79%" left="45%" label="Hồ Chí Minh" />
  </div>
</div>


        <div ref={rightRef} className="space-y-10 reveal reveal-right">
          <div>
            <h2 className="text-2xl font-extrabold text-green-primary">
              LIÊN HỆ CHÚNG TÔI
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-1 text-green-primary" size={18} />
              <div>
                <p className="text-sm text-gray-500">Điện thoại</p>
                <p className="font-medium">{COMPANY.hotline}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 text-green-primary" size={18} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{COMPANY.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 text-green-primary" size={18} />
              <div>
                <p className="text-sm text-gray-500">Địa chỉ</p>
                <p className="font-medium">{COMPANY.address}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="uppercase text-sm font-semibold text-gray-600 tracking-wider mb-3">
              Social của chúng tôi
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center hover:scale-105 transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center hover:scale-105 transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-red-600/10 text-red-600 flex items-center justify-center hover:scale-105 transition"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-green-primary mb-4">
              Giờ mở cửa
            </h3>
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
              {HOURS.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-gray-700">{row.day}</span>
                  <span className="text-gray-900 font-medium tracking-wide">
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PolicyLayout>
  );
}
