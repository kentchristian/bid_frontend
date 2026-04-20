import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInventoryByCategory, getSalesFormOptions } from "../../api/inventory";
import { createSalesTransaction } from "../../api/sales";
import { useSnackbar } from "../providers/SnackbarProvider";
import type { InventoryByCategoryType } from "../types/inventory-by-category";
import type { SalesFormOptionsType } from "../types/sales-form-options-types";
import type { SalesTransactionPayload } from "../types/sales-transaction";
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


interface useCreateSaleProps {
  handleClearForm: () => void;
  handleCreateSalesClose: () => void;
}
export const useCreateSale = ({ handleClearForm, handleCreateSalesClose }: useCreateSaleProps) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (payload: SalesTransactionPayload) => createSalesTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TBD'] });
      const message = "Transaction Created Successfuly!";

      handleCreateSalesClose(); // Close Form
      handleClearForm();
      showSnackbar(message, { variant: 'success' });
    },
  })

}