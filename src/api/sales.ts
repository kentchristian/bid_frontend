import type { SalesTransactionPayload } from "../lib/types/sales-transaction";
import type { TodaysTopHitsType } from "../lib/types/todays-top-hits-type";
import type { TransactionHistory } from "../lib/types/transaction-history";
import type { DashboardSalesMetrics } from "../lib/types/usequery-types";
import { baseApi } from "../services/axiosClient";
import { getCsrfToken } from "./auth";



export const getSalesDashboardMetrics = async (): Promise<DashboardSalesMetrics> => {
  const { data } = await baseApi.get<DashboardSalesMetrics>('/api/sales/dashboard_metrics/');

  return data;
}

export const getTodaysTopHits = async (): Promise<TodaysTopHitsType> => {
  const { data } = await baseApi.get<TodaysTopHitsType>('/api/sales/todays_top_hits/')

  return data;
}


export const createSalesTransaction = async (payload: SalesTransactionPayload): Promise<SalesTransactionPayload> => {
  const token = await getCsrfToken();

  const response = await baseApi.post('/api/sales/sales_transaction/', payload, {
    headers: {
      'X-CSRFToken': token,
    }
  });

  console.log("CREATE SALES: ", response)
  return response?.data;
}

export const getTransactionHistory = async (): Promise<TransactionHistory> => {
  const { data } = await baseApi.get<TransactionHistory>('/api/sales/transaction_history/');

  return data;
}