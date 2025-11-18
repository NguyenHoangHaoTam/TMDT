export type ShippingMethod = "fast" | "express";

export type CheckoutPreferences = {
  shippingMethod: ShippingMethod;
  voucherCode: string | null;
};

const STORAGE_KEY = "checkoutPreferences";
const defaultPreferences: CheckoutPreferences = {
  shippingMethod: "fast",
  voucherCode: null,
};

export const loadCheckoutPreferences = (): CheckoutPreferences => {
  if (typeof window === "undefined") {
    return defaultPreferences;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPreferences;

    const parsed = JSON.parse(raw);
    return {
      shippingMethod: parsed.shippingMethod === "express" ? "express" : "fast",
      voucherCode: typeof parsed.voucherCode === "string" ? parsed.voucherCode : null,
    };
  } catch {
    return defaultPreferences;
  }
};

export const saveCheckoutPreferences = (prefs: CheckoutPreferences) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
};


