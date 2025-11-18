import { useState } from "react";
import PolicyLayout from "@/pages/policy/PolicyLayout";
import PolicySidebar from "@/pages/policy/PolicySidebar";

const MemberPolicyPage = () => {
  const toc = [
    { label: "Mua Hàng & Nâng Cấp Thành Viên", href: "#upgrade-membership" },
    { label: "Quyền Lợi Thành Viên", href: "#membership-benefits" },
    { label: "Quy Định & Thông Tin", href: "#terms" },
    { label: "FAQ - Câu Hỏi Thường Gặp", href: "#faq" },
  ];

  const [selectedMember, setSelectedMember] = useState("TITANIUM");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null); 

  const handleFAQToggle = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index); 
  };

  const renderMemberInfo = () => {
    switch (selectedMember) {
      case "TITANIUM":
        return (
          <div className="membership-info fade-in">
            <h3>Điều Kiện:</h3>
            <p>Chi tiêu trên 15.000.000đ</p>
            <h3>Quyền Lợi:</h3>
            <ul>
              <li>GIẢM 8% TRÊN TỔNG HÓA ĐƠN</li>
              <li>Mua sản phẩm 0đ theo Combo</li>
              <li>Quà tặng tự chọn khi mua đơn hàng mới</li>
              <li>Miễn phí ship đơn hàng trên 1.000.000đ</li>
            </ul>
          </div>
        );
      case "ALUMINUM":
        return (
          <div className="membership-info fade-in">
            <h3>Điều Kiện:</h3>
            <p>Chi tiêu trên 10.000.000đ</p>
            <h3>Quyền Lợi:</h3>
            <ul>
              <li>GIẢM 5% TRÊN TỔNG HÓA ĐƠN</li>
              <li>Mua sản phẩm 0đ theo Combo</li>
              <li>Miễn phí ship đơn hàng trên 500.000đ</li>
            </ul>
          </div>
        );
      case "STAINLESS":
        return (
          <div className="membership-info fade-in">
            <h3>Điều Kiện:</h3>
            <p>Chi tiêu trên 5.000.000đ</p>
            <h3>Quyền Lợi:</h3>
            <ul>
              <li>GIẢM 3% TRÊN TỔNG HÓA ĐƠN</li>
              <li>Mua sản phẩm 0đ theo Combo</li>
            </ul>
          </div>
        );
      case "IRON":
        return (
          <div className="membership-info fade-in">
            <h3>Điều Kiện:</h3>
            <p>Chi tiêu trên 2.000.000đ</p>
            <h3>Quyền Lợi:</h3>
            <ul>
              <li>GIẢM 2% TRÊN TỔNG HÓA ĐƠN</li>
            </ul>
          </div>
        );
      case "CUSTOMER":
        return (
          <div className="membership-info fade-in">
            <h3>Điều Kiện:</h3>
            <p>Chưa chi tiêu đủ điều kiện nâng hạng.</p>
            <h3>Quyền Lợi:</h3>
            <ul>
              <li>Không có quyền lợi đặc biệt.</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PolicyLayout
      title="Chính Sách Thành Viên – Ưu Đãi Khách Hàng"
      hero={{
        image: "/src/assets/banner-page-title.png",
        centerTitle: "CHÍNH SÁCH THÀNH VIÊN",
        breadcrumbs: [
          { label: "Trang chủ", to: "/" },
          { label: "Chính Sách Thành Viên – Ưu Đãi Khách Hàng" },
        ],
      }}
      boxed={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <PolicySidebar toc={toc} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <section id="upgrade-membership">
            <h2 className="text-xl font-semibold text-green-primary">
              Mua Hàng & Nâng Cấp Thành Viên
            </h2>
            <p>
              Tạo tài khoản tại website <strong>gopinic.vn</strong> và cập nhật thông tin tại trang tài khoản. Với mỗi đơn hàng qua kênh trực tiếp (mua hàng trực tiếp tại cửa hàng, facebook, zalo, điện thoại ….) bạn sẽ được tích lũy số tiền để nâng hạng thành viên – Đối với những đơn qua kênh trung gian như Shopee, Lazada, Tiki, Tiktok, cộng tác viên sẽ không được Đi Outdoor tích lũy.
            </p>
            <p>
              Lưu ý: Đi Outdoor định danh khách hàng qua trường <strong>SỐ ĐIỆN THOẠI</strong> bạn cần cập nhật số điện thoại thật chính xác.
            </p>
          </section>

          <section id="membership-benefits">
            <h2 className="text-xl font-semibold text-green-primary">Quyền Lợi Thành Viên</h2>
            <p>Tại Đi Outdoor chúng tôi chia thành viên qua 4 vật liệu phổ biến trong hoạt động dã ngoại:</p>
            <div className="flex gap-4 mt-4">
              <div
                onClick={() => setSelectedMember("TITANIUM")}
                className={`membership-tier-logo flex flex-col items-center cursor-pointer ${selectedMember === "TITANIUM" ? "selected" : ""}`}
              >
                <img
                  src="/src/assets/payment-titanium.png"
                  alt="Titanium"
                  className="w-16 h-16"
                />
                <span>TITANIUM</span>
              </div>
              <div
                onClick={() => setSelectedMember("ALUMINUM")}
                className={`membership-tier-logo flex flex-col items-center cursor-pointer ${selectedMember === "ALUMINUM" ? "selected" : ""}`}
              >
                <img
                  src="/src/assets/payment-aluminum.png"
                  alt="Aluminum"
                  className="w-16 h-16"
                />
                <span>ALUMINUM</span>
              </div>
              <div
                onClick={() => setSelectedMember("STAINLESS")}
                className={`membership-tier-logo flex flex-col items-center cursor-pointer ${selectedMember === "STAINLESS" ? "selected" : ""}`}
              >
                <img
                  src="/src/assets/payment-stainless.png"
                  alt="Stainless"
                  className="w-16 h-16"
                />
                <span>STAINLESS</span>
              </div>
              <div
                onClick={() => setSelectedMember("IRON")}
                className={`membership-tier-logo flex flex-col items-center cursor-pointer ${selectedMember === "IRON" ? "selected" : ""}`}
              >
                <img
                  src="/src/assets/payment-iron.png"
                  alt="Iron"
                  className="w-16 h-16"
                />
                <span>IRON</span>
              </div>
              <div
                onClick={() => setSelectedMember("CUSTOMER")}
                className={`membership-tier-logo flex flex-col items-center cursor-pointer ${selectedMember === "CUSTOMER" ? "selected" : ""}`}
              >
                <img
                  src="/src/assets/payment-customer.png"
                  alt="Customer"
                  className="w-16 h-16"
                />
                <span>CUSTOMER</span>
              </div>
            </div>
            {renderMemberInfo()}
          </section>

          <section id="terms">
            <h2 className="text-xl font-semibold text-green-primary">Quy Định & Thông Tin</h2>
            <h3 className="font-semibold mt-4">Quy Định Nâng Hạng</h3>
            <ul className="list-disc pl-6">
              <li>Thành viên sẽ được nâng hạng khi đạt mức chi tiêu theo Quy định.</li>
              <li>Thành viên sẽ được giảm giá và nâng hạng ngay trong đơn hàng đạt đủ chi tiêu.</li>
            </ul>
            <h3 className="font-semibold mt-4">Quy Định Giảm Giá Cho Thành Viên</h3>
            <ul className="list-disc pl-6">
              <li>Hạng thành viên sẽ được áp dụng vĩnh viễn, không bị hủy, reset lại theo thời gian.</li>
              <li>Không áp dụng cho các sản phẩm giảm giá Countdown - Flash Sale.</li>
              <li>Quý khách đã có tài khoản thành viên nhưng thực hiện giao dịch qua kênh trung gian sẽ không được tích lũy vào hệ thống.</li>
            </ul>
            <h3 className="font-semibold mt-4">Quy Định Khác</h3>
            <ul className="list-disc pl-6">
              <li>Mỗi tài khoản chỉ được sở hữu bởi 1 người/1 số điện thoại.</li>
              <li>Đi Outdoor có quyền từ chối giảm giá hoặc đơn hàng khi phát hiện hình thức gian lận thương mại.</li>
              <li>Tài khoản sẽ được Reset về thành viên Customer khi bị phát hiện gian lận thương mại.</li>
            </ul>
          </section>

          <section id="faq">
            <h2 className="text-xl font-semibold text-green-primary">FAQ - CÂU HỎI THƯỜNG GẶP</h2>
            <div className="space-y-4">
              {[
                { question: "Người khác được sử dụng tài khoản của tôi không?", answer: "Khách hàng có thể cho người thân hoặc bạn bè mượn tài khoản để nhận được ưu đãi giảm giá. Điều này sẽ ảnh hưởng đến quá trình đặt hàng và giao hàng. Đi Outdoor khuyến khích không công khai tài khoản và chỉ chấp nhận các tài khoản không gian lận thương mại." },
                { question: "Thay đổi số điện thoại thành viên?", answer: "Khi khách hàng có nhu cầu thay đổi số điện thoại cho tài khoản, xin vui lòng yêu cầu 'cập nhật thông tin thành viên' tại trang tài khoản. Chúng tôi sẽ cập nhật số điện thoại của khách hàng trên toàn bộ hệ thống trong 7 ngày làm việc." },
                { question: "Thời gian cập nhật thứ hạng thành viên là bao lâu?", answer: "Chúng tôi sẽ cập nhật thứ hạng thành viên 15 ngày 1 lần. Nếu quý khách hàng có nhu cầu cập nhật ngay xin vui lòng yêu cầu 'cập nhật thông tin thành viên' tại trang tài khoản, yêu cầu của bạn sẽ được thực hiện không quá 48h." },
                { question: "Tại sao tài khoản của tôi chưa được nâng hạng?", answer: "Sau khi hoàn thành đơn hàng cuối cùng (đơn giao hàng: đã nhận hàng thành công) chúng tôi cần thời gian để bổ sung và cập nhật tài khoản sau 15 ngày." },
                { question: "Chính sách Xếp hạng thành viên như thế nào?", answer: "Chính sách xếp hạng thành viên của chúng tôi dựa trên số tiền đã chi tiêu cho hình thức mua hàng trực tiếp (*1) từ lúc tạo tài khoản." },
                { question: "Kiểm tra thứ hạng thành viên bằng cách nào?", answer: "Để kiểm tra bạn đang nằm ở thành viên nào xin vui lòng đăng nhập và truy cập tài khoản, Logo và thứ hạng thành viên sẽ hiển thị ngay đầu trang." },
                { question: "Vấn đề khác?", answer: "Vui lòng liên hệ hotline 0979.729.140 hoặc email hotro@dioutdoor.vn để được hỗ trợ." },
              ].map((item, index) => (
                <div key={index}>
                  <div
                    className={`faq-question cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 rounded-md ${activeFAQ === index ? "open" : ""}`}
                    onClick={() => handleFAQToggle(index)}
                  >
                    <span>{item.question}</span>
                    <span className="float-right">▼</span>
                  </div>
                  <div 
                    className={`faq-answer mt-2 px-4 py-2 bg-gray-50 border border-t-0 rounded-md ${activeFAQ === index ? "open" : ""}`}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PolicyLayout>
  );
};

export default MemberPolicyPage;