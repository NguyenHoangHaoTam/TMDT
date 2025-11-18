import PolicyLayout from "./PolicyLayout";
import PolicySidebar from "./PolicySidebar";

const HERO_IMAGE = "/src/assets/banner-page-title.png";

export default function ReturnPolicyPage() {
  const toc = [
    { label: "Chính sách đổi trả – Tổng quan", href: "#tong-quan" },
    { label: "Điều kiện đổi hàng", href: "#dieu-kien-doi" },
    { label: "Liên hệ / Địa chỉ đổi hàng", href: "#lien-he" },
  ];

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">{children}</div>
  );

  return (
    <PolicyLayout
      title="Chính sách đổi trả"
      boxed={false}
      hero={{
        image: HERO_IMAGE,
        centerTitle: "CHÍNH SÁCH ĐỔI TRẢ",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Chính sách đổi trả" },
        ],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <PolicySidebar toc={toc} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <section id="tong-quan" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Chính sách đổi trả – Tổng quan</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Đổi hoặc trả hàng trong vòng <strong>03 ngày</strong> khi gặp bất kỳ lỗi nào do nhà sản xuất.
                </li>
                <li>
                  Đối với khách hàng ở xa: chấp nhận đổi trả trong vòng <strong>03 ngày</strong> (tính từ thời điểm nhận hàng)
                  khi gặp lỗi do nhà sản xuất. Thời gian gửi hàng về <strong>GOPICNIC</strong> không vượt quá
                  <strong> 14 ngày</strong>. Chi phí vận chuyển do <strong>GOPICNIC</strong> thanh toán <strong>100%</strong>.
                </li>
                <li>
                  Sản phẩm gửi đổi – trả sẽ <strong>không</strong> được <strong>GOPICNIC</strong> chấp nhận nếu không đáp ứng
                  một trong các điều kiện ở mục “Điều kiện đổi hàng”. Khi đó, Quý khách sẽ cần thanh toán chi phí cho
                  <strong> 2 lần vận chuyển</strong> (gửi hàng về cho <strong>GOPICNIC</strong> và <strong>GOPICNIC</strong> gửi trả lại cho Quý khách).
                </li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="dieu-kien-doi" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Điều kiện đổi hàng</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hàng còn trong tình trạng ban đầu, chưa qua sử dụng, còn nguyên tem/nhãn mác.</li>
                <li>Chưa qua giặt, là (ủi) hoặc bị bẩn, hư hỏng.</li>
                <li>Hoàn trả sản phẩm trong bao bì có dán mã sản phẩm bên ngoài.</li>
                <li>Hoàn trả sản phẩm kèm <strong>Hóa đơn mua hàng</strong>.</li>
                <li>Trong vòng <strong>03 ngày</strong> kể từ ngày mua/nhận hàng.</li>
                <li>Chỉ áp dụng đổi <strong>cùng sản phẩm</strong> nhưng khác màu, khác size.</li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="lien-he" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Liên hệ / Địa chỉ đổi hàng</h2>
              <p className="font-medium">Quý khách liên hệ theo thông tin bên dưới để được hỗ trợ đổi hàng:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Điện thoại (Zalo): <strong>0122335566</strong></li>
                <li>Email: <strong>contact@gopicnic.vn</strong></li>
              </ul>
              <div className="pt-2 space-y-1">
                <p><strong>Công ty TNHH GOPICNIC</strong></p>
                <p>Địa chỉ tiếp nhận đổi trả: <strong>72 Tô Ký, Quận 12, TP. Hồ Chí Minh</strong></p>
              </div>
              <p className="text-sm text-gray-600">
                *Lưu ý: Với các sản phẩm không được liệt kê cụ thể trong chính sách này, thời hạn/điều kiện đổi trả có thể áp dụng theo từng
                sản phẩm và chính sách riêng (xem tại trang chi tiết sản phẩm hoặc liên hệ bộ phận hỗ trợ).
              </p>
            </section>
          </Card>
        </div>
      </div>
    </PolicyLayout>
  );
}
