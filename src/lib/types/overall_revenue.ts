



export type RevenueByCategory = {
  inventory__category__name: string;
  overall_total: number;
  inventory__category__color?: string;
}

export type OverallRevenueType = {
  overall_revenue: number;
  revenues_by_category: RevenueByCategory[];
}