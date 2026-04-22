


export const dateMonthDayTimeFormatter = (date: string | Date) => {

  const formattedDate = new Date(date).toLocaleString('en-PH', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })

  return formattedDate;
}