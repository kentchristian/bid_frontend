

export type SalesTransactionPayload = {
  sold_at: string | Date;
  created_by?: string; // ID
  created_by_name?: string;
  transaction_id: string;
  items: {
    inventory: string; // ID 
    category?: string;
    product_name: string; // Product Name not required in payload but Used in Transaction Receipt
    quantity: number;
    unit_price: number;
    total_price: number;
  }[]
}
