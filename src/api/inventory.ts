import type { ItemsBelowThreshold } from "../lib/types/usequery-types";
import { baseApi } from "../services/axiosClient";


export const getItemsBelowThreshold = async (): Promise<ItemsBelowThreshold> => {
  const { data } = await baseApi.get<ItemsBelowThreshold>('/api/inventory/items_below_threshold/');
  
  return data;
}