
type UnitType = 'PHP' | 'USD' | 'EUR' | 'JPY' | 'GBP';

export function formatUnit(amount: number, unit: UnitType, locale = 'en-PH'): string {
  if (!unit) return `${amount.toLocaleString()}`

  const currencyMap: Record<string, string> = {
    PHP: '₱',
    USD: '$',
    EUR: '€',
    JPY: '¥',
    GBP: '£',
    // add more as needed
  }

  const upperUnit = unit;

  if (currencyMap[upperUnit]) {
    return `${currencyMap[upperUnit]}\u00A0${amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return `${amount.toLocaleString(locale)} ${unit}`
}