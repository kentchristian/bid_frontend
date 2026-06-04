export const formatCurrency = (value: number | string): string => {
  return `$${Math.round(Number(value)).toLocaleString()}`;
};