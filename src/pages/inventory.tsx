import { Button } from '@mui/material';
import InventoryByCategory from '../components/charts/InventoryByCategory';
import PageContainer from '../components/common/PageContainer';

import InventoryKPICount from '../components/common/InventoryKPICount';
import { Typography } from '../components/common/Typography';
import HeaderContent from '../components/nav/HeaderContent';
import WareHouseInventory from '../components/tables/WareHoustInventory';
import { icons } from '../lib/constants/icons';
import { currency } from '../lib/utils/currency';

import { useMemo } from 'react';

import { useInventoryMetrics } from '../lib/hooks/useMetrics';
import type {
  InventoryHealthItems,
  TransformedHealthItems,
  TransformedWareHouseType,
  WareHouseInventoryType,
} from '../lib/types/warehouse-inventory-type';

const Inventory = () => {
  const handleAddInventory = () => {};

  const {
    data: inventoryMetrics,
    isLoading: inventoryMetricsLoading,
    status: inventoryMetricsStatus,
  } = useInventoryMetrics();

  const inventoryKPIData = [
    {
      title: 'Stock Valuation',
      details: `The total market value of the stock if sold at current unit prices. 
            Excluding tax and discounts.`,
      data: currency.format(
        inventoryMetrics?.stock_valuation?.total_inventory_revenue ?? 0,
      ),
      caption: 'Quantity * Unit Price',
    },
    {
      title: 'Total Units',
      details: `The total number of physical units currently recorded in
               inventory across all categories.`,
      data: inventoryMetrics?.stock_valuation?.total_inventory_items ?? 0,
      caption: '',
    },
  ];

  const inventoryWareHouse = useMemo(() => {
    // Explicitly casting or typing the sourceData
    const sourceData: InventoryHealthItems | undefined =
      inventoryMetrics?.inventory_health?.items;

    if (!sourceData) {
      return {
        healthy_stock_items: [],
        low_stock: [],
        empty_stock: [],
      };
    }

    // Now 'inventory' is strictly typed as an array of WareHouseInventoryType
    const transformFunction = (
      inventory: WareHouseInventoryType[],
      status: 'Healthy' | 'Low' | 'Empty', // Literal types for better safety
    ): TransformedWareHouseType[] => {
      return inventory.map((item: WareHouseInventoryType) => ({
        id: item?.id,
        productName: item?.product_name ?? 'Unknown',
        category: item?.category?.name ?? 'Uncategorized',
        currentStock: item?.stock_quantity ?? 0,
        maxQuantity: item?.max_quantity ?? 0,
        reorderThreshold: item?.reorder_threshold ?? 0,
        unitPrice: item?.unit_price ?? 0,
        status: status,
      }));
    };

    const transformedHealthItems: TransformedHealthItems = {
      healthy_stock_items: transformFunction(
        sourceData?.healthy_stock_items ?? [],
        'Healthy',
      ),
      low_stock: transformFunction(sourceData.low_stock ?? [], 'Low'),
      empty_stock: transformFunction(sourceData.empty_stock ?? [], 'Empty'),
    };

    return transformedHealthItems;
  }, [inventoryMetrics?.inventory_health?.items]);

  return (
    <PageContainer className="flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <HeaderContent
          title="Inventory"
          description="A centralized hub for stock intelligence. 
          Use advanced filtering to analyze turnover, reconcile quantities, and synchronize 
          inventory across all store locations."
        />
        <Button
          endIcon={<icons.circlePlus size={30} />}
          sx={{
            color: 'var(--invert-text)',
            backgroundColor: 'var(--accent-positive)',
            '&:hover': {
              backgroundColor: 'var(--accent-positive-hover)',
              color: 'var(--invert-text)',
            },
          }}
          onClick={handleAddInventory}
        >
          <Typography variant="body">Add Inventory</Typography>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2 flex-col">
          {inventoryKPIData?.map((item) => (
            <InventoryKPICount
              title={item?.title}
              info={item?.details}
              data={item?.data}
              loading={
                inventoryMetricsLoading && inventoryMetricsStatus === 'pending'
              }
              caption={item?.caption}
            />
          ))}
        </div>

        <InventoryByCategory />
      </div>
      <WareHouseInventory
        data={inventoryWareHouse}
        loading={
          inventoryMetricsLoading && inventoryMetricsStatus === 'pending'
        }
      />
    </PageContainer>
  );
};

export default Inventory;
