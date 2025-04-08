export function formatCurrency(value: string | number, decimals = 2) {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num) || num < 0.0001) return "0";
  return num.toFixed(decimals);
}

export function shortenAddress(
  address: string | null,
  chars: number = 4
): string {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
}

export function calculatePercentage(value: number, percentage: number): number {
  return value * (percentage / 100);
}
