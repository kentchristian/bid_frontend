

export type statusQuery = 'pending' | 'error' | 'success';


export type TotalRevenue = {
  today_total: number;
  yesterday_total: number;
}

export type TotalItemsSold = {
  today_total_items: number
  yesterday_total_items: number
  items: string[]
}