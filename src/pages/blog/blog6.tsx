import { useEffect } from "react";
import heroImg from "@/assets/blog/nhiet-do-mau.jpg"; 

function SectionHeading({ id, index, children }: { id: string; index: string | number; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 mt-10 flex items-center text-2xl font-bold text-green-700">
      <span className="mr-3 inline-flex items-center justify-center rounded-md bg-yellow-200 px-2 py-1 text-base font-extrabold text-green-800 shadow-sm">
        {index}
      </span>
      <span>{children}</span>
    </h2>
  );
}

export default function TimHieuNhietDoMauDenPin() {
  useEffect(() => {
    document.title = "Tìm Hiểu Nhiệt Độ Màu Đèn Pin & Màu Ánh Sáng | GOPINIC";
  }, []);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">ĐÈN PIN & PIN</span>
        <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">THÔNG TIN</span>
      </div>

      <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Tìm Hiểu Nhiệt Độ Màu Đèn Pin & Màu Ánh Sáng
      </h1>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <div className="flex text-orange-400" aria-label="5 stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span>74 Reviews</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <img src={heroImg} alt="Bảng màu nhiệt độ ánh sáng" className="w-full object-cover" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">23</span>
        <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold">TH1</span>
      </div>

      <details className="mt-8 rounded-lg border bg-white p-4 open:shadow-sm">
        <summary className="cursor-pointer select-none text-base font-semibold">
          <span className="mr-2">🧾</span> NỘI DUNG
        </summary>
        <ul className="mt-3 list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li><a href="#hieu-ro" className="text-green-700 hover:underline">Hiểu rõ về nhiệt độ màu đèn led</a></li>
          <li><a href="#nhiet-do-mau-la-gi" className="text-green-700 hover:underline">Nhiệt độ màu là gì?</a></li>
          <li><a href="#nhiet-do-mau-den-led" className="text-green-700 hover:underline">Nhiệt độ màu đèn led</a></li>
          <li>
            <a href="#anh-huong" className="text-green-700 hover:underline">Màu nhiệt độ led ảnh hưởng như thế nào đến chúng ta?</a>
            <ul className="mt-1 list-disc pl-6">
              <li><a href="#tam-trang" className="hover:underline">Ảnh hưởng đến tâm trạng và cảm xúc</a></li>
              <li><a href="#thi-giac" className="hover:underline">Ảnh hưởng đến quan điểm thị giác</a></li>
              <li><a href="#giac-ngu" className="hover:underline">Ảnh hưởng đến giấc ngủ</a></li>
              <li><a href="#tot-cho-mat" className="hover:underline">Nhiệt độ màu nào tốt nhất cho mắt?</a></li>
            </ul>
          </li>
          <li>
            <a href="#chon-den-pin" className="text-green-700 hover:underline">Cách chọn đèn pin có màu ánh sáng phù hợp</a>
            <ul className="mt-1 list-disc pl-6">
              <li><a href="#anh-sang-lanh" className="hover:underline">Đèn pin ánh sáng lạnh</a></li>
              <li><a href="#anh-sang-trung-tinh" className="hover:underline">Đèn pin ánh sáng trung tính</a></li>
              <li><a href="#anh-sang-am" className="hover:underline">Đèn pin ánh sáng ấm</a></li>
            </ul>
          </li>
          <li><a href="#ket-luan" className="text-green-700 hover:underline">Kết luận nhiệt độ màu đèn pin</a></li>
        </ul>
      </details>

      <div className="prose mt-6 max-w-none prose-headings:font-bold prose-p:leading-7 prose-li:leading-7">
        <SectionHeading id="hieu-ro" index={1}>Hiểu rõ về nhiệt độ màu đèn led</SectionHeading>
        <p>
          Trên thị trường đèn pin chiếu sáng hiện nay, với công nghệ LED đang chiếm lĩnh, mọi người đều tìm kiếm một chiếc
          đèn pin với nhiệt độ màu hoàn hảo… Trong bài viết này chúng tôi tập trung vào cách phân biệt màu ánh sáng theo
          nhiệt độ màu và đưa ra lời khuyên cho các hoạt động ngoài trời và trong nhà.
        </p>

        <SectionHeading id="nhiet-do-mau-la-gi" index={2}>Nhiệt độ màu là gì?</SectionHeading>
        <p>
          Nhiệt độ màu đề cập đến màu sắc của ánh sáng và thường được biểu diễn bằng đơn vị Kelvin (K), có phạm vi từ
          1.000K đến 10.000K… Khi nhiệt độ tăng, ánh sáng chuyển từ màu đỏ sang cam, vàng và cuối cùng là xanh.
        </p>
        <p>
          Trong bối cảnh ánh sáng nhân tạo, nhiệt độ màu giúp xác định tâm trạng và bầu không khí của một không gian…
          Hiểu biết về nhiệt độ màu là quan trọng để chọn lựa ánh sáng phù hợp cho các môi trường khác nhau.
        </p>
        <figure className="my-6 overflow-hidden rounded-xl border">
          <img src={heroImg} alt="Bảng màu nhiệt độ ánh sáng" className="w-full object-cover" />
          <figcaption className="px-4 py-2 text-center text-sm text-gray-500">Bảng màu nhiệt độ ánh sáng</figcaption>
        </figure>

        <SectionHeading id="nhiet-do-mau-den-led" index={3}>Nhiệt độ màu đèn led</SectionHeading>
        <p>
          Khi ở khoảng 2700K, ánh sáng gần bóng đèn sợi đốt – tông vàng ấm (“trắng ấm”). Khi tăng nhiệt độ, ánh sáng
          ngả dần sang trắng/xanh (“trắng lạnh”)… Cách gọi ấm/lạnh là theo cảm nhận thị giác thường dùng.
        </p>
        <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-4">
          Tại <strong>GOPINIC</strong> chúng tôi luôn hiển thị <em>màu ánh sáng</em> trong phần “Thông số kỹ thuật”
          của sản phẩm để khách hàng nắm rõ trước khi quyết định.
        </div>

        <SectionHeading id="anh-huong" index={4}>Màu nhiệt độ led ảnh hưởng như thế nào đến chúng ta?</SectionHeading>

        <SectionHeading id="tam-trang" index={"4.1"}>Ảnh hưởng đến tâm trạng và cảm xúc</SectionHeading>
        <p>
          <strong>Nhiệt độ ấm (&lt;3000K)</strong>: tạo cảm giác ấm cúng, thư giãn… <br />
          <strong>Ánh sáng trung tính (3500–4000K)</strong>: cân bằng, trung tính… <br />
          <strong>Ánh sáng lạnh (5000–6500K)</strong>: tăng tỉnh táo, tập trung nhưng thiếu ấm áp.
        </p>

        <SectionHeading id="thi-giac" index={"4.2"}>Ảnh hưởng đến quan điểm thị giác</SectionHeading>
        <p>
          Nhiệt độ thấp tăng bão hòa/độ tương phản, nhận biết chi tiết tốt hơn; nhiệt độ cao cho ánh sáng mềm,
          giảm tương phản và có thể ảnh hưởng cảm nhận không gian.
        </p>

        <SectionHeading id="giac-ngu" index={"4.3"}>Ảnh hưởng đến giấc ngủ</SectionHeading>
        <p>
          Ánh sáng lạnh (giàu thành phần xanh) có thể ức chế melatonin, gây xáo trộn chu kỳ ngủ. Buổi tối nên dùng ánh sáng ấm (2700–3000K).
        </p>

        <SectionHeading id="tot-cho-mat" index={"4.4"}>Nhiệt độ màu nào tốt nhất cho mắt?</SectionHeading>
        <p>
          Thường dễ chịu ở khoảng <strong>4000–5000K</strong>, đủ sáng rõ mà không quá chói cho đa số tác vụ cần tập trung.
        </p>

        <SectionHeading id="chon-den-pin" index={5}>Cách chọn đèn pin có màu ánh sáng phù hợp</SectionHeading>
        <p>Khi chọn mua đèn pin, có ba tuỳ chọn chính về màu ánh sáng:</p>

        <SectionHeading id="anh-sang-lanh" index={"5.1"}>Đèn pin ánh sáng lạnh</SectionHeading>
        <p>
          ~<strong>≥5000K</strong>, trắng xanh sáng, lý tưởng cho hoạt động ngoài trời/tìm kiếm cứu nạn… nhưng có thể gây mỏi mắt và sai lệch màu.
        </p>
        <div className="my-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          Sản phẩm cầm tay phổ biến thường ở <strong>5500–6500K</strong> – phù hợp môi trường hoang dã / soi xa.
        </div>

        <SectionHeading id="anh-sang-trung-tinh" index={"5.2"}>Đèn pin ánh sáng trung tính</SectionHeading>
        <p>
          ~<strong>4000–5000K</strong>, gần ánh sáng mặt trời, lý tưởng cho công việc cần phân biệt màu/chính xác;
          dễ chịu hơn ánh sáng lạnh.
        </p>
        <div className="my-4 rounded-lg border border-rose-200 bg-rose-50 p-4">
          Đèn pin cắm trại thường nên chọn ánh sáng <strong>ấm áp</strong> để tránh chói khi dùng lâu.
        </div>

        <SectionHeading id="anh-sang-am" index={"5.3"}>Đèn pin ánh sáng ấm</SectionHeading>
        <p>
          ~<strong>≤3000K</strong>, trắng vàng dịu, hợp dùng trong nhà/cắm trại, đỡ mỏi mắt khi dùng lâu dài.
        </p>
        <div className="my-4 rounded-lg border border-rose-200 bg-rose-50 p-4">
          Ngoài ra còn có các màu đặc biệt (xanh lam, xanh lục, đỏ) phục vụ các ứng dụng chuyên dụng.
        </div>

        <SectionHeading id="ket-luan" index={6}>Kết luận nhiệt độ màu đèn pin</SectionHeading>
        <p>
          Nhiệt độ màu là chìa khoá để điều chỉnh không gian/tầm nhìn: ấm cho gần & tái tạo màu, lạnh cho soi xa & phản xạ nhanh.
          Chọn dải K phù hợp sẽ giúp trải nghiệm chiếu sáng đúng nhu cầu của bạn.
        </p>
      </div>
    </article>
  );
}
