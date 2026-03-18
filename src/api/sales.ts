import type { DashboardSalesMetrics } from "../lib/types/usequery-types";
import { baseApi } from "../services/axiosClient";



export const getSalesDashboardMetrics = async (): Promise<DashboardSalesMetrics> => {
  const { data } = await baseApi.get<DashboardSalesMetrics>('/api/sales/dashboard_metrics/');

  return data;
}
