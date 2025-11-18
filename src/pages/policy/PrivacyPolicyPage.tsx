import PolicyLayout from "./PolicyLayout";
import PolicySidebar from "./PolicySidebar";

const HERO_IMAGE = "/src/assets/banner-page-title.png";

export default function PrivacyPolicyPage() {
  const toc = [
    { label: "1. Tổng quan", href: "#tong-quan" },
    { label: "2. Đánh giá / Nhận xét / Hỏi đáp", href: "#danh-gia" },
    { label: "3. Hình ảnh", href: "#hinh-anh" },
    { label: "4. Đăng nhập & Cookie", href: "#cookie" },
    { label: "5. Nội dung nhúng", href: "#noi-dung-nhung" },
    { label: "6. Thời gian lưu dữ liệu", href: "#luu-bao-lau" },
    { label: "7. Quyền của bạn", href: "#quyen-cua-ban" },
    { label: "8. Nơi lưu dữ liệu & đơn vị quản lý", href: "#noi-luu-du-lieu" },
  ];

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">{children}</div>
  );

  return (
    <PolicyLayout
      title="Chính sách bảo mật"
      boxed={false}
      hero={{
        image: HERO_IMAGE,
        centerTitle: "CHÍNH SÁCH BẢO MẬT",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Chính sách bảo mật" },
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
              <h2 className="text-xl font-semibold">
                CHÚNG TÔI THU THẬP DỮ LIỆU CÁ NHÂN NÀO VÀ TẠI SAO CHÚNG TÔI LẠI THU THẬP CHÚNG
              </h2>
              <h3 className="font-semibold text-lg">1. TỔNG QUAN</h3>
              <p>
                Trang web của chúng tôi coi trọng việc bảo mật thông tin. Chúng tôi sử dụng các biện pháp tốt nhất bảo vệ thông tin
                và việc thanh toán của quý khách. Thông tin của quý khách trong quá trình thanh toán sẽ được mã hóa để đảm bảo an toàn.
                Toàn bộ dữ liệu được thu thập của khách hàng chỉ nhằm mục đích đáp ứng nhu cầu vận chuyển đơn hàng của quý khách hàng
                và thực hiện chính sách bảo hành hoặc các trường hợp liên quan đến sản phẩm về sau.
              </p>
              <p>
                Chúng tôi chỉ sử dụng trong nội bộ và không cung cấp Thông Tin Khách Hàng cho bất kỳ bên thứ ba nào. Trừ trường hợp phải
                thực hiện theo yêu cầu của các cơ quan có thẩm quyền, hoặc theo quy định của pháp luật. Và khi việc cung cấp thông tin đó là
                cần thiết để <strong>GOPICNIC</strong> cung cấp dịch vụ/tiện ích cho khách hàng (ví dụ: cung cấp các thông tin giao nhận
                cần thiết cho các đơn vị đối tác vận chuyển …).
              </p>
              <p>
                Quý khách không được sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi
                cấu trúc dữ liệu. Trang web cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp và phá hoại
                hay xâm nhập vào dữ liệu của hệ thống. Cá nhân hay tổ chức vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.
              </p>
              <p>
                <strong>GOPICNIC</strong> cam kết tất cả các thông tin và dữ liệu Khách hàng đều được bảo mật và chỉ dùng cho việc giao dịch đơn hàng
                hoặc chăm sóc khách hàng. Không phát tán hay để lộ thông tin cá nhân khách hàng.
              </p>
            </section>
          </Card>

          <Card>
            <section id="danh-gia" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">2. ĐÁNH GIÁ - COMMENT - NHẬN XÉT & HỎI ĐÁP</h3>
              <p>
                Khi khách truy cập để lại đánh giá, nhận xét, hoặc hỏi đáp trên trang web, chúng tôi thu thập dữ liệu được hiển thị trong biểu mẫu nhận xét,
                cũng như địa chỉ IP của khách truy cập và chuỗi tác nhân người dùng trình duyệt để giúp phát hiện spam.
              </p>
              <p>
                Một mã ẩn danh được tạo từ địa chỉ email của bạn (còn được gọi là mã hash) có thể được cung cấp cho dịch vụ Gravatar để xem bạn có đang sử dụng
                nó hay không. Chính sách bảo mật của dịch vụ Gravatar có tại đây:{" "}
                <a href="https://automattic.com/privacy/" target="_blank" rel="noreferrer" className="text-green-primary underline">
                  https://automattic.com/privacy/
                </a>. Sau khi phê duyệt nhận xét của bạn, ảnh hồ sơ Gravatar của bạn sẽ hiển thị công khai trong nhận xét của bạn.
              </p>
            </section>
          </Card>

          <Card>
            <section id="hinh-anh" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">3. HÌNH ẢNH</h3>
              <p>
                Trong một số đánh giá và nhận xét, <strong>GOPICNIC</strong> cho phép bạn tải lên hình ảnh. Nếu bạn tải hình ảnh lên trang web của chúng tôi,
                bạn nên tránh tải lên hình ảnh có bao gồm dữ liệu vị trí (EXIF GPS). Khách truy cập trang web có thể tải xuống và trích xuất bất kỳ dữ liệu vị trí
                nào từ hình ảnh trên trang web của chúng tôi.
              </p>
            </section>
          </Card>

          <Card>
            <section id="cookie" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">4. ĐĂNG NHẬP VÀ COOKIE</h3>
              <p>
                Nếu bạn để lại nhận xét trên trang web của chúng tôi, bạn có thể chọn lưu tên, địa chỉ email và trang web của bạn trong cookie.
                Đây là những điều thuận tiện cho bạn để bạn không phải điền lại thông tin chi tiết của mình khi bạn để lại bình luận khác.
                Những cookie này sẽ tồn tại trong một năm.
              </p>
              <p>
                Nếu bạn có tài khoản và đăng nhập vào trang web này, chúng tôi sẽ đặt cookie tạm thời để xác định xem trình duyệt của bạn có chấp nhận
                cookie hay không. Cookie này không chứa dữ liệu cá nhân và sẽ bị loại bỏ khi bạn đóng trình duyệt của mình.
              </p>
              <p>
                Khi bạn đăng nhập, chúng tôi cũng sẽ thiết lập một số cookie để lưu thông tin đăng nhập và các lựa chọn hiển thị trên màn hình của bạn.
                Cookie đăng nhập tồn tại trong ba ngày và cookie tùy chọn màn hình tồn tại trong một năm. Nếu bạn chọn “Ghi nhớ”, thông tin đăng nhập của bạn
                sẽ tồn tại trong một tháng. Nếu bạn đăng xuất khỏi tài khoản của mình, cookie đăng nhập sẽ bị xóa.
              </p>
              <p>
                Nếu bạn chỉnh sửa hoặc xuất bản một bài viết, một cookie bổ sung sẽ được lưu trong trình duyệt của bạn. Cookie này không bao gồm dữ liệu cá nhân
                và chỉ cho biết ID bài đăng của bài viết bạn vừa chỉnh sửa. Thời gian lưu trữ sẽ hết hạn sau 1 ngày.
              </p>
            </section>
          </Card>

          <Card>
            <section id="noi-dung-nhung" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">5. NỘI DUNG NHÚNG TỪ WEBSITE KHÁC</h3>
              <p>
                Các bài viết trên trang web này có thể bao gồm nội dung nhúng (ví dụ: video YouTube, hình ảnh Gravatar, bài báo, v.v.).
                Nội dung được nhúng từ các trang web khác hoạt động theo cách giống hệt như khi khách truy cập đã truy cập trang web khác.
              </p>
              <p>
                Các trang web này có thể thu thập dữ liệu về bạn, sử dụng cookie, nhúng theo dõi bên thứ ba bổ sung
                và theo dõi tương tác của bạn với nội dung được nhúng đó, bao gồm cả việc theo dõi tương tác của bạn
                với nội dung được nhúng nếu bạn có tài khoản và đăng nhập vào trang web đó.
              </p>
            </section>
          </Card>

          <Card>
            <section id="luu-bao-lau" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">6. DỮ LIỆU CỦA BẠN SẼ ĐƯỢC LƯU BAO LÂU</h3>
              <p>
                Nếu bạn để lại nhận xét, nhận xét và siêu dữ liệu của nó sẽ được giữ lại vô thời hạn.
                Điều này để chúng tôi có thể nhận ra và phê duyệt bất kỳ nhận xét tiếp theo nào một cách tự động
                thay vì giữ chúng trong hàng đợi kiểm duyệt.
              </p>
              <p>
                Đối với người dùng đăng ký trên trang web của chúng tôi (nếu có), chúng tôi cũng lưu trữ thông tin cá nhân
                mà họ cung cấp trong hồ sơ người dùng của họ. Tất cả người dùng có thể xem, chỉnh sửa hoặc xóa thông tin cá nhân
                của họ bất kỳ lúc nào (ngoại trừ họ không thể thay đổi tên người dùng của mình – user name).
                Người quản trị trang web cũng có thể xem và chỉnh sửa thông tin đó.
              </p>
            </section>
          </Card>

          <Card>
            <section id="quyen-cua-ban" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">7. QUYỀN CỦA BẠN ĐỐI VỚI DỮ LIỆU CỦA BẠN</h3>
              <p>
                Nếu bạn có tài khoản trên trang web này hoặc đã để lại nhận xét, bạn có thể yêu cầu nhận tệp dữ liệu cá nhân đã xuất
                mà chúng tôi lưu giữ về bạn, bao gồm bất kỳ dữ liệu nào bạn đã cung cấp cho chúng tôi. Bạn cũng có thể yêu cầu chúng tôi
                xóa mọi dữ liệu cá nhân mà chúng tôi giữ về bạn. Điều này không bao gồm bất kỳ dữ liệu nào mà chúng tôi có nghĩa vụ lưu giữ
                cho các mục đích quản trị, pháp lý hoặc bảo mật.
              </p>
            </section>
          </Card>

          <Card>
            <section id="noi-luu-du-lieu" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">8. NƠI CHÚNG TÔI LƯU DỮ LIỆU CỦA BẠN</h3>
              <p><strong>Nơi lưu trữ dữ liệu:</strong> VIETTEL IDC Bình Dương</p>
              <p><strong>Đơn vị quản lý dữ liệu:</strong> Công Ty TNHH GOPICNIC</p>
              <p><strong>Địa chỉ:</strong> 72 Tô Ký, Quận 12, TP. Hồ Chí Minh</p>
              <p><strong>Điện thoại:</strong> 0122335566</p>
              <p><strong>Email:</strong> contact@gopicnic.vn</p>
            </section>
          </Card>
        </div>
      </div>
    </PolicyLayout>
  );
}
