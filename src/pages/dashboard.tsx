import { useQuery } from '@tanstack/react-query';

import { getInventoryMetrics } from '../api/inventory';
import { getSalesDashboardMetrics, getTodaysTopHits } from '../api/sales';
import CriticalstacksAlert from '../components/cards/CriticalStacksAlert';
import TodaysTopHits from '../components/cards/TodaysTopHits';
import TotalRevenueCard from '../components/cards/TotalRevenueCard';
import TotalUnitsSoldCard from '../components/cards/TotalUnitsSoldCard';
import InventoryHealthPieChart from '../components/charts/InventoryHealthPieChart';
import SalesTrendAreaChart from '../components/charts/SalesTrendAreaChart';
import PageContainer from '../components/common/PageContainer';

import { useMemo } from 'react';
import MoneyInSales from '../components/tables/MoneyInSales';
import WareHouseInventory from '../components/tables/WareHoustInventory';
import { icons } from '../lib/constants/icons';
import type {
  MoneyInSalesType,
  TransformedMoneyInSalesType,
} from '../lib/types/money-in-sales';
import {
  type apiTodaysTopHitsType,
  type TodaysTopHitsType,
  type TransformedTodaysTopHits,
} from '../lib/types/todays-top-hits-type';
import {
  type DashboardSalesMetrics,
  type InventoryMetrics,
} from '../lib/types/usequery-types';
import type {
  InventoryHealthItems,
  TransformedHealthItems,
  TransformedWareHouseType,
  WareHouseInventoryType,
} from '../lib/types/warehouse-inventory-type';
import { getCookie } from '../lib/utils/getCookie';
import { getTwelveHourFormat } from '../lib/utils/getTwelveHourFormat';
import { useMiddleware } from '../middleware/MiddlewareProvider';

const Dashboard = () => {
  const { isAuthenticated } = useMiddleware();
  const csrftoken = getCookie('csrftoken');

  const {
    data: sales,
    isLoading: salesLoading,
    status: salesStatus,
  } = useQuery<DashboardSalesMetrics>({
    queryKey: ['user', csrftoken, 'dashboard-metrics'],
    queryFn: getSalesDashboardMetrics,
    enabled: isAuthenticated,
  });

  const {
    data: inventoryMetrics,
    isLoading: inventoryMetricsLoading,
    status: inventoryMetricsStatus,
  } = useQuery<InventoryMetrics>({
    queryKey: ['user', csrftoken, 'inventory-metrics'],
    queryFn: getInventoryMetrics,
    enabled: isAuthenticated,
  });

  const {
    data: todaysTopHitsData,
    isLoading: todaysTopHitsDataLoading,
    status: todaysTopHitsDataStatus,
  } = useQuery<TodaysTopHitsType>({
    queryKey: ['user', csrftoken, 'todays-top-hits'],
    queryFn: getTodaysTopHits,
    enabled: isAuthenticated,
  });

  // Transform Money In Sales Data
  const moneyInSales = useMemo(() => {
    if (!sales?.money_in_sales) return [];

    const transformedMoneyInSales: TransformedMoneyInSalesType[] =
      sales.money_in_sales.map((item: MoneyInSalesType) => ({
        id: item?.id,
        time: getTwelveHourFormat(item?.sold_at),
        created_by: item?.created_by?.name || 'System',
        product: item?.inventory?.product_name || 'N/A',
        quantity: item?.quantity,
        total: item?.total_price,
      }));

    return transformedMoneyInSales;
  }, [sales?.money_in_sales]);

  const todaysTopHits = useMemo(() => {
    if (!todaysTopHitsData?.todays_top_hits) return [];

    const rankedSymbols = [icons.first, icons.second, icons.third];

    const transformedTodaysTopHits: TransformedTodaysTopHits[] =
      todaysTopHitsData?.todays_top_hits?.map(
        (item: apiTodaysTopHitsType, idx: number) => ({
          id: item?.id,
          rank: item?.rank,
          rankSymbol: rankedSymbols[idx] || icons.arrowUp,
          name: item?.inventory?.product_name ?? 'Unknown Product',
          class: item?.inventory?.category?.name ?? 'Uncategorized',
          quantity: item?.quantity ?? 0,
          totalRevenue: item?.total_price ?? 0,
          price: item?.inventory?.unit_price ?? 0,
          updatedAt: getTwelveHourFormat(item?.sold_at) ?? 'N/A',
          maxQuantity: item?.inventory?.max_quantity ?? 0,
        }),
      );

    return transformedTodaysTopHits;
  }, [todaysTopHitsData?.todays_top_hits]);

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

  console.table(inventoryWareHouse);

  return (
    <PageContainer className="gap-2 flex flex-col">
      <div className="dashboard-row flex flex-row gap-2">
        <TotalRevenueCard
          title={'Total Revenue'}
          info={
            'Total Revenue is the total income from today’s sales. The trend shows how it compares to yesterday, indicating growth (↑) or decline (↓).'
          }
          totalRevenueToday={sales?.total_revenue?.today_total || 0}
          totalRevenueYesterday={sales?.total_revenue?.yesterday_total || 0}
          status={salesStatus}
          loading={salesLoading}
        />
        <TotalUnitsSoldCard
          title={'Total Units Sold'}
          info={
            'Total units successfully sold in the last 24 hours (resets at midnight).'
          }
          totalUnitsSold={sales?.total_items?.today_total_items || 0}
          totalUnitsYesterday={sales?.total_items?.yesterday_total_items || 0}
          loading={salesLoading}
          status={salesStatus}
        />
        <CriticalstacksAlert
          title={'Critical Stacks Alert'}
          info={
            "Total count of items that have reached 'Low Stock' status and need to be reordered."
          }
          itemsBelowThrehold={
            inventoryMetrics?.items_below_threshold?.total || 0
          }
          loading={inventoryMetricsLoading}
          status={inventoryMetricsStatus}
        />
      </div>

      <div className="dashboard-row flex flex-row gap-2">
        {/* Need card Container for now */}
        <SalesTrendAreaChart
          loading={salesLoading && salesStatus === 'pending'}
          data={sales?.trend_sales || null}
        />
        <InventoryHealthPieChart
          loading={
            inventoryMetricsLoading && inventoryMetricsStatus === 'pending'
          }
          data={inventoryMetrics?.inventory_health?.stocks_class_total || null}
        />
      </div>

      <div className="dashboard-row flex flex-row gap-2">
        <MoneyInSales
          rows={moneyInSales || []}
          loading={salesLoading && salesStatus === 'pending'}
        />
        <TodaysTopHits
          loading={
            todaysTopHitsDataLoading && todaysTopHitsDataStatus === 'pending'
          }
          data={todaysTopHits || []}
        />
      </div>

      <WareHouseInventory data={inventoryWareHouse} />
    </PageContainer>
  );
};

export default Dashboard;
