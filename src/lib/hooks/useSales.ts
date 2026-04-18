import { getInventoryByCategory, getSalesFormOptions } from "../../api/inventory";
import type { InventoryByCategoryType } from "../types/inventory-by-category";
import type { SalesFormOptionsType } from "../types/sales-form-options-types";
import { useAuthQuery } from "./useAuthQuery";


export const useSalesFormOptions = () => {
  return useAuthQuery<SalesFormOptionsType>(
    'sales-form-options',
    getSalesFormOptions
  );
}

export const useInventoryByCategory = (category: string) => {
   return useAuthQuery<InventoryByCategoryType>(
    ['inventory-by-category', category],
    () => getInventoryByCategory(category),
    {
      enabled: Boolean(category)
    }
  );
}