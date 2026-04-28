import type { CategoryType } from "../lib/types/category-type";
import { baseApi } from "../services/axiosClient";
import { getCsrfToken } from "./auth";

export const createCategory = async (payload: CategoryType)  => {
  const token = await getCsrfToken();

  const { data } = await baseApi.post<CategoryType>(`/api/category/`, payload, {
    headers: {
      'X-CSRFToken': token,
    }
  });
  
  return data;
}