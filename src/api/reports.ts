import type { AlertsResponse, RawSalesPerformanceOverviewResponse } from "../lib/types/report-types";
import { baseApi } from "../services/axiosClient";



export const getSalesPerformanceOverview = async (): Promise<RawSalesPerformanceOverviewResponse> => {
  const { data } = await baseApi.get<RawSalesPerformanceOverviewResponse>('/api/sales_report/sales_performance_overview/');

  return data;
}


export const getInventoryHealthReport = async (): Promise<AlertsResponse> => {
  const { data } = await baseApi.get<AlertsResponse>('/api/inventory_report/inventory_health_report/');

  return data;
}