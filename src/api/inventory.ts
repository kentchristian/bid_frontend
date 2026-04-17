import type { SalesFormOptionsType } from "../lib/types/sales-form-options-types";
import type { InventoryMetrics } from "../lib/types/usequery-types";
import { baseApi } from "../services/axiosClient";


export const getInventoryMetrics = async (): Promise<InventoryMetrics> => {
  const { data } = await baseApi.get<InventoryMetrics>('/api/inventory/inventory_metrics/');
  
  return data;
}

// Dropdown Data from Sales Form Options
// Found and fetched from Inventory 0
export const getSalesFormOptions = async (): Promise<SalesFormOptionsType> => {
  const { data } =  await baseApi.get<SalesFormOptionsType>('/api/inventory/sales_form_options/');

  return data;

}