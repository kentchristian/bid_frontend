import { getSalesFormOptions } from "../../api/inventory";
import type { SalesFormOptionsType } from "../types/sales-form-options-types";
import { useAuthQuery } from "./useAuthQuery";


export const useSalesFormOptions = () => {
  return useAuthQuery<SalesFormOptionsType>(
    'sales-form-options',
    getSalesFormOptions
  );
}