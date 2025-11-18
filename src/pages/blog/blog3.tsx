import { useEffect } from "react";
import heroImg from "@/assets/blog/camp-hcm.jpg"; 
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

export default function CuaHangBanDoCamTraiTPHCM() {
  useEffect(() => {
    document.title = "Cửa Hàng Bán Đồ Cắm Trại – Dã Ngoại Hồ Chí Minh | GOPINIC";
  }, []);

  const BRAND = "GOPINIC";
  const HOTLINE = "0123456789";
  const ADDRESS = "72 Tô Ký, Quận 12, Thành phố Hồ Chí Minh";

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-3 flex justify-center">
        <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
          TIN TỨC
        </span>
      </div>

      <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Cửa Hàng Bán Đồ Cắm Trại – Dã Ngoại Hồ Chí Minh
      </h1>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <div className="flex text-orange-400" aria-label="5 stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span>202 Reviews</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <img src={heroImg} alt="Địa điểm bán đồ dã ngoại Hồ Chí Minh" className="w-full object-cover" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">04</span>
        <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold">TH8</span>
      </div>

      <details className="mt-8 rounded-lg border bg-white p-4 open:shadow-sm">
        <summary className="cursor-pointer select-none text-base font-semibold">
          <span className="mr-2">🧾</span> NỘI DUNG
        </summary>
        <ul className="mt-3 list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li><a href="#loi-ich" className="text-green-700 hover:underline">Lợi ích khi dã ngoại cùng bạn bè & gia đình</a></li>
          <li><a href="#vat-dung" className="text-green-700 hover:underline">Những vật dụng cần thiết khi đi cắm trại</a></li>
          <li>
            <a href="#leu" className="text-green-700 hover:underline">Lều cắm trại</a>
          </li>
          <li><a href="#den-pin" className="text-green-700 hover:underline">Đèn pin chiếu sáng ngoài trời</a></li>
          <li><a href="#nau-nuong" className="text-green-700 hover:underline">Dụng cụ nấu nướng dã ngoại</a></li>
          <li><a href="#ban-ghe" className="text-green-700 hover:underline">Bàn ghế dã ngoại</a></li>
          <li><a href="#phu-kien" className="text-green-700 hover:underline">Phụ kiện dã ngoại</a></li>
          <li><a href="#mua-o-dau" className="text-green-700 hover:underline">Địa điểm bán đồ dã ngoại tại TP.HCM</a></li>
          <li><a href="#dia-chi" className="text-green-700 hover:underline">Địa chỉ mua đồ dã ngoại (GOPINIC)</a></li>
        </ul>
      </details>

      <div className="prose mt-6 max-w-none prose-headings:font-bold prose-p:leading-7 prose-li:leading-7">
        <p className="text-sm text-gray-500 uppercase">Địa điểm bán đồ dã ngoại hồ chí minh sài gòn</p>

        <SectionHeading id="loi-ich" index={1}>Lợi ích khi dã ngoại cùng bạn bè và gia đình</SectionHeading>
        <p>
          Cắm trại dã ngoại giúp chúng ta sống chậm lại, thư giãn sau những ngày bận rộn; gắn kết gia đình và bạn bè;
          đặc biệt tốt cho trẻ nhỏ khi được vận động ngoài trời, khám phá và học hỏi tự nhiên.
        </p>
        <p>
          Ở quanh TP.HCM có nhiều điểm đi và gần như “đổi gió” cuối tuần: Hồ Dầu Tiếng, Núi Bà Đen (Tây Ninh),
          Núi Chứa Chan (Đồng Nai)… xa hơn có Đà Lạt, Nha Trang, Quy Nhơn, Phú Yên…
        </p>

        <SectionHeading id="vat-dung" index={2}>Những vật dụng cần thiết khi đi cắm trại</SectionHeading>
        <p>
          Tối thiểu gồm: <strong>Lều – Túi ngủ – Tấm cách nhiệt/Nệm – Đèn chiếu sáng – Bàn ghế gấp gọn –
          Bếp & nồi chảo – Bình/nước – Hộp gia vị…</strong>
        </p>

        <SectionHeading id="leu" index={3}>Lều cắm trại</SectionHeading>
        <p>
          Lều là “ngôi nhà” an toàn giữa thiên nhiên: che mưa nắng & côn trùng. Lều khung <strong>nhôm</strong> bền, nhẹ,
          đẹp nhưng giá cao hơn <strong>carbon</strong>. Chọn kích thước theo nhu cầu (1–2 người / 2–4 người cho gia đình…).
        </p>
        <div className="my-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          Gợi ý: ngoài lều nên có <strong>túi ngủ</strong> + <strong>tấm cách nhiệt/nệm hơi</strong> để ngủ ấm và
          tránh hơi lạnh từ mặt đất.
        </div>

        <SectionHeading id="den-pin" index={4}>Đèn pin chiếu sáng ngoài trời</SectionHeading>
        <p>
          Nên mang đèn sạc/đèn pin đa chế độ: sáng mạnh cho sinh hoạt, chế độ yếu làm đèn ngủ, có <em>SOS</em> để phòng sự cố.
          Luôn sạc đầy và mang pin dự phòng nếu đi dài ngày.
        </p>

        <SectionHeading id="nau-nuong" index={5}>Dụng cụ nấu nướng dã ngoại</SectionHeading>
        <p>
          Cho chuyến 2+ ngày, nên có bộ nồi – bếp gas dã ngoại, bình gas, bát thìa, thớt gấp… Gas cho ngọn lửa ổn định,
          sạch, dễ mua; bếp gấp nhỏ gọn – tiện mang theo.
        </p>

        <SectionHeading id="ban-ghe" index={6}>Bàn ghế dã ngoại</SectionHeading>
        <p>
          Bàn ghế gấp hợp kim <strong>nhôm</strong> nhẹ – bền – ít ảnh hưởng thời tiết, lý tưởng để ngồi lâu đọc sách,
          uống trà, ăn uống… Tìm loại gọn nhẹ, chịu lực tốt cho chuyến đi.
        </p>

        <SectionHeading id="phu-kien" index={7}>Phụ kiện dã ngoại</SectionHeading>
        <p>
          Có thể bổ sung: <em>xe kéo gấp, thùng đá, xô gấp, võng du lịch…</em> Đặc trưng đồ outdoor là gấp gọn – nhẹ,
          nên chỉ cần chọn món thực sự cần.
        </p>

        <SectionHeading id="mua-o-dau" index={8}>Địa điểm bán đồ dã ngoại tại TP.HCM</SectionHeading>
        <p>
          Nếu bạn cần địa chỉ <strong>uy tín – chính hãng – giá hợp lý</strong>, {BRAND} là lựa chọn đáng tin cậy.
          Chúng tôi tư vấn theo nhu cầu thực tế, giúp bạn chọn đúng – đủ, tránh mua thừa.
        </p>

        <SectionHeading id="dia-chi" index={9}>Địa chỉ mua đồ dã ngoại (GOPINIC)</SectionHeading>
        <div className="rounded-xl border bg-gradient-to-r from-green-50 to-white p-5">
          <p className="text-base font-semibold text-gray-900">{BRAND} – Cửa hàng bán đồ phượt, cắm trại tại TP.HCM</p>
          <ul className="mt-2 space-y-1">
            <li><span className="text-gray-500">Địa chỉ:</span> <span className="font-medium">{ADDRESS}</span></li>
            <li><span className="text-gray-500">Hotline:</span> <span className="font-medium">{HOTLINE}</span></li>
          </ul>
          <div className="mt-4">
            <a
              href="tel:0123456789"
              className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow hover:bg-green-700"
            >
              Gọi tư vấn ngay
            </a>
          </div>
        </div>

        <p className="mt-6 font-semibold">{BRAND} rất mong được gặp gỡ và phục vụ Quý khách!</p>
      </div>
    </article>
  );
}
