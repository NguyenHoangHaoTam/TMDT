import PolicyLayout from "@/pages/policy/PolicyLayout";
import PolicySidebar from "@/pages/policy/PolicySidebar";

const HERO_IMAGE = "/src/assets/banner-page-title.png"; 

export default function ShippingDeliveryPage() {
  const toc = [
    { label: "Chính sách chung", href: "#chinh-sach-chung" },
    { label: "I. Chuyển phát hỏa tốc", href: "#hoa-toc" },
    { label: "II. Chuyển phát nhanh", href: "#nhanh" },
    { label: "III. Chuyển phát tiết kiệm", href: "#tiet-kiem" },
  ];

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">{children}</div>
  );

  return (
    <PolicyLayout
      title="Giao và nhận hàng"
      boxed={false}
      hero={{
        image: HERO_IMAGE,
        centerTitle: "GIAO & NHẬN HÀNG",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Giao và nhận hàng" },
        ],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <PolicySidebar toc={toc} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <section id="chinh-sach-chung" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Chính sách chung</h2>
              <p>
                <strong>GOPICNIC</strong> <u>miễn phí vận chuyển</u> cho tất cả đơn hàng
                <strong> từ 300.000đ</strong> khi <strong>thanh toán trước</strong>. Giá trị đơn hàng có thể gồm
                một hoặc nhiều sản phẩm, không xét kích thước/trọng lượng (áp dụng với hình thức <em>giao hàng tiết kiệm</em>).
              </p>
              <p>
                Với yêu cầu <strong>ship hỏa tốc</strong> tại 3 thành phố <strong>Hồ Chí Minh – Đà Nẵng – Hà Nội</strong>,
                phí vận chuyển được tính như thông thường (không áp dụng miễn phí).
              </p>
            </section>
          </Card>

          <Card>
            <section id="hoa-toc" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">I. Chuyển phát Hỏa tốc</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Áp dụng cho đơn nội thành: Hồ Chí Minh, Đà Nẵng, Hà Nội.</li>
                <li>Dùng dịch vụ đối tác: Grab, Ahamove,…</li>
                <li>
                  Phí ship sẽ được nhân viên <strong>GOPICNIC</strong> thông báo khi bạn đặt hàng và yêu cầu hỏa tốc.
                </li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="nhanh" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">II. Chuyển phát nhanh</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Giá cước theo biểu phí của các đơn vị: Viettel Post, EMS,…</li>
                <li>Thời gian vận chuyển: khoảng <strong>1–3 ngày</strong> (tuỳ địa lý & điều kiện khách quan).</li>
                <li>Phí ship sẽ được thông báo khi xác nhận đơn hàng.</li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="tiet-kiem" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">III. Chuyển phát tiết kiệm</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Đối tác: Viettel Post, GHTK, J&T, GHN, BEST, Ninja Van,…
                </li>
                <li>Thời gian vận chuyển: khoảng <strong>3–5 ngày</strong> (tuỳ địa lý & điều kiện khách quan).</li>
                <li>Phí ship sẽ được thông báo khi xác nhận đơn hàng.</li>
              </ul>
            </section>
          </Card>
        </div>
      </div>
    </PolicyLayout>
  );
}
