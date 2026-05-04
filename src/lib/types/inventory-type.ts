
export type AddInventoryType = {
  product_name: string,
  stock_quantity: number,
  max_quantity: number,
  reorder_threshold: number,
  unit_price: number
  category: string;
}


export type StockAdjustmentProps = {
    id: string;
    product_name: string;
    unit_price: number;
    stock_quantity: number;
    max_quantity: number;
    reorder_threshold: number;
  };
