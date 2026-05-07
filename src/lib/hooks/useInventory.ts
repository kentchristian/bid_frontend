import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewInventory, editProduct, inboundOutboundAdjustment } from "../../api/inventory";
import { useSnackbar } from "../providers/SnackbarProvider";
import type { AddInventoryType, ControlInventoryProps, EditProductType } from "../types/inventory-type";
import { getCookie } from "../utils/getCookie";



interface useInventoryProps {
  onClose: () => void;
}
export const useAddNewInventory = ({ onClose }: useInventoryProps) => {
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




export const useInboundOutboundAdjustment = ({ onClose }: useInventoryProps) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const csrftoken = getCookie('csrftoken');

  return useMutation({
    mutationFn: (payload: ControlInventoryProps) => inboundOutboundAdjustment(payload),
    onSuccess: () => {
      const message = "Inventory Updated!";
      
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




export const useEditProduct = ({ onClose }: useInventoryProps) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const csrftoken = getCookie('csrftoken');

  return useMutation({
    mutationFn: (payload: EditProductType) => editProduct(payload),
    onSuccess: () => {
      const message = "Inventory Updated!";
      
      showSnackbar(message, { variant: 'success' });
      onClose(); // close after 
 
    },
    onSettled: () => {
       const subKeys = ['inventory-metrics', 'sales-form-options']
        
        subKeys.forEach((key) => {
           queryClient.invalidateQueries({ queryKey: [csrftoken, key] });
        })

      
      
    }
  })

}
