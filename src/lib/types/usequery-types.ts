

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

export type SalesTrend = {
  day: string;
  sales: number;
}

export type DashboardSalesMetrics = {
  total_revenue: TotalRevenue,
  total_items: TotalItemsSold,
  trend_sales: SalesTrend[]

}

export type ItemsBelowThreshold = {
  total: number;
  items: {
    product_name: string;
    item_threshold: number;
    stock: number;
  }[],

}


export type StockClassTotal = {
  name: string;
  value: number;
}

export type Inventoryhealth = {
  
  stocks_class_total: StockClassTotal[],
  item?: any // TODO: define the class later
}

export type InventoryMetrics = {
  items_below_threshold: ItemsBelowThreshold,
  inventory_health: Inventoryhealth,
}