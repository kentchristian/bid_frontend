import { Switch } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getItemsBelowThreshold } from '../api/inventory';
import { getTotalItemsSold, getTotalRevenue } from '../api/sales';
import CriticalstacksAlert from '../components/cards/CriticalStacksAlert';
import TodaysTopHits from '../components/cards/TodaysTopHits';
import TotalRevenueCard from '../components/cards/TotalRevenueCard';
import TotalUnitsSoldCard from '../components/cards/TotalUnitsSoldCard';
import InventoryHealthPieChart from '../components/charts/InventoryHealthPieChart';
import SalesTrendAreaChart from '../components/charts/SalesTrendAreaChart';
import CardContainer from '../components/common/CardContainer';
import PageContainer from '../components/common/PageContainer';
import MoneyInSales from '../components/tables/MoneyInSales';
import WareHouseInventory from '../components/tables/WareHoustInventory';
import {
  type ItemsBelowThreshold,
  type TotalItemsSold,
  type TotalRevenue,
} from '../lib/types/usequery-types';
import { getCookie } from '../lib/utils/getCookie';
import { useMiddleware } from '../middleware/MiddlewareProvider';

const Dashboard = () => {
  const { isAuthenticated } = useMiddleware();
  const csrftoken = getCookie('csrftoken');

  const {
    data: totalRevenue,
    isLoading: totalRevenueLoading,
    status: totalRevenueStatus,
  } = useQuery<TotalRevenue>({
    queryKey: ['user', csrftoken, 'sales-total-revenue'],
    queryFn: getTotalRevenue,
    enabled: isAuthenticated,
  });

  const {
    data: totalItemsSold,
    isLoading: totalItemsSoldLoading,
    status: totalItemsSoldStatus,
  } = useQuery<TotalItemsSold>({
    queryKey: ['user', csrftoken, 'sales-total-items-sold'],
    queryFn: getTotalItemsSold,
    enabled: isAuthenticated,
  });

  const {
    data: itemsBelowThreshold,
    isLoading: itemsBelowThresholdLoading,
    status: itemsBelowThresholdStatus,
  } = useQuery<ItemsBelowThreshold>({
    queryKey: ['user', csrftoken, 'items-below-threshold'],
    queryFn: getItemsBelowThreshold,
    enabled: isAuthenticated,
  });

  return (
    <PageContainer className="gap-2 flex flex-col">
      <div className="dashboard-row flex flex-row gap-2">
        <TotalRevenueCard
          title={'Total Revenue'}
          info={
            'Total Revenue is the total income from today’s sales. The trend shows how it compares to yesterday, indicating growth (↑) or decline (↓).'
          }
          totalRevenueToday={totalRevenue?.today_total || 0}
          totalRevenueYesterday={totalRevenue?.yesterday_total || 0}
          status={totalRevenueStatus}
          loading={totalRevenueLoading}
        />
        <TotalUnitsSoldCard
          title={'Total Units Sold'}
          info={
            'Total units successfully sold in the last 24 hours (resets at midnight).'
          }
          totalUnitsSold={totalItemsSold?.today_total_items || 0}
          totalUnitsYesterday={totalItemsSold?.yesterday_total_items || 0}
          loading={totalItemsSoldLoading}
          status={totalItemsSoldStatus}
        />
        <CriticalstacksAlert
          title={'Critical Stacks Alert'}
          info={
            "Total count of items that have reached 'Low Stock' status and need to be reordered."
          }
          itemsBelowThrehold={itemsBelowThreshold?.total || 0}
          loading={itemsBelowThresholdLoading}
          status={itemsBelowThresholdStatus}
        />
      </div>

      <div className="dashboard-row flex flex-row gap-2">
        {/* Need card Container for now */}
        <SalesTrendAreaChart />
        <InventoryHealthPieChart />
      </div>

      <div className="dashboard-row flex flex-row gap-2">
        <CardContainer
          title="Money in Sales Feed"
          info="Presents a transactional log of sales activity.
Includes time of transaction, customer, product purchased, quantity sold, and total revenue generated."
          className="flex-1 min-w-0"
        >
          <MoneyInSales />
        </CardContainer>
        <CardContainer
          title="Today’s Top Hits"
          info="Ranks the top-performing products for the current day based on total accumulated sales.
Displays revenue generated, quantity sold, remaining inventory, unit price, product classification, and latest update timestamp."
          className="flex-1 min-w-0"
        >
          <TodaysTopHits />
        </CardContainer>
      </div>

      <CardContainer
        title="Warehouse Inventory"
        className="flex-1 min-w-0"
        info="Provides a structured view of warehouse stock levels.
Enables monitoring of inventory thresholds and supports direct quantity adjustments through add, subtract, and inline modification actions."
        customFunction={
          <Switch
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'var(--accent-positive)', // thumb color
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'var(--accent-positive)', // track color
              },
            }}
          />
        }
      >
        <WareHouseInventory />
      </CardContainer>
    </PageContainer>
  );
};

export default Dashboard;
