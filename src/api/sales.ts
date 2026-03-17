import type { TotalItemsSold, TotalRevenue } from "../lib/types/usequery-types";
import { baseApi } from "../services/axiosClient";



export const getTotalRevenue = async (): Promise<TotalRevenue> => {
  const { data } = await baseApi.get<TotalRevenue>('/api/sales/total_revenue/');

  return data;
}

export const getTotalItemsSold = async (): Promise<TotalItemsSold> => {
  const { data } = await baseApi.get<TotalItemsSold>('/api/sales/total_items/');
  
  return data;
}