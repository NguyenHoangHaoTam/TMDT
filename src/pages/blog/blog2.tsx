import { useEffect } from "react";
import heroImg from "@/assets/blog/wow-sale.jpg";

function SectionHeading({
  id, index, children,
}: { id: string; index: number; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 mt-10 flex items-center text-2xl font-bold text-green-700">
      <span className="mr-3 inline-flex items-center justify-center rounded-md bg-yellow-200 px-2 py-1 text-base font-extrabold text-green-800 shadow-sm">
        {index}
      </span>
      <span>{children}</span>
    </h2>
  );
}

export default function ChuongTrinhGiamGiaDacBietChoDenPin() {
  useEffect(() => {
    document.title = "Chương Trình Giảm Giá Đặc Biệt Cho Đèn Pin | GOPINIC";
  }, []);

  const BRAND = "GOPINIC";
  const HOTLINE = "0123456789";
  const ADDRESS = "72 Tô Ký, Quận 12, Thành phố Hồ Chí Minh";

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-3 flex justify-center">
        <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
          KHUYẾN MÃI
        </span>
      </div>

      <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Chương Trình Giảm Giá Đặc Biệt Cho Đèn Pin
      </h1>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <div className="flex text-orange-400" aria-label="5 stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span>25 Reviews</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <img src={heroImg} alt="Chương trình khuyến mãi LED2024" className="w-full object-cover" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">23</span>
        <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold">TH1</span>
      </div>

      <details className="mt-8 rounded-lg border bg-white p-4 open:shadow-sm">
        <summary className="cursor-pointer select-none text-base font-semibold">
          <span className="mr-2">🧾</span> NỘI DUNG
        </summary>
        <ul className="mt-3 list-disc pl-6 text-sm text-gray-700">
          <li>
            <a href="#chuong-trinh" className="text-green-700 hover:underline">
              Chương Trình Giảm Giá Đặc Biệt: LED2024 – Đón Đầu Xu Hướng
            </a>
          </li>
          <li>
            <a href="#giam-gia-20" className="text-green-700 hover:underline">
              Giảm giá đặc biệt lên đến 20%
            </a>
          </li>
        </ul>
      </details>

      <div className="prose mt-6 max-w-none prose-headings:font-bold prose-p:leading-7 prose-li:leading-7">
        <SectionHeading id="chuong-trinh" index={1}>
          Chương Trình Giảm Giá Đặc Biệt: LED2024 – Đón Đầu Xu Hướng
        </SectionHeading>

        <p>
          Để chào đón mùa xuân sôi động và đáp ứng nhu cầu của cộng đồng yêu thích hoạt động dã ngoại ngoài trời,
          {` `}{BRAND} hân hạnh thông báo về chương trình giảm giá đặc biệt dành cho hạng mục đèn pin và thiết bị chiếu sáng.
          Đây là cơ hội tuyệt vời để bạn nâng cấp trang thiết bị outdoor của mình với giá ưu đãi chưa từng có.
        </p>

        <p>
          <strong>Thời gian áp dụng:</strong> Từ ngày <strong>23/1/2024</strong> đến ngày <strong>24/2/2024</strong>,
          không giới hạn số lượng và ưu đãi sẽ áp dụng theo hình thức mã ưu đãi.
        </p>
        <p>
          <strong>Hình thức áp dụng:</strong> Mua hàng trực tiếp và đặt hàng qua website {BRAND} hoặc các kênh Zalo, Facebook.
        </p>

        <SectionHeading id="giam-gia-20" index={2}>
          Giảm giá đặc biệt lên đến 20%
        </SectionHeading>

        <p>
          Nhập mã giảm giá <strong>“LED2024”</strong> khi thanh toán và bạn sẽ nhận được ưu đãi tới <strong>15%</strong> cho
          một số sản phẩm chọn lọc của thương hiệu nổi tiếng như <em>Led Lenser</em>:
        </p>

        <ul className="marker:text-green-600">
          <li>Đèn pin Led Lenser MT6</li>
          <li>Đèn pin Led Lenser P3R</li>
          <li>Đèn pin Led Lenser P7</li>
          <li>Đèn pin Ledlenser K4R Boost</li>
          <li>Đèn pin móc khóa Ledlenser K6R</li>
          <li>Đèn pin Ledlenser P2 420.000 giảm còn 330.000 VNĐ</li>
        </ul>

        <div className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-[15px] leading-7">
          Chương trình giảm giá diễn ra trong thời gian giới hạn từ ngày
          <strong> 23/1/2024 </strong>đến<strong> 23/2/2024</strong>. Hãy nhanh tay đặt hàng hôm nay để
          không bỏ lỡ cơ hội sở hữu những sản phẩm chất lượng với giá ưu đãi đặc biệt.
        </div>

        <hr className="my-8" />

        <div className="rounded-xl border bg-gradient-to-r from-green-50 to-white p-5">
          <p className="text-base font-semibold text-gray-900">Liên hệ mua hàng & tư vấn</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <div><span className="text-gray-500">Hotline:</span> <span className="font-medium">{HOTLINE}</span></div>
            <div className="sm:col-span-2">
              <span className="text-gray-500">Địa chỉ:</span> <span className="font-medium">{ADDRESS}</span>
            </div>
          </div>
          <div className="mt-4">
            <a
              href="tel:0123456789"
              className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow hover:bg-green-700"
            >
              Gọi ngay
            </a>
          </div>
        </div>

        <p className="mt-6 font-semibold">{BRAND} rất hân hạnh được phục vụ bạn!</p>
      </div>
    </article>
  );
}
