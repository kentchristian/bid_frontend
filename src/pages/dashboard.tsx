import { Switch } from '@mui/material';
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

const Dashboard = () => {
  return (
    <PageContainer className="gap-2 flex flex-col">
      <div className="dashboard-row flex flex-row gap-2">
        <TotalRevenueCard
          title={'Total Revenue'}
          totalRevenueToday={12}
          totalRevenueYesterday={6}
        />
        <TotalUnitsSoldCard
          title={'Total Units Sold'}
          totalUnitsSold={142}
          dailyTarget={100}
        />
        <CriticalstacksAlert
          title={'Critical Stacks Alert'}
          itemsBelowThrehold={['something', 'something']}
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
        customFunction={<Switch />}
      >
        <WareHouseInventory />
      </CardContainer>
    </PageContainer>
  );
};

export default Dashboard;
