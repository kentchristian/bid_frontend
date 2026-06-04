export type DailyTransactionMetric = {
  day: string; // 
  daily_revenue: number;
  transaction_volume: number;
};

//  Type definition for the overall array dataset
export type MonthlySalesTrendResponse = DailyTransactionMetric[];

export interface MonthlySalesTrendApiParameters {
  year: number,
  month: number,
}