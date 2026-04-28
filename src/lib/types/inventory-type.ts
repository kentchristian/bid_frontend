
export type AddInventoryType = {
  product_name: string,
  stock_quantity: number,
  max_quantity: number,
  reorder_threshold: number,
  unit_price: number
  category: string;
}