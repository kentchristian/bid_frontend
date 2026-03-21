

export type CreatedBy = {
  id: string;
  name: string;
  role?: string;
  is_active?: boolean
}

export type ItemInventory = {
  id: string;
  product_name: string;
}


// API 
export type MoneyInSalesType = {
  id: string; // unique sale identifier
  created_by: CreatedBy;
  inventory: ItemInventory;
  sold_at: string;
  quantity: number,
  total_price: number,
}

// Frontend Transformation
export type TransformedMoneyInSalesType = {
  id: string;
  time: string;
  created_by: string;
  product: string;
  quantity: number;
  total: number;
}


