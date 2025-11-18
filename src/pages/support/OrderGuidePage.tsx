import PolicyLayout from "@/pages/policy/PolicyLayout";
import PolicySidebar from "@/pages/policy/PolicySidebar";

const HERO_IMAGE = "/src/assets/banner-page-title.png"; 

export default function OrderGuidePage() {
  const toc = [
    { label: "Tổng quan", href: "#tong-quan" },
    { label: "Bước 1: Tạo tài khoản / Đăng nhập", href: "#buoc-1" },
    { label: "Bước 2: Chọn sản phẩm & thêm vào giỏ", href: "#buoc-2" },
    { label: "Bước 3: Cập nhật giỏ hàng", href: "#buoc-3" },
    { label: "Bước 4: Điền thông tin & gửi đơn", href: "#buoc-4" },
    { label: "Chú ý", href: "#chu-y" },
  ];

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">{children}</div>
  );

  return (
    <PolicyLayout
      title="Hướng dẫn đặt hàng"
      boxed={false}
      hero={{
        image: HERO_IMAGE,
        centerTitle: "HƯỚNG DẪN ĐẶT HÀNG",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Hướng dẫn đặt hàng" },
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
              <h2 className="text-xl font-semibold">Tổng quan</h2>
              <p>
                Với sự tiện ích của việc mua hàng qua tài khoản (tích điểm, chiết khấu, xem lịch sử đặt hàng,
                tra cứu), <strong>GOPICNIC</strong> khuyến khích bạn nên đăng ký tài khoản
                tại website của chúng tôi (hoàn toàn miễn phí và chỉ mất khoảng 1 phút).
              </p>
            </section>
          </Card>

          <Card>
            <section id="buoc-1" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Bước 1: Tạo tài khoản / Đăng nhập</h2>
              <p>
                Quý khách tạo tài khoản (nếu chưa có) hoặc đăng nhập để bắt đầu đặt hàng.
              </p>
              <p className="font-medium">Tiện ích khi mua hàng qua tài khoản GOPICNIC:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lưu lại lịch sử mua hàng, thuận tiện tra cứu.</li>
                <li>Lưu sản phẩm yêu thích.</li>
                <li>Cộng dồn hoá đơn để nhận chiết khấu.</li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="buoc-2" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Bước 2: Chọn sản phẩm & thêm vào giỏ</h2>
              <p>
                Sau khi tìm được sản phẩm yêu thích, chọn <strong>số lượng</strong>, <strong>màu sắc/kích cỡ</strong> (nếu có),
                rồi bấm <strong>Mua ngay</strong> (mua một sản phẩm) hoặc <strong>Thêm vào giỏ</strong> (để tiếp tục chọn sản phẩm khác).
              </p>
            </section>
          </Card>

          <Card>
            <section id="buoc-3" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Bước 3: Cập nhật giỏ hàng</h2>
              <p>
                Tại trang giỏ, bạn có thể thay đổi số lượng bằng cách nhập lại ở ô số lượng,
                sau đó bấm <strong>Mua ngay</strong> để sang bước thanh toán.
              </p>
            </section>
          </Card>

          <Card>
            <section id="buoc-4" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Bước 4: Điền thông tin & gửi đơn</h2>
              <p>
                Điền đầy đủ <strong>thông tin nhận hàng</strong>, chọn <strong>hình thức thanh toán</strong>,
                và bấm <strong>Gửi đơn hàng</strong>. Sau khi gửi thành công, nhân viên <strong>GOPICNIC</strong> sẽ liên hệ
                để xác nhận và tiến hành giao dịch.
              </p>
            </section>
          </Card>

          <Card>
            <section id="chu-y" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">Chú ý</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mọi thắc mắc có thể liên hệ bộ phận kinh doanh online qua Facebook, email hoặc điện thoại.</li>
                <li>Để giao hàng thuận tiện, vui lòng ghi đúng &amp; đủ thông tin khi đăng ký/thanh toán.</li>
                <li>Đơn hàng thiếu thông tin thiết yếu (họ tên, địa chỉ, điện thoại) có thể bị từ chối.</li>
                <li>Những đơn hàng không hợp lệ theo đánh giá của <strong>GOPICNIC</strong> có thể bị từ chối.</li>
              </ul>
            </section>
          </Card>
        </div>
      </div>
    </PolicyLayout>
  );
}
