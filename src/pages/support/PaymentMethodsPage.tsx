import PolicyLayout from "@/pages/policy/PolicyLayout";
import PolicySidebar from "@/pages/policy/PolicySidebar";

import HERO_IMAGE from "@/assets/banner-page-title.png";
import vcbLogo from "@/assets/payment-vietcombank.png";
import scbLogo from "@/assets/payment-sacombank.png";
import cardsImg from "@/assets/payments.png"; 

export default function PaymentMethodsPage() {
  const toc = [
    { label: "Thanh toán COD", href: "#cod" },
    { label: "Chuyển khoản trong nước", href: "#bank-transfer" },
    { label: "Thanh toán trực tuyến", href: "#online" },
  ];

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">{children}</div>
  );

  const BankItem = ({
    bankName,
    accountName,
    accountNumber,
    branch,
    imgAlt,
    imgSrc,
  }: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    branch: string;
    imgAlt: string;
    imgSrc: string;
  }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200">
      <img src={imgSrc} alt={imgAlt} className="w-20 h-12 object-contain rounded bg-white" />
      <div>
        <p className="font-semibold">{bankName}</p>
        <p>
          Chủ tài khoản: <strong>{accountName}</strong>
        </p>
        <p>
          Số tài khoản: <strong>{accountNumber}</strong>
        </p>
        <p>Chi nhánh: {branch}</p>
      </div>
    </div>
  );

  return (
    <PolicyLayout
      title="Hình thức thanh toán"
      boxed={false}
      hero={{
        image: HERO_IMAGE,
        centerTitle: "HÌNH THỨC THANH TOÁN",
        breadcrumbs: [
          { label: "GOPICNIC", to: "/" },
          { label: "Hình thức thanh toán" },
        ],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <PolicySidebar toc={toc} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <section id="cod" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">THANH TOÁN COD</h2>
              <p>
                Thanh toán COD (thanh toán khi nhận hàng) là phương thức đơn giản và thuận tiện khi đặt
                hàng tại <strong>GOPICNIC</strong>.
              </p>
              <p>
                Nếu muốn thanh toán trước (mua giúp, tặng quà, …), bạn có thể chọn phương án{" "}
                <strong>Chuyển khoản trước</strong> vào tài khoản của GOPICNIC.
              </p>
              <p className="italic">
                Lưu ý: Chỉ chuyển khoản sau khi đã được nhân viên GOPICNIC gọi xác nhận đơn hàng, tránh
                trường hợp chuyển tiền khi hết hàng/hết size.
              </p>
            </section>
          </Card>

          <Card>
            <section id="bank-transfer" className="space-y-3 scroll-mt-28">
              <h2 className="text-xl font-semibold">THANH TOÁN CHUYỂN KHOẢN TRONG NƯỚC</h2>
              <p>
                Chuyển khoản vào các tài khoản bên dưới, sau đó chụp/scan chứng từ và gửi qua email{" "}
                <strong>support@gopicnic.vn</strong> hoặc fanpage của GOPICNIC.
              </p>

              <div className="p-3 rounded-md bg-yellow-50 text-yellow-800 text-sm space-y-1">
                <p>
                  • Ghi rõ <strong>nội dung chuyển khoản</strong> (VD: “Thanh toán đơn #1234 – SĐT…”)
                  để hệ thống tự động đối soát.
                </p>
                <p>• Chỉ chuyển vào tài khoản công bố trên website của GOPICNIC.</p>
              </div>

              <div className="space-y-4">
                <BankItem
                  bankName="Ngân hàng Ngoại thương Việt Nam – Vietcombank"
                  accountName="CÔNG TY TNHH GOPICNIC"
                  accountNumber="0123 4567 8901"
                  branch=" TP. Hồ Chí Minh"
                  imgAlt="Vietcombank"
                  imgSrc={vcbLogo}
                />

                <BankItem
                  bankName="Ngân hàng Sài Gòn Thương Tín – Sacombank"
                  accountName="CÔNG TY TNHH GOPICNIC"
                  accountNumber="0401 0728 3333"
                  branch=" Sông Hàn – Đà Nẵng"
                  imgAlt="Sacombank"
                  imgSrc={scbLogo}
                />
              </div>
            </section>
          </Card>

          <Card>
            <section id="online" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl font-semibold">THANH TOÁN TRỰC TUYẾN</h2>

              <div className="space-y-3">
                <h3 className="font-medium">1) ATM / Visa / MasterCard / JCB</h3>
                <p>
                  Thanh toán qua cổng trung gian (VD: VTC Pay). Hỗ trợ thẻ <strong>VISA, MasterCard, JCB</strong> và
                  thẻ <strong>ATM nội địa</strong> có kích hoạt online.
                </p>
                <img src={cardsImg} alt="Các loại thẻ được hỗ trợ" className="h-10 w-auto object-contain" />
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">2) Ví MoMo</h3>
                <p>
                  Chuyển qua ví <strong>MoMo</strong> số <strong>0909 000 111</strong> (demo). Ghi nội dung:
                  “Thanh toán đơn #MãĐơn – SĐT”.
                </p>
              </div>
            </section>
          </Card>
        </div>
      </div>
    </PolicyLayout>
  );
}
