import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInventoryByCategory, getSalesFormOptions } from "../../api/inventory";
import { createSalesTransaction, getTransactionHistory } from "../../api/sales";
import { useSnackbar } from "../providers/SnackbarProvider";
import { useTransactionTicket } from "../store/useTransactionTicket";
import type { InventoryByCategoryType } from "../types/inventory-by-category";
import type { SalesFormOptionsType } from "../types/sales-form-options-types";
import type { SalesTransactionPayload } from "../types/sales-transaction";
import type { TransactionHistory } from "../types/transaction-history";
import { getCookie } from "../utils/getCookie";
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
}
export const useCreateSale = ({ handleClearForm }: useCreateSaleProps) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const { onOpen } = useTransactionTicket();
  const csrftoken = getCookie('csrftoken');

  return useMutation({
    mutationFn: (payload: SalesTransactionPayload) => createSalesTransaction(payload),
    onSuccess: () => {
      const message = "Transaction Created Successfuly!";
      
      // handleCreateSalesClose(); // Close Form
      handleClearForm();
      showSnackbar(message, { variant: 'success' });
      
      onOpen() // Open Transaction Receipt On Success
      
    },
    onSettled: () => {
       const transactionHistoryQueryKey = [csrftoken, 'transaction-history'];
       queryClient.invalidateQueries({ queryKey: transactionHistoryQueryKey });
    }
  })

}

export const useTransactionHistory = () => {
  return useAuthQuery<TransactionHistory>(
    'transaction-history',
    getTransactionHistory
  );
}
