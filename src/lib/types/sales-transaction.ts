

export type SalesTransactionPayload = {
  sold_at: string | Date;
  created_by?: string;
  items: {
    inventory: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[]
}