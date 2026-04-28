import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewInventory } from "../../api/inventory";
import { useSnackbar } from "../providers/SnackbarProvider";
import type { AddInventoryType } from "../types/inventory-type";
import { getCookie } from "../utils/getCookie";



interface useAddNewInventoryProps {
  onClose: () => void;
}
export const useAddNewInventory = ({ onClose }: useAddNewInventoryProps) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const csrftoken = getCookie('csrftoken');

  return useMutation({
    mutationFn: (payload: AddInventoryType) => addNewInventory(payload),
    onSuccess: () => {
      const message = "New Inventory Added!";
      
      showSnackbar(message, { variant: 'success' });
      
 
    },
    onSettled: () => {
       const subKeys = ['inventory-metrics', 'sales-form-options']
        
        subKeys.forEach((key) => {
           queryClient.invalidateQueries({ queryKey: [csrftoken, key] });
        })

      onClose(); // close after settled
      
    }
  })

}