export type ReportTotals = {
  salesRevenue: number;
  totalItems: number;
};

export type CategoryRevenue = {
  categoryName: string;
  tenantName: string;
  categoryColor: string;
  overallTotal: number;
};

export type TopSellingProduct = {
  inventoryId: string;
  productName: string;
  totalQuantity: number;
};

// The clean, camelCase interface used across your UI components
export type SalesPerformanceOverviewReport = {
  totals: ReportTotals;
  revenuesByCategory: CategoryRevenue[];
  fiveTopSellingProducts: TopSellingProduct[];
};

// Explicit definition matching the raw backend snake_case __ lookup payload exactly
export interface RawSalesPerformanceOverviewResponse {
  totals: {
    sales_revenue: number;
    total_items: number;
  };
  revenues_by_category: Array<{
    inventory__category__name: string;
    tenant__name: string;
    inventory__category__color: string;
    overall_total: number;
  }>;
  five_top_selling_products: Array<{
    inventory__id: string;
    inventory__product_name: string;
    total_quantity: number;
  }>;
}
