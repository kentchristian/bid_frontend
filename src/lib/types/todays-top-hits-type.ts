
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

 "id": "42018a01-02c5-46cd-be1f-f8ed6eddb55a",
            "tenant": {
                "id": "7b840989-4ce0-4b4e-b9a5-07c9ae7ca5d4",
                "name": "Business Intelligence Management"
            },
            "product_name": "Summit Cold Brew Original 250ml BEV-01-0001",
            "category": {
                "id": "51f70d12-84a7-4157-9129-d27c0fdbac3c",
                "name": "Beverages"
            },
            "stock_quantity": 240,
            "max_quantity": 261,
            "reorder_threshold": 31,
            "updated_at": "2026-04-08T01:42:10.607187Z",
            "unit_price": "2.75"
