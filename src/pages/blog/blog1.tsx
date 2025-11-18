import { useEffect } from "react";
import heroImg from "@/assets/blog/thue-leu-dn.jpg"; 

function SectionHeading({
  id, index, children,
}: { id: string; index: string | number; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 mt-10 flex items-center text-2xl font-bold text-green-700">
      <span className="mr-3 inline-flex items-center justify-center rounded-md bg-yellow-200 px-2 py-1 text-base font-extrabold text-green-800 shadow-sm">
        {index}
      </span>
      <span>{children}</span>
    </h2>
  );
}

type PriceRow = { name: string; price1: string; price2: string; note?: string };

const PRICE_TABLE: PriceRow[] = [
  { name: "Lều 2 người 2 lớp – khung nhôm", price1: "70.000", price2: "30.000", note: "Cho thuê lều 2 người chống mưa" },
  { name: "Lều 4 người 2 lớp – khung nhôm", price1: "100.000", price2: "40.000", note: "Cho thuê lều 4 người" },
  { name: "Lều 6 người 2 lớp – Eureka",    price1: "120.000", price2: "50.000", note: "Cho thuê lều 6 người" },
  { name: "Tấm cách nhiệt cá nhân",        price1: "10.000", price2: "5.000",  note: "Cho thuê tấm cách nhiệt" },
  { name: "Tăng bạt 1.8m x 3.2m",           price1: "30.000", price2: "10.000", note: "Cho thuê tăng bạt dã ngoại" },
  { name: "Khung chống tăng bạt (2m x 2 cây)", price1: "50.000", price2: "20.000" },
  { name: "Đèn lều 3 chế độ (vàng 4–6h)",   price1: "20.000", price2: "10.000", note: "Đèn lều đa năng" },
  { name: "Đèn đa năng (trắng 6–12h)",      price1: "40.000", price2: "15.000", note: "Đèn siêu sáng" },
  { name: "Đèn pin đeo đầu (6–8h)",         price1: "30.000", price2: "10.000", note: "Đèn đội đầu" },
  { name: "Đèn pin cầm tay (4–6h)",         price1: "20.000", price2: "10.000", note: "Đèn pin cầm tay" },
  { name: "Cây treo đèn + cọc cắm đất",     price1: "30.000", price2: "15.000" },
  { name: "Dây đèn USB 50 bóng",            price1: "20.000", price2: "10.000" },
  { name: "Dây đèn USB 80 bóng",            price1: "30.000", price2: "15.000" },
  { name: "Bàn nhôm xếp gọn – nhỏ",         price1: "40.000", price2: "15.000" },
  { name: "Bàn nhôm xếp gọn – lớn",         price1: "60.000", price2: "25.000" },
  { name: "Bộ 1 bàn + 4 ghế nhỏ có tựa",    price1: "130.000", price2: "60.000" },
  { name: "Ghế xếp có tựa nhỏ",             price1: "25.000", price2: "15.000" },
  { name: "Ghế võng xếp gọn",               price1: "40.000", price2: "25.000" },
  { name: "Bếp nướng gấp 3–4 người (30×30)",price1: "50.000", price2: "25.000" },
  { name: "Bếp ga mini du lịch",            price1: "25.000", price2: "15.000" },
  { name: "Đầu khò gas",                     price1: "20.000", price2: "10.000" },
  { name: "Ấm đun nước inox 1L",            price1: "25.000", price2: "15.000" },
  { name: "Bộ nồi/chảo nấu ăn 2 người",     price1: "35.000", price2: "20.000" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1504624720567-64a41aa25d70?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507919909716-c8262e491cde?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f0?q=80&w=1200&auto=format&fit=crop",
];

export default function ChoThueLeuTraiDaNang() {
  useEffect(() => {
    document.title = "Dịch Vụ Cho Thuê Lều Trại, Dụng Cụ Dã Ngoại Tại Đà Nẵng | GOPINIC";
  }, []);

  const BRAND   = "GOPINIC";
  const HOTLINE = "0123456789";
  const ADDRESS = "72 Tô Ký, Quận 12, Thành phố Hồ Chí Minh";

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-3 flex justify-center">
        <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
          DỊCH VỤ
        </span>
      </div>

      <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Dịch Vụ Cho Thuê Lều Trại, Dụng Cụ Dã Ngoại Tại Đà Nẵng
      </h1>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <div className="flex text-orange-400" aria-label="5 stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span>599 Reviews</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <img src={heroImg} alt="Thuê lều trại, dụng cụ dã ngoại Đà Nẵng" className="w-full object-cover" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">25</span>
        <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold">TH3</span>
      </div>

      <details className="mt-8 rounded-lg border bg-white p-4 open:shadow-sm">
        <summary className="cursor-pointer select-none text-base font-semibold">
          <span className="mr-2">🧾</span> NỘI DUNG
        </summary>
        <ul className="mt-3 list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li><a href="#gioi-thieu" className="text-green-700 hover:underline">Giới thiệu dịch vụ</a></li>
          <li><a href="#lien-he" className="text-green-700 hover:underline">Thông tin liên hệ</a></li>
          <li><a href="#cam-ket" className="text-green-700 hover:underline">Cam kết chất lượng</a></li>
          <li><a href="#bang-gia" className="text-green-700 hover:underline">Bảng giá thuê dụng cụ</a></li>
          <li><a href="#gallery" className="text-green-700 hover:underline">Hình ảnh thiết bị</a></li>
        </ul>
      </details>

      <div className="prose mt-6 max-w-none prose-headings:font-bold prose-p:leading-7 prose-li:leading-7">
        <p className="text-sm text-gray-500 uppercase">
          Dịch vụ cho thuê lều trại, dụng cụ dã ngoại tại Đà Nẵng
        </p>

        <SectionHeading id="gioi-thieu" index={1}>
          Dịch Vụ Cho Thuê Lều Trại Dã Ngoại – Thuê Đồ Cắm Trại Đà Nẵng
        </SectionHeading>
        <p>
          {BRAND} cung cấp dịch vụ cho thuê lều trại & dụng cụ dã ngoại đầy đủ:
          <em> lều, bàn ghế, bếp nướng/ga, đèn, tăng bạt, tấm cách nhiệt…</em>
          Đồ cho thuê nhẹ, gấp gọn, vệ sinh kỹ trước khi giao – giúp bạn có chuyến đi an toàn & tiết kiệm.
        </p>

        <SectionHeading id="lien-he" index={2}>Thông tin liên hệ</SectionHeading>
        <div className="rounded-xl border bg-gradient-to-r from-green-50 to-white p-5">
          <ul className="space-y-1">
            <li><span className="text-gray-500">Địa chỉ nhận & trả đồ:</span> <span className="font-medium">Đà Nẵng (liên hệ trước)</span></li>
            <li><span className="text-gray-500">Hotline/Zalo:</span> <span className="font-medium">{HOTLINE}</span></li>
            <li><span className="text-gray-500">Cơ sở HCM (tư vấn):</span> <span className="font-medium">{ADDRESS}</span></li>
            <li><span className="text-gray-500">Giờ làm việc:</span> 9:30 – 18:00 (T2–T7), CN nghỉ</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="tel:0123456789" className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow hover:bg-green-700">
              Gọi ngay
            </a>
            <a href="https://zalo.me/" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg border px-4 py-2 font-semibold text-green-700 hover:bg-green-50">
              Nhắn Zalo
            </a>
          </div>
        </div>

        <SectionHeading id="cam-ket" index={3}>Cam kết chất lượng</SectionHeading>
        <ul className="marker:text-green-600">
          <li>Hoàn tiền <strong>100%</strong> nếu đồ có đất cát, bẩn, hư hỏng/không đúng chức năng.</li>
          <li>100% thiết bị được vệ sinh sạch sẽ trước khi giao và sau khi nhận.</li>
          <li>Tư vấn set-up, danh mục đồ phù hợp cho từng quy mô: 1–2 người, 3–4 người, 5–8 người, nhóm/ gia đình.</li>
        </ul>

        <SectionHeading id="bang-gia" index={4}>Bảng giá cho thuê (2 ngày 1 đêm / đêm tiếp theo)</SectionHeading>
        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Tên sản phẩm</th>
                <th className="px-4 py-3 text-right font-semibold">2 ngày 1 đêm</th>
                <th className="px-4 py-3 text-right font-semibold">Đêm thứ 2+</th>
                <th className="px-4 py-3 text-left font-semibold">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PRICE_TABLE.map((r, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3 text-right">{r.price1} VNĐ</td>
                  <td className="px-4 py-3 text-right">{r.price2} VNĐ</td>
                  <td className="px-4 py-3 text-gray-600">{r.note ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionHeading id="gallery" index={5}>Hình ảnh thiết bị cho thuê</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((src, i) => (
            <figure key={i} className="overflow-hidden rounded-xl border">
              <img src={src} alt={`Thiết bị ${i + 1}`} className="h-48 w-full object-cover" />
            </figure>
          ))}
        </div>

        <div className="my-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
          Giá có thể thay đổi theo mùa & tình trạng thiết bị. Hãy gọi/Zalo để nhận báo giá và combo ưu đãi mới nhất.
        </div>

        <p className="mt-6 font-semibold">
          {BRAND} rất hân hạnh đồng hành cùng chuyến đi của bạn!
        </p>
      </div>
    </article>
  );
}
