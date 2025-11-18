import PolicyLayout from "./PolicyLayout";
import PolicySidebar from "./PolicySidebar";

const HERO_IMAGE = "/src/assets/banner-page-title.png";

export default function ConsumerProtectionPage() {
  const toc = [
    { label: "1. Mục đích & phạm vi thu thập", href: "#muc-dich" },
    { label: "2. Phạm vi sử dụng thông tin", href: "#pham-vi" },
    { label: "3. Thời gian lưu trữ", href: "#thoi-gian" },
    { label: "4. Đối tượng được tiếp cận", href: "#tiep-can" },
    { label: "5. Đơn vị quản lý & liên hệ", href: "#don-vi" },
    { label: "6. Quyền truy cập/chỉnh sửa của người dùng", href: "#quyen-nguoi-dung" },
    { label: "Cơ chế tiếp nhận & giải quyết khiếu nại", href: "#khieu-nai" },
  ];

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">{children}</div>
  );

  return (
    <PolicyLayout
      title="Chính sách bảo vệ thông tin cá nhân của người tiêu dùng"
      boxed={false}
      hero={{
        image: HERO_IMAGE,
        centerTitle: "CHÍNH SÁCH BẢO VỆ THÔNG TIN NGƯỜI TIÊU DÙNG",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Chính sách bảo vệ thông tin người tiêu dùng" },
        ],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <PolicySidebar toc={toc} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <section id="muc-dich" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">
                Chính sách bảo vệ thông tin cá nhân của người tiêu dùng (Điều 68 đến Điều 73)
              </h2>
              <h3 className="font-semibold text-lg">1. Mục đích và phạm vi thu thập thông tin cá nhân</h3>
              <p>
                Việc thu thập dữ liệu chủ yếu trên website bao gồm: họ tên, điện thoại, địa chỉ khách hàng.
                Đây là các thông tin mà chúng tôi cần thành viên cung cấp bắt buộc khi gửi thông tin nhờ tư vấn
                hay muốn mua sản phẩm và để chúng tôi liên hệ xác nhận lại với khách hàng trên website nhằm đảm
                bảo quyền lợi cho người tiêu dùng.
              </p>
              <p>
                Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới
                thông tin mà mình cung cấp và hộp thư điện tử của mình. Ngoài ra, thành viên có trách nhiệm thông
                báo kịp thời cho website chúng tôi về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật,
                lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
              </p>
            </section>
          </Card>

          <Card>
            <section id="pham-vi" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">2. Phạm vi sử dụng thông tin</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Liên hệ hỗ trợ địa chỉ đại lý phân phối sản phẩm gần nhất khi nhận được yêu cầu từ thành viên.
                </li>
                <li>Cung cấp thông tin về sản phẩm đến khách hàng nếu có yêu cầu từ khách hàng.</li>
                <li>Gửi tin nhắn tiếp thị, khuyến mại về hàng hóa do chúng tôi cung cấp.</li>
                <li>Liên lạc và giải quyết với người dùng trong những trường hợp đặc biệt.</li>
                <li>
                  Không sử dụng thông tin cá nhân của người dùng ngoài mục đích xác nhận và liên hệ có liên quan
                  đến giao dịch.
                </li>
                <li>
                  Cung cấp theo yêu cầu của cơ quan tư pháp gồm: Viện kiểm sát, tòa án, cơ quan công an điều tra
                  liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng.
                </li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="thoi-gian" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">3. Thời gian lưu trữ thông tin</h3>
              <p>
                Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu Ban quản trị hủy bỏ.
                Còn lại, trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của chúng tôi.
              </p>
            </section>
          </Card>

          <Card>
            <section id="tiep-can" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">4. Những người hoặc tổ chức có thể tiếp cận với thông tin cá nhân</h3>
              <p>Đối tượng được tiếp cận với thông tin cá nhân của khách hàng thuộc một trong những trường hợp sau:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nhân viên của công ty.</li>
                <li>Ban quản trị.</li>
                <li>Bên thứ ba có dịch vụ tích hợp với Website: <strong>gopicnic.vn</strong>.</li>
                <li>
                  Cơ quan nhà nước có thẩm quyền trong trường hợp có yêu cầu theo quy định tại quy chế hoạt động.
                </li>
                <li>Cố vấn tài chính, pháp lý và Công ty kiểm toán.</li>
                <li>Bên khiếu nại chứng minh được hành vi vi phạm của Người Tiêu Dùng.</li>
                <li>Theo yêu cầu của cơ quan nhà nước có thẩm quyền.</li>
                <li>
                  Các đối tác có ký hợp đồng thực hiện 1 phần dịch vụ của Công Ty. Các đối tác này sẽ nhận được
                  những thông tin theo thỏa thuận hợp đồng (có thể 1 phần hoặc toàn bộ thông tin tùy theo điều khoản
                  hợp đồng) để tiến hành hỗ trợ người dùng sử dụng dịch vụ do Công ty cung cấp.
                </li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="don-vi" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">5. Địa chỉ của đơn vị quản lý và thu thập thông tin cá nhân</h3>
              <p><strong>Công ty TNHH GOPICNIC</strong></p>
              <p>Địa chỉ: <strong>72 Tô Ký, Quận 12, TP. Hồ Chí Minh</strong></p>
              <p>Điện thoại: <strong>0122335566</strong></p>
              <p>Email: <strong>contact@gopicnic.vn</strong></p>
            </section>
          </Card>

          <Card>
            <section id="quyen-nguoi-dung" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">
                6. Phương tiện và công cụ để người dùng tiếp cận và sửa đổi thông tin cá nhân của mình
              </h3>
              <p>
                – Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách
                liên hệ với Ban quản trị website để thực hiện việc này.
              </p>
              <p>
                – Thành viên có quyền gửi khiếu nại về nội dung bảo mật thông tin, đề nghị liên hệ Ban quản trị của website.
                Khi tiếp nhận những phản hồi này, chúng tôi sẽ xác nhận lại thông tin; trường hợp đúng như phản ánh của thành viên,
                tùy theo mức độ, chúng tôi sẽ có biện pháp xử lý kịp thời.
              </p>
              <p className="font-medium">Các hình thức tiếp nhận thông tin khiếu nại của Người Tiêu Dùng:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Qua email: <strong>contact@gopicnic.vn</strong></li>
                <li>Qua điện thoại (Zalo): <strong>0122335566</strong></li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="khieu-nai" className="space-y-3 scroll-mt-28">
              <h3 className="font-semibold text-lg">* Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng</h3>
              <p>
                Mọi tranh chấp phát sinh giữa Công ty và Người dùng sẽ được giải quyết trên cơ sở thương lượng. Trường hợp
                không đạt được thỏa thuận như mong muốn, một trong hai bên có quyền đưa vụ việc ra Tòa án nhân dân có thẩm quyền
                để giải quyết.
              </p>
              <p>
                Khi không giải quyết được qua thương lượng, hòa giải như trên, bên bị vi phạm tập hợp các chứng cứ như email,
                tin nhắn … và liên lạc với Công ty. Công ty sẽ liên lạc lại với người khiếu nại để giải quyết. Nếu vụ việc vượt
                quá thẩm quyền, Công ty sẽ đề nghị chuyển vụ việc cho các cơ quan chức năng có thẩm quyền; trong trường hợp này,
                Công ty vẫn phối hợp hỗ trợ để bảo vệ tốt nhất bên bị vi phạm.
              </p>
              <p>
                Thông tin cá nhân của thành viên được cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân. Việc
                thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những
                trường hợp pháp luật có quy định khác.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên
                  khi không có sự đồng ý từ thành viên.
                </li>
                <li>
                  Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên,
                  chúng tôi sẽ thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.
                </li>
                <li>
                  Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của thành viên bao gồm thông tin hóa đơn, kế toán, chứng từ số hóa.
                </li>
                <li>
                  Ban quản lý yêu cầu các cá nhân khi đăng ký/mua hàng phải cung cấp đầy đủ thông tin cá nhân liên quan như:
                  Họ và tên, địa chỉ liên lạc, điện thoại,… và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lý
                  không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại liên quan đến quyền lợi của thành viên đó nếu xét thấy
                  các thông tin cá nhân cung cấp ban đầu là không chính xác.
                </li>
              </ul>
              <p><em>Xin chân thành cảm ơn!</em></p>
            </section>
          </Card>
        </div>
      </div>
    </PolicyLayout>
  );
}
