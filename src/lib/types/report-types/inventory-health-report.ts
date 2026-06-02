export type LowStockAlert = {
  id: string;
  product_name: string;
  stock_quantity: number;
  reorder_threshold: number;
}

export type AlertsResponse = {
  alerts: {
    total_alerts: number;
    low_stock_alerts: LowStockAlert[];
  };
}