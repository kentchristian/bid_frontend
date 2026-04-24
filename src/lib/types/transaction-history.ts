

export type Sales = {
  id: string;
  inventory: {
    id: string;
    product_name: string;
    category: {
      id: string;
      name: string;
    },
    stock_quantity: number;
    max_quantity: number;
    reorder_threshold: number;
    unit_price: number;  
  },
  quantity: number;
  total_price: number;
  created_by: {
    id: string;
    name: string;
    role: string;
  }
}

export type Transactions = {
  id?: string; // used in Data Grid -- same value as transaction_id
  transaction_id: string;
  created_by: string;
  tenant: string;
  sold_at: string;
  overall_transaction_amount: number;
  items_in_transaction: number;
  items: Sales[]
}


export type TransactionHistory = {
  total_transactions: number;
  total_revenue: number;
  units_sold: number;
  transactions: Transactions[];
}



export type handleShowTransactionType = {
          sold_at: string;
          transaction_id: string;
          items: Sales;
        };