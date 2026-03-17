

type TrendRateType = (
  presentValue: number,
  oldValue: number,
) => number


/* Rate Solution
 dif = num1 - num2 
 quo = dif / 2
 rate = quo x 100
**/
export const getTrendRate: TrendRateType = (presentValue, oldValue) => {
  if (presentValue === 0) return 0;

  const dif = presentValue - oldValue;
  const quo = dif / oldValue;
  const rate = quo * 100;
  const rounded_rate = Math.round(rate * 100) / 100;

  if (presentValue > oldValue) return rounded_rate;
  else return rounded_rate * -1; // remove the negatives 
}