import PolicyLayout from "./PolicyLayout";
import PolicySidebar from "./PolicySidebar";

const HERO_IMAGE = "/src/assets/banner-page-title.png";

export default function WarrantyPolicyPage() {
  const toc = [
    { label: "Chính sách chung", href: "#chinh-sach-chung" },
    { label: "1. Hàng phân phối chính hãng", href: "#hang-chinh-hang" },
    { label: "2. Giày dép", href: "#giay-dep" },
    { label: "3. Balo – Túi xách", href: "#balo-tui-xach" },
    { label: "4. Đèn pin – Thiết bị chiếu sáng", href: "#den-pin" },
    { label: "5. Ghế xếp gọn", href: "#ghe-xep-gon" },
    { label: "6. Bàn xếp gọn", href: "#ban-xep-gon" },
    { label: "7. Lều dã ngoại", href: "#leu-da-ngoai" },
    { label: "8. Bếp ga xếp gọn", href: "#bep-ga" },
  ];

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">{children}</div>
  );

  return (
    <PolicyLayout
      title="Chính sách bảo hành"
      boxed={false}
      hero={{
        image: HERO_IMAGE,
        centerTitle: "CHÍNH SÁCH BẢO HÀNH",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Chính sách bảo hành" },
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
                Chế độ bảo hành tại <strong>GOPICNIC</strong> được áp dụng riêng cho từng nhóm sản phẩm và cho từng sản phẩm.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Đổi hoặc trả hàng trong vòng <strong>03 ngày</strong> khi gặp bất kỳ lỗi nào do nhà sản xuất.</li>
                <li>
                  Đối với khách hàng ở xa sẽ chấp nhận đổi trả trong vòng <strong>03 ngày</strong> (tính từ thời điểm nhận hàng)
                  khi gặp lỗi do nhà sản xuất. Thời gian gửi hàng về <strong>GOPICNIC</strong> không vượt quá <strong>14 ngày</strong>.
                  Chi phí do <strong>GOPICNIC</strong> thanh toán 100%.
                </li>
                <li>
                  Đối với các sản phẩm không được liệt kê bên dưới sẽ được bảo hành theo từng sản phẩm và chính sách riêng
                  (xem thời gian bảo hành tại trang sản phẩm). Vui lòng liên hệ <strong>contact@gopicnic.vn</strong> để biết thêm thông tin chi tiết.
                </li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="hang-chinh-hang" className="space-y-3 scroll-mt-28">
              <h3 className="text-lg font-semibold">1. Mặt hàng phân phối chính hãng bởi GOPICNIC</h3>
              <p>
                Với các sản phẩm chính hãng, khi khách hàng gặp sự cố xin vui lòng mang đến cửa hàng <strong>GOPICNIC</strong> bất kỳ để được hỗ trợ bảo hành,
                hoặc có thể mang đến trung tâm bảo hành của hãng đó để được hỗ trợ.
              </p>
              <p className="italic">
                Lưu ý: Với các sản phẩm bảo hành chính hãng, <strong>GOPICNIC</strong> là trung gian giữa khách hàng và nhà sản xuất — đại diện cho khách hàng
                để bảo vệ quyền lợi được bảo hành. <strong>GOPICNIC</strong> không quyết định điều kiện áp dụng và chính sách bảo hành đối với những sản phẩm phân phối chính hãng.
              </p>
              <div className="space-y-1">
                <p className="font-medium">Quy trình bảo hành:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li><strong>GOPICNIC</strong> tiếp nhận sản phẩm.</li>
                  <li>Sản phẩm sẽ được thông báo lỗi cho nhà sản xuất.</li>
                  <li>Nhà sản xuất chấp nhận bảo hành: <strong>GOPICNIC</strong> thông báo cho khách hàng và đặt lịch hẹn nhận lại sản phẩm.</li>
                  <li>Nhà sản xuất không chấp nhận bảo hành (lỗi do khách hàng): <strong>GOPICNIC</strong> thông báo và gửi lại sản phẩm.</li>
                  <li>Sản phẩm được bảo hành sẽ gửi cho nhà sản xuất sửa chữa hoặc bảo hành có điều kiện.</li>
                  <li><strong>GOPICNIC</strong> nhận lại sản phẩm và (khi cần) gửi cho bên thứ 3 sửa chữa (có hoặc không có phí).</li>
                </ol>
              </div>
            </section>
          </Card>

          <Card>
            <section id="giay-dep" className="space-y-3 scroll-mt-28">
              <h3 className="text-lg font-semibold">2. Mặt hàng giày dép tại GOPICNIC</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Thời gian bảo hành: <strong>3 tháng</strong>.</li>
                <li>Trong quá trình bảo hành, tất cả lỗi do nhà sản xuất sẽ được đổi mới hoặc sửa chữa tùy thời gian và tình trạng sản phẩm.</li>
                <li>Những lỗi phát sinh trong quá trình sử dụng không phải do nhà sản xuất <strong>GOPICNIC</strong> sẽ từ chối bảo hành.</li>
                <li>Thời gian từ 3–6 tháng: <strong>GOPICNIC</strong> hỗ trợ sửa chữa (đế/keo) tùy trường hợp.</li>
              </ul>
              <p className="italic">Lưu ý: Sản phẩm bảo hành phải còn nguyên vẹn, không bị biến dạng hoặc tác động vật lý bên ngoài.</p>
            </section>
          </Card>

          <Card>
            <section id="balo-tui-xach" className="space-y-3 scroll-mt-28">
              <h3 className="text-lg font-semibold">3. Balo – Túi xách</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Thời gian bảo hành: <strong>12 tháng</strong>.</li>
                <li>Hình thức bảo hành: <strong>toàn bộ đường may và khóa kéo</strong>.</li>
                <li>
                  Điều kiện: Sản phẩm còn nguyên vẹn; đường may/chi tiết không bị ảnh hưởng bởi mài mòn, đứt gãy, ăn mòn bởi hóa chất hoặc yếu tố khác.
                </li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="den-pin" className="space-y-4 scroll-mt-28">
              <div>
                <h3 className="text-lg font-semibold">4. Đèn pin – Thiết bị chiếu sáng</h3>
                <p className="font-medium">4.1. Đèn pin trang trí</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Thời gian bảo hành: <strong>3 tháng</strong>.</li>
                  <li>Điều kiện: Không đứt gãy, chập cháy, rơi vỡ hoặc tác động vật lý bên ngoài.</li>
                  <li>Hỗ trợ: <strong>GOPICNIC</strong> có thể hỗ trợ sửa chữa tùy mức độ hư hại.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">4.2. Đèn pin cầm tay – Đèn đeo đầu</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Thời gian bảo hành: <strong>12 tháng</strong>.</li>
                  <li>Điều kiện: Không có tác động yếu tố bên ngoài/ do người sử dụng (đặc biệt LED và bảng mạch).</li>
                  <li>Không bảo hành: Rơi vỡ, mài mòn, tác động bởi hóa chất, vào nước hoặc oxy-hóa.</li>
                  <li>Không bảo hành đối với <strong>pin Lithium-ion</strong>.</li>
                  <li>Hỗ trợ: <strong>GOPICNIC</strong> hỗ trợ thay thế linh kiện (nếu có), chi phí khách hàng chịu.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">4.3. Đèn lều và các loại đèn khác</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Thời gian bảo hành: <strong>3 tháng</strong>.</li>
                  <li>Điều kiện: Không đứt gãy, chập cháy, rơi vỡ hoặc tác động vật lý bên ngoài.</li>
                </ul>
              </div>
            </section>
          </Card>

          <Card>
            <section id="ghe-xep-gon" className="space-y-3 scroll-mt-28">
              <h3 className="text-lg font-semibold">5. Các loại ghế xếp gọn</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Thời gian bảo hành: <strong>03 tháng</strong>.</li>
                <li>Điều kiện: Không có tác động yếu tố bên ngoài hoặc sử dụng sai công năng.</li>
                <li>Không bảo hành: Sử dụng sai công năng, làm rách vải ghế.</li>
                <li>Hỗ trợ: <strong>GOPICNIC</strong> hỗ trợ thay thế linh kiện tùy trường hợp (chi phí khách hàng chịu).</li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="ban-xep-gon" className="space-y-3 scroll-mt-28">
              <h3 className="text-lg font-semibold">6. Các loại bàn xếp gọn</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Thời gian bảo hành: <strong>03 tháng</strong>.</li>
                <li>Điều kiện: Không có tác động yếu tố bên ngoài hoặc sử dụng sai công năng.</li>
                <li>Không bảo hành: Để quá trọng tải cho phép; sử dụng sai công năng.</li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="leu-da-ngoai" className="space-y-3 scroll-mt-28">
              <h3 className="text-lg font-semibold">7. Các loại lều dã ngoại</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Thời gian bảo hành: <strong>12 tháng</strong>.</li>
                <li>Điều kiện: Bảo hành cho <strong>khung lều</strong>.</li>
                <li>Không bảo hành: Có tác động yếu tố bên ngoài hoặc sử dụng sai công năng.</li>
                <li>Hỗ trợ: <strong>GOPICNIC</strong> hỗ trợ thay thế linh kiện tùy trường hợp (chi phí khách hàng chịu).</li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="bep-ga" className="space-y-3 scroll-mt-28">
              <h3 className="text-lg font-semibold">8. Các loại bếp ga xếp gọn</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Thời gian bảo hành: <strong>06 tháng</strong>.</li>
                <li>Điều kiện: Không có tác động yếu tố bên ngoài hoặc sử dụng sai công năng.</li>
                <li>Hỗ trợ: <strong>GOPICNIC</strong> hỗ trợ thay thế linh kiện tùy trường hợp (chi phí khách hàng chịu).</li>
              </ul>
            </section>
          </Card>

          <Card>
            <section className="space-y-2">
              <h3 className="text-lg font-semibold">Liên hệ bảo hành</h3>
              <p><strong>Công ty TNHH GOPICNIC</strong></p>
              <p>Địa chỉ: 72 Tô Ký, Quận 12, TP. Hồ Chí Minh</p>
              <p>Điện thoại: 0122335566</p>
              <p>Email: contact@gopicnic.vn</p>
            </section>
          </Card>
        </div>
      </div>
    </PolicyLayout>
  );
}
