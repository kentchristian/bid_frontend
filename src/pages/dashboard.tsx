import CriticalstacksAlert from '../components/cards/CriticalStacksAlert';
import TotalRevenueCard from '../components/cards/TotalRevenueCard';
import TotalUnitsSoldCard from '../components/cards/TotalUnitsSoldCard';
import InventoryHealthPieChart from '../components/charts/InventoryHealthPieChart';
import SalesTrendAreaChart from '../components/charts/SalesTrendAreaChart';
import PageContainer from '../components/common/PageContainer';

const Dashboard = () => {
  return (
    <PageContainer className="gap-2 flex flex-col">
      <div className="flex flex-row gap-2">
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

      <div className="flex flex-row gap-2">
        {/* Need card Container for now */}

        <div className="rounded-md border w-full h-full flex justify-center items-center">
          <SalesTrendAreaChart />
        </div>
        <div className="rounded-md border w-full h-full flex justify-center items-center">
          <InventoryHealthPieChart />
        </div>
      </div>

      {/* <div>
        <MoneyInSales />
      </div> */}
    </PageContainer>
  );
};

export default Dashboard;
