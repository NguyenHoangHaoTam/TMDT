export const FREE_SHIPPING_THRESHOLD = 300_000;
export const EXPRESS_SURCHARGE = 200_000;
export const EXPRESS_SURCHARGE_THRESHOLD = 4_000_000;

export type VoucherConfig = {
  code: string;
  label: string;
  type: "percent" | "flat";
  value: number;
  minOrder?: number;
};

export const VOUCHERS: VoucherConfig[] = [
  { code: "giam1", label: "Giảm 5% cho đơn từ 300.000đ", type: "percent", value: 0.05, minOrder: 300_000 },
  { code: "giam2", label: "Giảm 7% cho đơn từ 500.000đ", type: "percent", value: 0.07, minOrder: 500_000 },
  { code: "giam3", label: "Giảm 10% cho đơn từ 1.000.000đ", type: "percent", value: 0.1, minOrder: 1_000_000 },
  { code: "giam4", label: "Giảm 50.000đ cho mọi đơn", type: "flat", value: 50_000 },
  { code: "giam5", label: "Giảm 120.000đ cho đơn từ 1.500.000đ", type: "flat", value: 120_000, minOrder: 1_500_000 },
];


