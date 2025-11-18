import { useEffect } from "react";
import heroImg from "@/assets/blog/quoc-khanh.jpg"; 

function SectionHeading({ id, index, children }:{
  id: string; index: string | number; children: React.ReactNode;
}) {
  return (
    <h2 id={id} className="scroll-mt-24 mt-10 flex items-center text-2xl font-bold text-green-700">
      <span className="mr-3 inline-flex items-center justify-center rounded-md bg-yellow-200 px-2 py-1 text-base font-extrabold text-green-800 shadow-sm">
        {index}
      </span>
      <span>{children}</span>
    </h2>
  );
}

export default function ThongBaoNghiLe_2_9_2023() {
  useEffect(() => {
    document.title = "THÔNG BÁO NGHỈ LỄ QUỐC KHÁNH 2/9/2023 | GOPINIC";
  }, []);

  const BRAND = "GOPINIC";

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-3 flex justify-center">
        <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
          TIN TỨC
        </span>
      </div>

      <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
        THÔNG BÁO NGHỈ LỄ QUỐC KHÁNH VIỆT NAM 2/9/2023
      </h1>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <div className="flex text-orange-400" aria-label="5 stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span>76 Reviews</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <img src={heroImg} alt="Thông báo nghỉ lễ Quốc Khánh 2/9/2023" className="w-full object-cover" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">31</span>
        <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold">TH8</span>
      </div>

      <details className="mt-8 rounded-lg border bg-white p-4 open:shadow-sm">
        <summary className="cursor-pointer select-none text-base font-semibold">
          <span className="mr-2">🧾</span> NỘI DUNG
        </summary>
        <ul className="mt-3 list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li><a href="#thong-bao" className="text-green-700 hover:underline">Thông báo nghỉ lễ Quốc Khánh 2/9/2023</a></li>
          <li><a href="#mua-sam-online" className="text-green-700 hover:underline">Hoạt động mua sắm trực tuyến</a></li>
          <li><a href="#loi-chuc" className="text-green-700 hover:underline">Lời chúc & cảm ơn</a></li>
        </ul>
      </details>

      <div className="prose mt-6 max-w-none prose-headings:font-bold prose-p:leading-7 prose-li:leading-7">
        <SectionHeading id="thong-bao" index={1}>
          Thông báo nghỉ lễ Quốc Khánh 2/9/2023
        </SectionHeading>

        <p><em>Kính gửi Quý khách hàng và đối tác,</em></p>
        <p>
          {BRAND} trân trọng thông báo lịch nghỉ lễ Quốc Khánh 2/9/2023 của các chi nhánh:
        </p>
        <ul>
          <li>
            <strong>Chi nhánh Hồ Chí Minh:</strong> Nghỉ từ ngày <strong>2/9 (Thứ Bảy)</strong> đến ngày
            <strong> 4/9 (Thứ Hai)</strong>. Hoạt động sẽ trở lại bình thường vào ngày <strong>5/9 (Thứ Ba)</strong>.
          </li>
          <li>
            <strong>Chi nhánh Hà Nội:</strong> Nghỉ từ ngày <strong>2/9 (Thứ Bảy)</strong> đến ngày
            <strong> 4/9 (Thứ Hai)</strong>. Hoạt động sẽ trở lại bình thường vào ngày <strong>5/9 (Thứ Ba)</strong>.
          </li>
          <li>
            <strong>Chi nhánh Đà Nẵng:</strong> Nghỉ từ ngày <strong>2/9 (Thứ Bảy)</strong> đến ngày
            <strong> 3/9 (Chủ Nhật)</strong>. Hoạt động sẽ trở lại bình thường vào ngày <strong>4/9 (Thứ Hai)</strong>.
          </li>
        </ul>

        <SectionHeading id="mua-sam-online" index={2}>
          Hoạt động mua sắm trực tuyến
        </SectionHeading>
        <ul className="marker:text-green-600">
          <li>Mọi đơn hàng trên kênh Thương mại điện tử và Website vẫn diễn ra bình thường.</li>
          <li>Các đơn hàng trong thời gian nghỉ sẽ được đóng gói và gửi đi sau kỳ nghỉ.</li>
          <li>Đơn đặt trước lễ sẽ được ưu tiên hoàn tất và gửi đi trước ngày nghỉ.</li>
          <li className="font-medium">
            Lưu ý: Tạm dừng dịch vụ <em>đơn hoả tốc</em> tại cả 3 chi nhánh trong thời gian nghỉ lễ.
          </li>
        </ul>

        <div className="my-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
          Trong thời gian nghỉ lễ, nếu Quý khách có nhu cầu hoặc thắc mắc, vui lòng để lại tin nhắn trực tiếp trên Website
          hoặc gửi email. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </div>

        <SectionHeading id="loi-chuc" index={3}>
          Lời chúc & cảm ơn
        </SectionHeading>
        <p>
          {BRAND} kính chúc Quý khách hàng và đối tác có kỳ nghỉ lễ vui vẻ, an lành và tràn đầy niềm vui bên gia đình
          và người thân. Trân trọng cảm ơn và kính chúc mừng Quốc Khánh Việt Nam!
        </p>
        <p><strong>{BRAND}</strong></p>
      </div>
    </article>
  );
}
