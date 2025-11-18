// Simplified pricing hook - no vouchers or shipping fees
export const useCheckoutPricing = (cartTotal: number) => {
  const grandTotal = cartTotal;

  return {
    grandTotal,
  };
};


