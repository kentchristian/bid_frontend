
export type inventory_top_category = {
  id: string;
  name: string;
}

export type top_inventory = {
  id: string;
  product_name: string;
  stock_quantity: number;
  max_quantity: number;
  unit_price: number;
  category?: inventory_top_category;
}


export type apiTodaysTopHitsType = {
  id: string;
  inventory?: top_inventory;
  quantity: number;
  unit_price: number;
  total_price: number;
  sold_at: string;
  rank: number;
  count_product_item: number;
}
export type TodaysTopHitsType = {
  todays_top_hits: apiTodaysTopHitsType[]
} 
export type TransformedTodaysTopHits = {
  id: string;
  rank: number;
  rankSymbol: React.JSX.Element;
  name: string;
  class: string;
  quantity: number;
  totalRevenue: number;
  unitPrice: number;
  updatedAt: string;
  maxQuantity: number;
};
