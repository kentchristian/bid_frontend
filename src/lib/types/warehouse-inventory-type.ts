
export type wareHouseInventoryCategory = {
  id: string;
  name: string;
}

export type WareHouseInventoryType = {
  id: string;
  product_name: string;
  category?: wareHouseInventoryCategory;
  stock_quantity?: number
  max_quantity?: number;
  reorder_threshold: number;
  unit_price: number
}

export type TransformedWareHouseType = {
  id: string;
  productName: string;
  category: string;
  currentStock: number;
  maxQuantity: number;
  reorderThreshold: number;
  unitPrice: number;
  status: string; 
}




export type InventoryHealthItems = {
  healthy_stock_items: WareHouseInventoryType[],
  low_stock: WareHouseInventoryType[],
  empty_stock: WareHouseInventoryType[],
}




export type TransformedHealthItems = {
  healthy_stock_items: TransformedWareHouseType[],
  low_stock: TransformedWareHouseType[],
  empty_stock: TransformedWareHouseType[],
}