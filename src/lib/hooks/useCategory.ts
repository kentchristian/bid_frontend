import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../api/category";
import { useSnackbar } from "../providers/SnackbarProvider";
import type { CategoryType } from "../types/category-type";
import { getCookie } from "../utils/getCookie";



interface useCreateCategoryProps {
  handleClose: () => void;
}
export const useCreateCategory = ({ handleClose }: useCreateCategoryProps) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const csrftoken = getCookie('csrftoken');

  return useMutation({
    mutationFn: (payload: CategoryType) => createCategory(payload),
    onSuccess: () => {
      const message = "New Category Added!";
      
      showSnackbar(message, { variant: 'success' });
      
 
    },
    onSettled: () => {
       const subKeys = ['inventory-metrics', 'sales-form-options']
        
        subKeys.forEach((key) => {
           queryClient.invalidateQueries({ queryKey: [csrftoken, key] });
        })

      handleClose(); // close after settled
      
    }
  })

}