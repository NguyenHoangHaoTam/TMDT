import { Link, useLocation } from "react-router-dom";

type TocItem = { label: string; href: string }; 

export default function PolicySidebar({ toc }: { toc?: TocItem[] }) {
  const { pathname, hash } = useLocation();

  const support = [
    { label: "Hướng dẫn đặt hàng", to: "/support/order-guide" },
    { label: "Giao và nhận hàng", to: "/support/shipping" },
    { label: "Hình thức thanh toán", to: "/support/payment" },
  ];

  const policy = [
    { label: "Chính Sách Thành Viên – Ưu Đãi Khách Hàng", to: "/policy/member" },
    { label: "Chính Sách Bảo Hành", to: "/policy/warranty" },
    { label: "Chính Sách Bảo Mật", to: "/policy/privacy" },
    { label: "Chính sách đổi trả", to: "/policy/return" },
    { label: "Điều khoản và điều kiện", to: "/policy/terms" },
    { label: "Chính Sách Bảo Vệ Thông Tin Người Tiêu Dùng", to: "/policy/consumer" },
  ];

  const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <div className="bg-gray-100 font-semibold px-4 py-3 uppercase text-gray-700">{title}</div>
      <div>{children}</div>
    </div>
  );

  const Item = ({ label, to }: { label: string; to: string }) => (
    <Link to={to} className={`${pathname === to ? "is-active" : ""} hover:no-underline`}>
      {label}
    </Link>
  );

  const TocA = ({ label, href }: { label: string; href: string }) => (
    <a href={href} className={`${hash === href ? "is-active" : ""}`}>
      {label}
    </a>
  );

  return (
    <aside className="policy-sidebar sticky top-24 space-y-6 policy-sidebar">
      <Card title="Hỗ trợ khách hàng">
        <div className="space-y-1 px-3 py-2">
          {support.map((x) => (
            <Item key={x.label} label={x.label} to={x.to} />
          ))}
        </div>
      </Card>

      <Card title="Chính sách khách hàng">
        <div className="space-y-1 px-3 py-2">
          {policy.map((x) => (
            <Item key={x.label} label={x.label} to={x.to} />
          ))}
        </div>
      </Card>

      {toc && toc.length > 0 && (
        <Card title="Mục lục">
          <div className="space-y-1 px-3 py-2">
            {toc.map((t) => (
              <TocA key={t.href} href={t.href} label={t.label} />
            ))}
          </div>
        </Card>
      )}
    </aside>
  );
}
