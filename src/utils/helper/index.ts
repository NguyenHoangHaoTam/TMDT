export function formatMoney(value: number | string): string {
  const numeric = value.toString().replace(/[^0-9]/g, "");
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
