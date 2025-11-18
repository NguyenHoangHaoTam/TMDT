import { useEffect, useRef, useState } from "react";
import PolicyLayout from "@/pages/policy/PolicyLayout";
import { ChevronDown } from "lucide-react";

function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            io.unobserve(el);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

function ZigZag({
  image,
  title,
  subtitle,
  body,
  dir = "left",
}: {
  image: string;
  title: string;
  subtitle?: string;
  body: React.ReactNode;
  dir?: "left" | "right";
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${dir === "left" ? "reveal-left" : "reveal-right"} grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}
    >
      {dir === "left" ? (
        <>
          <img src={image} alt={title} className="w-full rounded-xl shadow-sm object-cover" />
          <div className="space-y-4">
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
            <h3 className="text-3xl font-extrabold text-green-primary">{title}</h3>
            <div className="leading-relaxed text-[17px]">{body}</div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4 order-2 lg:order-1">
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
            <h3 className="text-3xl font-extrabold text-green-primary">{title}</h3>
            <div className="leading-relaxed text-[17px]">{body}</div>
          </div>
          <img
            src={image}
            alt={title}
            className="order-1 lg:order-2 w-full rounded-xl shadow-sm object-cover"
          />
        </>
      )}
    </div>
  );
}

function AccItem({
  label,
  children,
  open,
  onToggle,
}: {
  label: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
      >
        <span className="font-medium">{label}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 text-[15px] text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <PolicyLayout
      title="Giới thiệu GOPICNIC"
      boxed={false}
      hero={{
        image: "/src/assets/banner-page-title.png",
        centerTitle: "GIỚI THIỆU GOPICNIC",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Giới thiệu" },
        ],
      }}
    >
      <div className="space-y-16">
        <ZigZag
          dir="left"
          image="/src/assets/about-1.jpg" 
          subtitle="Chào mừng bạn đến với GOPICNIC"
          title="01. Chúng tôi là ai?"
          body={
            <>
              <p>
                Khởi nguồn từ đam mê khám phá thiên nhiên và trải nghiệm những cung bậc cảm xúc trong
                từng chuyến hành trình, <strong>GOPICNIC</strong> được thành lập bởi những người trẻ
                từ khắp nơi với mong muốn mang đến trang thiết bị du lịch & dã ngoại chất lượng, giá
                hợp lý cho cộng đồng.
              </p>
              <p>
                Với kinh nghiệm thực chiến nhiều năm, chúng tôi tư vấn <em>đúng nhu cầu – đúng ngân
                sách – đúng mục đích</em>. Danh mục sản phẩm đa dạng, hướng tới nhiều phân khúc và
                bối cảnh sử dụng: trekking, hiking, cắm trại gia đình, dã ngoại cuối tuần…
              </p>
            </>
          }
        />
        <ZigZag
          dir="right"
          image="/src/assets/about-2.jpg" 
          subtitle="Tầm nhìn & định hướng"
          title="02. Tầm nhìn chung"
          body={
            <>
              <p>
                Chúng tôi muốn trở thành địa chỉ tin cậy của cộng đồng yêu dã ngoại tại Việt Nam.
                <strong> GOPICNIC</strong> không chỉ bán sản phẩm, mà còn là người bạn đồng hành
                đáng tin trên mọi cung đường.
              </p>
              <p>
                Hiện tại, <strong>GOPICNIC</strong> đặt showroom tại{" "}
                <strong>72 Tô Ký, Quận 12, TP. Hồ Chí Minh</strong> – và đang tiếp tục mở rộng để
                phục vụ khách hàng toàn quốc.
              </p>
            </>
          }
        />

        <ZigZag
          dir="left"
          image="/src/assets/about-3.jpg" 
          subtitle="Giá trị cốt lõi"
          title="03. Sản phẩm & dịch vụ"
          body={
            <>
              <p>
                Từ đồ cắm trại, lều – túi ngủ – balo – giày, cho tới đèn, bếp, bàn ghế xếp gọn…
                mỗi sản phẩm được <strong>GOPICNIC</strong> lựa chọn kỹ lưỡng: chất liệu bền bỉ,
                tiêu chuẩn an toàn, sử dụng thực tế hiệu quả.
              </p>
              <p>
                Ngoài bán lẻ, chúng tôi hỗ trợ doanh nghiệp – trường học – CLB – team building với
                chính sách chiết khấu tốt, giao hàng linh hoạt và bảo hành rõ ràng.
              </p>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <h4 className="text-2xl font-bold text-green-primary mb-2">Lịch sử của GOPICNIC</h4>
              <p className="text-gray-700">
                Từ một cửa hàng nhỏ tại <strong>72 Tô Ký, Quận 12, TP.HCM</strong>, chúng tôi phát
                triển trở thành điểm hẹn của người yêu dã ngoại, đồng thời hợp tác phân phối cho
                nhiều đối tác trên khắp cả nước.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <h4 className="text-2xl font-bold text-green-primary mb-2">Chúng tôi là gì?</h4>
              <p className="text-gray-700">
                <strong>GOPICNIC</strong> là nhà bán lẻ & nhà cung cấp giải pháp dã ngoại toàn diện:
                sản phẩm tin cậy, tư vấn thực tế, bảo hành minh bạch và dịch vụ sau bán tận tâm.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <h4 className="text-2xl font-bold text-green-primary mb-2">Tầm nhìn chung</h4>
              <p className="text-gray-700">
                Trở thành thương hiệu gợi nhớ đầu tiên khi ai đó nghĩ tới việc đi picnic, cắm trại
                hay trekking. Luôn tiên phong chia sẻ kiến thức để cộng đồng chơi an toàn & văn minh.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <h4 className="text-2xl font-bold text-green-primary mb-2">Hợp tác với chúng tôi!</h4>
              <p className="text-gray-700">
                Chúng tôi có chính sách <em>chiết khấu & đồng thương hiệu</em> cho đại lý và dự án
                số lượng lớn. Liên hệ: <strong>0122335566</strong> hoặc email{" "}
                <strong>support@gopicnic.vn</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                label: "Liên hệ hỗ trợ",
                content: (
                  <>
                    Hotline: <strong>0122335566</strong>
                    <br />
                    Email: <strong>support@gopicnic.vn</strong>
                    <br />
                    Địa chỉ: <strong>72 Tô Ký, Quận 12, TP.HCM</strong>
                  </>
                ),
              },
              {
                label: "Chất lượng tốt nhất",
                content:
                  "Sản phẩm tuyển chọn kỹ, bảo hành rõ ràng, đổi trả dễ dàng theo chính sách hiện hành của GOPICNIC.",
              },
              {
                label: "Giao hàng nhanh nhất",
                content:
                  "Hỗ trợ giao nhanh nội thành & chuyển phát toàn quốc, COD hoặc thanh toán trước linh hoạt.",
              },
              {
                label: "Chăm sóc khách hàng",
                content:
                  "Đội ngũ tư vấn có trải nghiệm sử dụng thực tế – luôn sẵn sàng hỗ trợ setup & bảo quản đồ camping.",
              },
              {
                label: "Khách hàng hài lòng",
                content:
                  "Chúng tôi theo đuổi tỷ lệ hài lòng cao bằng sản phẩm bền bỉ + dịch vụ nhanh – gọn – đúng hẹn.",
              },
            ].map((it, i) => (
              <AccItem
                key={it.label}
                label={it.label}
                open={openIdx === i}
                onToggle={() => setOpenIdx((prev) => (prev === i ? null : i))}
              >
                {it.content}
              </AccItem>
            ))}
          </div>
        </div>
      </div>
    </PolicyLayout>
  );
}
