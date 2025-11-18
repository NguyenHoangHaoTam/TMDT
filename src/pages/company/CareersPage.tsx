import PolicyLayout from "@/pages/policy/PolicyLayout";
import { CalendarDays, DollarSign, Mail, MapPin, Phone } from "lucide-react";

const COMPANY = {
  name: "GOPICNIC",
  hotline: "0122 335 566",
  email: "support@gopicnic.vn",
  address: "72 Tô Ký, Quận 12, TP.HCM",
};

export default function CareersPage() {
  return (
    <PolicyLayout
      title="Tuyển dụng"
      boxed={false}
      hero={{
        image: "/src/assets/banner-page-title.png",
        centerTitle: "TUYỂN DỤNG",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Tuyển dụng" },
        ],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3 space-y-6 policy-content">
          <section className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
            <header className="space-y-2">
              <h2 className="text-2xl font-extrabold text-green-primary">
                TUYỂN DỤNG QUẢN LÝ CỬA HÀNG
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  Thời gian nhận hồ sơ: <strong>18/09/2018</strong>
                </span>
                <span className="inline-flex items-center gap-2">
                  <DollarSign size={16} />
                  Thu nhập: <strong>7 – 10 triệu / tháng</strong>
                </span>
              </div>
            </header>

            <section>
              <h3 className="text-xl font-semibold text-green-primary">Yêu cầu</h3>
              <ul className="list-disc pl-5 leading-relaxed space-y-1">
                <li>Có tối thiểu 1 năm kinh nghiệm quản lý (ưu tiên ngành bán lẻ/thời trang).</li>
                <li>Thời gian làm linh hoạt, có thể thay ca và bắt buộc xoay ca.</li>
                <li>
                  Ca sáng: <strong>08:00 – 15:30</strong> &nbsp;|&nbsp; Ca chiều:{" "}
                  <strong>15:00 – 22:30</strong>
                </li>
                <li>Thành thạo tin học văn phòng.</li>
                <li>Có khả năng tổ chức, sắp xếp công việc và phối hợp đội nhóm.</li>
                <li>Duy trì tinh thần làm việc tích cực trong công ty.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-green-primary">Mô tả công việc</h3>

              <div>
                <h4 className="font-medium">1) Bán hàng & dịch vụ khách hàng</h4>
                <ul className="list-disc pl-5 leading-relaxed space-y-1">
                  <li>Chịu trách nhiệm phát triển doanh số của cửa hàng.</li>
                  <li>Kiểm soát chi phí – lợi nhuận; đảm bảo chỉ tiêu.</li>
                  <li>Thu thập & phản hồi ý kiến khách hàng.</li>
                  <li>Lên kế hoạch và định hướng kinh doanh cửa hàng.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">2) Điều hành cửa hàng</h4>
                <ul className="list-disc pl-5 leading-relaxed space-y-1">
                  <li>Quản lý nhân sự & chấm công – lương.</li>
                  <li>Đào tạo, giám sát, phân công công việc cho nhân viên.</li>
                  <li>Phòng chống thất thoát, chịu trách nhiệm đền bù theo quy định (nếu có).</li>
                  <li>Là cầu nối giữa nhân viên cửa hàng và công ty.</li>
                  <li>Đề xuất giải pháp cải tiến & mở rộng hệ thống.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">3) Phát triển nhân sự</h4>
                <ul className="list-disc pl-5 leading-relaxed space-y-1">
                  <li>Đào tạo – huấn luyện – đánh giá hiệu quả định kỳ.</li>
                  <li>Duy trì môi trường làm việc năng động & văn hóa của {COMPANY.name}.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium">4) Kiến thức sản phẩm</h4>
                <ul className="list-disc pl-5 leading-relaxed space-y-1">
                  <li>Nắm rõ: chất liệu, nguồn gốc, công dụng, cách sử dụng…</li>
                  <li>Có kiến thức cơ bản về trưng bày và an toàn kho bãi.</li>
                </ul>
              </div>
            </section>

            <section className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h3 className="text-lg font-semibold text-green-primary mb-2">
                Nộp hồ sơ / Liên hệ
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-[15px]">
                <p className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-green-primary" />
                  Địa chỉ: <strong>{COMPANY.address}</strong>
                </p>
                <p className="inline-flex items-center gap-2">
                  <Phone size={16} className="text-green-primary" />
                  Điện thoại:{" "}
                  <a href={`tel:${COMPANY.hotline.replace(/\s/g, "")}`} className="font-medium hover:underline">
                    {COMPANY.hotline}
                  </a>
                </p>
                <p className="inline-flex items-center gap-2 sm:col-span-2">
                  <Mail size={16} className="text-green-primary" />
                  Email:{" "}
                  <a href={`mailto:${COMPANY.email}`} className="font-medium hover:underline">
                    {COMPANY.email}
                  </a>
                </p>
              </div>
            </section>       
          </section>
        </div>

        <aside className="md:col-span-1 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Thông tin nhanh
            </h4>
            <ul className="mt-2 text-[15px] space-y-1">
              <li><strong>Vị trí:</strong> Quản lý cửa hàng</li>
              <li><strong>Thu nhập:</strong> 7 – 10 triệu / tháng</li>
              <li><strong>Hình thức:</strong> Full-time, xoay ca</li>
              <li><strong>Địa điểm:</strong> {COMPANY.address}</li>
            </ul>
          </div>
        </aside>
      </div>
    </PolicyLayout>
  );
}
