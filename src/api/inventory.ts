import type { InventoryByCategoryType } from "../lib/types/inventory-by-category";
import type { AddInventoryType } from "../lib/types/inventory-type";
import type { SalesFormOptionsType } from "../lib/types/sales-form-options-types";
import type { InventoryMetrics } from "../lib/types/usequery-types";
import { baseApi } from "../services/axiosClient";
import { getCsrfToken } from "./auth";


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

export const getInventoryByCategory = async (category: string): Promise<InventoryByCategoryType> => {
  const { data } = await baseApi.get<InventoryByCategoryType>(`/api/inventory/inventory_by_category/?category=${category}`)
  return data;
}


export const addNewInventory = async (payload: AddInventoryType) => {
  const token = await getCsrfToken();
  
  const { data } = await baseApi.post<AddInventoryType>(`/api/inventory/`, payload, {
    headers: {
      'X-CSRFToken': token,
    }
  });

  return data;
}