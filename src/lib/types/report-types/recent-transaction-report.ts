export type Transaction = {
  transaction_id: string;
  sold_at: string;     // ISO 8601 Date string
  employee: string;
  items: number;
  total_price: number;
};

// If you are storing this in an array for your Data Grid state:
export type RecentTransactionsResponse = Transaction[];