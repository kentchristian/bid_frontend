
export const getTwelveHourFormat = (isoString: string): string => {
  if (!isoString) return "";

  const date = new Date(isoString);
  const userLocale = typeof window !== 'undefined' ? window.navigator.language : 'en-US';


  return new Intl.DateTimeFormat(userLocale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}