
export type InventoryByCategoryType = {
 total_items: number;
 inventory: {
  id: string;
  product_name: string;
  stock_quantity: number;
  max_quantity: number;
  reorder_threshold: number;
  unit_price: number
 }[]
}