import { create } from 'zustand';


interface TransactionTickeState {
  open: boolean,
  onOpen: () => void;
  onClose: () => void;
}

export const useTransactionTicket = create<TransactionTickeState>()(
  (set) => ({
      open: false,
      onOpen: () => set({ open: true }),
      onClose: () => set({ open: false }),
    }),
  
);