import type { InventoryMetrics } from "../lib/types/usequery-types";
import { baseApi } from "../services/axiosClient";


export const getInventoryMetrics = async (): Promise<InventoryMetrics> => {
  const { data } = await baseApi.get<InventoryMetrics>('/api/inventory/inventory_metrics/');
  
  return data;
}
