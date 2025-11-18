import PolicyLayout from "./PolicyLayout";
import PolicySidebar from "./PolicySidebar";

const HERO_IMAGE = "/src/assets/banner-page-title.png";

export default function TermsConditionsPage() {
  const toc = [
    { label: "1. Giới thiệu", href: "#gioi-thieu" },
    { label: "2. Hướng dẫn sử dụng website", href: "#huong-dan" },
    { label: "3. Ý kiến của khách hàng", href: "#y-kien" },
    { label: "4. Chấp nhận đơn hàng và giá cả", href: "#don-hang-gia" },
    { label: "5. Thay đổi / hủy giao dịch", href: "#huy-giao-dich" },
    { label: "6. Lỗi nhập sai thông tin", href: "#loi-thong-tin" },
    { label: "7. Thương hiệu và bản quyền", href: "#thuong-hieu" },
    { label: "8. Quyền pháp lý", href: "#quyen-phap-ly" },
    { label: "9. Quy định về bảo mật", href: "#bao-mat" },
    { label: "10. Thanh toán", href: "#thanh-toan" },
  ];

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">{children}</div>
  );

  return (
    <PolicyLayout
      title="Điều khoản & Điều kiện"
      boxed={false}
      hero={{
        image: HERO_IMAGE,
        centerTitle: "Điều khoản & Điều kiện",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Điều khoản & Điều kiện" },
        ],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <PolicySidebar toc={toc} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <section id="gioi-thieu" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">1. Giới thiệu</h2>
              <p>
                Chào mừng quý khách hàng đến với <strong>GOPICNIC</strong>.
                GOPICNIC là đơn vị chuyên cung cấp các sản phẩm phục vụ cho du lịch và vui chơi ngoài trời
                có địa chỉ Showroom tại <strong>72 Tô Ký, Quận 12, TP. Hồ Chí Minh</strong>.
              </p>
              <p>
                Khi quý khách hàng truy cập vào website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này.
                Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này,
                vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước.
                Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải,
                có nghĩa là quý khách chấp nhận với những thay đổi đó.
              </p>
              <p>
                Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
              </p>
            </section>
          </Card>

          <Card>
            <section id="huong-dan" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">2. Hướng dẫn sử dụng website</h2>
              <p>
                Khi truy cập vào GOPICNIC, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay
                người giám hộ hợp pháp. Khách hàng phải đảm bảo có đầy đủ hành vi dân sự và phải có tài sản để thực hiện các
                giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam. GOPICNIC không có nghĩa vụ xác nhận
                độ tuổi hay năng lực hành vi, năng lực trách nhiệm dân sự, hình sự của khách hàng.
              </p>
              <p>
                Chúng tôi sẽ cấp một tài khoản (Account) sử dụng để khách hàng có thể mua hàng trên website trong khuôn khổ
                Điều khoản và Điều kiện sử dụng đã đề ra.
              </p>
              <p>
                Quý khách hàng sẽ phải đăng ký tài khoản với thông tin xác thực về bản thân và phải cập nhật nếu có bất kỳ thay đổi nào.
                Mỗi người truy cập phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình trên web. Quý khách hàng phải
                thông báo cho chúng tôi biết khi tài khoản bị truy cập trái phép. Chúng tôi không chịu bất kỳ trách nhiệm nào,
                dù trực tiếp hay gián tiếp, đối với những thiệt hại hoặc mất mát gây ra do quý khách không tuân thủ quy định.
              </p>
              <p>
                Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào
                nếu không được chúng tôi cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong đây, chúng tôi sẽ hủy tài khoản
                của khách mà không cần báo trước.
              </p>
            </section>
          </Card>

          <Card>
            <section id="y-kien" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">3. Ý kiến của khách hàng</h2>
              <p>
                Toàn bộ nội dung trang web và ý kiến phê bình của quý khách đều là tài sản của GOPICNIC. Nếu chúng tôi phát hiện
                bất kỳ thông tin giả mạo nào, chúng tôi sẽ khóa tài khoản của quý khách ngay lập tức hoặc áp dụng các biện pháp khác
                theo quy định của pháp luật Việt Nam. GOPICNIC có quyền kiểm duyệt và sử dụng những nội dung, hình ảnh mà khách hàng
                đăng tải lên website.
              </p>
            </section>
          </Card>

          <Card>
            <section id="don-hang-gia" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">4. Chấp nhận đơn hàng và giá cả</h2>
              <p>
                Chúng tôi có quyền từ chối hoặc hủy đơn hàng của quý khách vì bất kỳ lý do gì liên quan đến lỗi kỹ thuật,
                hệ thống một cách khách quan vào bất kỳ lúc nào.
              </p>
              <p>
                Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất cho người tiêu dùng. Tuy nhiên, đôi lúc vẫn có sai sót
                xảy ra, ví dụ như trường hợp giá sản phẩm không hiển thị chính xác trên trang web hoặc sai giá, tùy theo từng trường hợp
                chúng tôi sẽ liên hệ hướng dẫn hoặc thông báo hủy đơn hàng đó cho quý khách. Chúng tôi cũng có quyền từ chối hoặc hủy bỏ
                bất kỳ đơn hàng nào dù đơn hàng đó đã hay chưa được xác nhận hoặc đã thanh toán.
              </p>
            </section>
          </Card>

          <Card>
            <section id="huy-giao-dich" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">5. Thay đổi hoặc hủy bỏ giao dịch tại GOPICNIC</h2>
              <p>Trong mọi trường hợp, khách hàng đều có quyền chấm dứt giao dịch nếu đã thực hiện các biện pháp sau đây:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Thông báo cho GOPICNIC về việc hủy giao dịch qua đường dây nóng (hotline <strong>0122335566</strong>)
                </li>
                <li>
                  Đổi lại hàng hoá đã nhận nhưng chưa sử dụng hoặc hưởng bất kỳ lợi ích nào từ hàng hóa đó (theo quy định của
                  chính sách đổi trả hàng).
                </li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="loi-thong-tin" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">6. Giải quyết hậu quả do lỗi nhập sai thông tin tại GOPICNIC</h2>
              <p>
                Khách hàng có trách nhiệm cung cấp thông tin đầy đủ và chính xác khi tham gia giao dịch tại GOPICNIC.
                Trong trường hợp khách hàng nhập sai thông tin và gửi vào trang GOPICNIC, GOPICNIC có quyền từ chối thực hiện giao dịch.
                Ngoài ra, trong mọi trường hợp, khách hàng đều có quyền đơn phương chấm dứt giao dịch nếu đã thực hiện các biện pháp
                sau đây:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Thông báo cho GOPICNIC về việc hủy giao dịch qua đường dây nóng (hotline <strong>0122335566</strong>)
                </li>
                <li>Đổi lại hàng hoá đã nhận nhưng chưa sử dụng hoặc hưởng bất kỳ lợi ích nào từ hàng hóa đó.</li>
              </ul>
            </section>
          </Card>

          <Card>
            <section id="thuong-hieu" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">7. Thương hiệu và bản quyền</h2>
              <p>
                Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung thông tin và tất cả các thiết kế, văn bản, đồ họa,
                phần mềm, hình ảnh, video, âm nhạc, âm thanh, biên dịch phần mềm, mã nguồn và phần mềm cơ bản đều là tài sản của GOPICNIC.
                Toàn bộ nội dung của trang web được bảo vệ bởi luật bản quyền của Việt Nam và các công ước quốc tế. Bản quyền đã được bảo lưu.
              </p>
            </section>
          </Card>

          <Card>
            <section id="quyen-phap-ly" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">8. Quyền pháp lý</h2>
              <p>
                Các điều kiện, điều khoản và nội dung của trang web này được điều chỉnh bởi luật pháp Việt Nam và Tòa án có thẩm quyền tại Việt Nam
                sẽ giải quyết bất kỳ tranh chấp nào phát sinh từ việc sử dụng trái phép trang web này.
              </p>
            </section>
          </Card>

          <Card>
            <section id="bao-mat" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">9. Quy định về bảo mật</h2>
              <p>
                Trang web của GOPICNIC coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt nhất bảo vệ thông tin và việc thanh toán của
                quý khách. Thông tin của quý khách trong quá trình thanh toán sẽ được mã hóa để đảm bảo an toàn. Sau khi quý khách hoàn thành quá
                trình đặt hàng, quý khách sẽ thoát khỏi chế độ an toàn.
              </p>
              <p>
                Quý khách không được sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu.
                Trang web cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống.
                Cá nhân hay tổ chức vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.
              </p>
              <p>Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ quan pháp luật yêu cầu.</p>
            </section>
          </Card>

          <Card>
            <section id="thanh-toan" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">10. Thanh toán an toàn và tiện lợi tại GOPICNIC</h2>
              <p>Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:</p>

              <h3 className="font-medium">Cách 1: Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán):</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;</li>
                <li>Người mua đến địa chỉ bán hàng;</li>
                <li>Người mua thanh toán và nhận hàng;</li>
              </ol>

              <h3 className="font-medium">Cách 2: Thanh toán sau (COD – giao hàng và thu tiền tận nơi):</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;</li>
                <li>Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);</li>
                <li>Người bán xác nhận thông tin Người mua;</li>
                <li>Người bán chuyển hàng;</li>
                <li>Người mua nhận hàng và thanh toán.</li>
              </ol>

              <h3 className="font-medium">Cách 3: Thanh toán online qua thẻ tín dụng, chuyển khoản</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;</li>
                <li>Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);</li>
                <li>Người bán xác nhận thông tin Người mua;</li>
                <li>Ngưởi mua thanh toán;</li>
                <li>Người bán chuyển hàng;</li>
                <li>Người mua nhận hàng.</li>
              </ol>

              <p>
                Đối với người mua hàng từ GOPICNIC thì phải tuân thủ theo chính sách thanh toán của công ty.
              </p>
            </section>
          </Card>
        </div>
      </div>
    </PolicyLayout>
  );
}
