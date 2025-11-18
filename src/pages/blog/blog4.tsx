import { useEffect } from "react";
import heroImg from "@/assets/blog/lich-tet-2024.jpg";

export default function LichNghiTetNguyenDan2024() {
  useEffect(() => {
    document.title = "Lịch nghỉ Tết Nguyên Đán 2024 | GOPINIC";
  }, []);

  const BRAND = "GOPINIC";
  const HOTLINE = "0123456789";
  const ADDRESS = "72 Tô Ký, Quận 12, Thành phố Hồ Chí Minh";
  const EMAIL = "contact@gopinic.vn"; 

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-3 flex justify-center">
        <span className="inline-flex items-center rounded-md bg-green-600/90 px-2 py-1 text-xs font-semibold text-white">
          TIN TỨC
        </span>
      </div>

      <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Lịch Nghỉ Tết Nguyên Đán 2024
      </h1>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <div className="flex" aria-label="5 stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span>15 Reviews</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <img
          src={heroImg}
          alt="Thông báo lịch nghỉ Tết Nguyên Đán 2024"
          className="w-full object-cover"
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">
          04
        </span>
        <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold">
          TH2
        </span>
      </div>

      <div className="prose prose-green mt-6 max-w-none prose-p:leading-7">
        <p><em>Kính chào quý khách,</em></p>

        <p>
          Nhân dịp đầu năm mới, {BRAND} kính chúc quý khách và gia đình
          một năm mới An Khang – Thịnh Vượng và gặp nhiều may mắn.
        </p>

        <p>
          Với tất cả sự chân thành, chúng tôi trân trọng cảm ơn quý khách vì đã tin tưởng
          và đồng hành trong thời gian vừa qua. Sự tín nhiệm của quý khách luôn là tài
          sản giá trị nhất đối với {BRAND}, và chúng tôi sẽ càng nỗ lực hơn nữa
          trong những năm tới để mang đến chất lượng hàng hóa cũng như chất lượng dịch vụ
          khách hàng tốt hơn nữa.
        </p>

        <p>
          Nhằm thuận tiện trong việc hỗ trợ, {BRAND} xin được thông báo đến quý khách
          lịch nghỉ Tết Nguyên Đán 2024 như sau:
        </p>

        <div className="my-5 rounded-lg border border-red-200 bg-red-50 p-4 text-[15px] leading-7">
          <p>
            <strong>Cửa hàng Đà Nẵng:</strong> Từ ngày <strong>08/02/2024</strong> (29 tháng Chạp)
            đến hết ngày <strong>14/02/2024</strong> (mồng 5 Tết).
          </p>
          <p className="mt-2">
            <strong>Cửa hàng Hồ Chí Minh:</strong> Từ ngày <strong>07/02/2024</strong> (28 tháng Chạp)
            đến hết ngày <strong>15/02/2024</strong> (mồng 6 Tết).
          </p>
          <p className="mt-2">
            <strong>Chi nhánh Hà Nội:</strong> Từ ngày <strong>07/02/2024</strong> (28 tháng Chạp)
            đến hết ngày <strong>15/02/2024</strong> (mồng 6 Tết).
          </p>
        </div>

        <p>
          Trong thời gian nghỉ tết, {BRAND} vẫn nhận đơn hàng và sẽ được xác nhận và gửi đi khi
          chúng tôi bắt đầu làm việc trở lại. Đối với các sản phẩm lỗi hoặc cần đổi trả,
          {BRAND} sẽ ghi nhận và thực hiện sau tết.
        </p>

        <p>
          Đối với các đơn hàng đang vận chuyển, {BRAND} sẽ tiếp tục hỗ trợ trong quá trình nghỉ tết.
        </p>

        <p>
          Nếu quý khách cần hỗ trợ bất cứ vấn đề gì liên quan đến vận chuyển, hãy liên hệ
          bộ phận chăm sóc khách hàng qua:
        </p>

        <ul>
          <li><strong>Hotline:</strong> {HOTLINE}</li>
          <li><strong>Địa chỉ:</strong> {ADDRESS}</li>
          <li><strong>Email:</strong> {EMAIL}</li>
        </ul>

        <p>
          Kính chúc quý khách năm mới nhiều sức khỏe và hạnh phúc.
        </p>

        <p>
          <strong>{BRAND}</strong> trân trọng thông báo.
        </p>
      </div>
    </article>
  );
}
