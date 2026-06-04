const longDateFormatter = new Intl.DateTimeFormat('en-PH', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export const formatLongDate = (value: unknown): string => {
  if (value === null || value === undefined) return '';

  const isoString = String(value);
  if (!isoString) return '';

  const [year, month, day] = isoString.split('T')[0].split('-').map(Number);
  if (year && month && day) {
    return longDateFormatter.format(new Date(year, month - 1, day));
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;

  return longDateFormatter.format(date);
};
