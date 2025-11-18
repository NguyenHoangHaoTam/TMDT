import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import dmcaBadge from "@/assets/mca-badge.png";
import thongBaoBadge from "@/assets/bo-cong-thuong.png";
import visa from "@/assets/payments.png";

const Footer = () => {
  const col1 = [
    { label: "Giới Thiệu", to: "/about" },
    { label: "Liên hệ", to: "/contact" },
    { label: "Tuyển Dụng", to: "/careers" },
    { label: "Điều khoản và điều kiện", to: "/policy/terms" },
    { label: "Chính Sách Bảo Mật", to: "/policy/privacy" },
    {
      label: "Chính Sách Thành Viên – Ưu Đãi Khách Hàng",
      to: "/policy/member",
    },
  ];

  const col2 = [
    { label: "Hướng dẫn đặt hàng", to: "/support/order-guide" },
    { label: "Hình thức thanh toán", to: "/support/payment" },
    { label: "Chính sách đổi trả", to: "/policy/return" },
    { label: "Giao và nhận hàng", to: "/support/shipping" },
    { label: "Chính Sách Bảo Hành", to: "/policy/warranty" },
    {
      label: "Chính sách bảo vệ thông tin người tiêu dùng",
      to: "/policy/consumer",
    },
  ];

  const col3 = [
    { label: "Thông Tin Tài khoản", to: "/account" },
    { label: "Theo dõi đơn hàng", to: "/" },
  ];

  return (
    <footer className="bg-green-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
          <div className="text-center md:text-left md:col-span-1">
            <img src={logo} alt="Logo công ty" className="h-16 w-40 mx-auto md:mx-0" />
            <p className="mt-4 text-white/90 leading-relaxed">
              GOPICNIC nhà cung cấp trang thiết bị cho hoạt động Dã ngoại – Cắm trại –
              Đi phượt và thể thao ngoài trời
            </p>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wide mb-4">
              Thông Tin Chung
            </h3>
            <ul className="space-y-3">
              {col1.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wide mb-4">
              Hỗ Trợ Khách Hàng
            </h3>
            <ul className="space-y-3">
              {col2.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wide mb-4">
              Dịch Vụ Khách Hàng
            </h3>
            <ul className="space-y-3">
              {col3.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 justify-start md:justify-end">
              <img src={dmcaBadge} alt="DMCA Protected" className="h-16 w-16 object-contain" />
              <img
                src={thongBaoBadge}
                alt="Đã thông báo Bộ Công Thương"
                className="h-16 w-20 object-contain"
              />
            </div>

            <div className="mt-6">
              <h4 className="font-semibold uppercase">Công Ty TNHH GOPICNIC</h4>
              <p className="mt-2 text-white/90">
                GPKD Số 0412356543 Do Sở KH &amp; Đầu Tư TP.HCM Cấp
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 md:justify-end">
              <img src={visa} alt="Payment via Visa" className="h-6 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
