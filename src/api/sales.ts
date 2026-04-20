import type { SalesTransactionPayload } from "../lib/types/sales-transaction";
import type { TodaysTopHitsType } from "../lib/types/todays-top-hits-type";
import type { DashboardSalesMetrics } from "../lib/types/usequery-types";
import { baseApi } from "../services/axiosClient";



export const getSalesDashboardMetrics = async (): Promise<DashboardSalesMetrics> => {
  const { data } = await baseApi.get<DashboardSalesMetrics>('/api/sales/dashboard_metrics/');

  return data;
}

export const getTodaysTopHits = async (): Promise<TodaysTopHitsType> => {
  const { data } = await baseApi.get<TodaysTopHitsType>('/api/sales/todays_top_hits/')

  return data;
}


export const createSalesTransaction = async (payload: SalesTransactionPayload): Promise<SalesTransactionPayload> => {
  const response = await baseApi.post('/api/sales/sales_transaction/', payload);

  console.log("CREATE SALES: ", response)
  return response?.data;
}