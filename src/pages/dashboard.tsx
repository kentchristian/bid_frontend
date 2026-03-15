import CriticalstacksAlert from '../components/cards/CriticalStacksAlert';
import MoneyInSales from '../components/cards/MoneyInSales';
import TotalRevenueCard from '../components/cards/TotalRevenueCard';
import TotalUnitsSoldCard from '../components/cards/TotalUnitsSoldCard';
import InventoryHealthPieChart from '../components/charts/InventoryHealthPieChart';
import SalesTrendAreaChart from '../components/charts/SalesTrendAreaChart';
import CardContainer from '../components/common/CardContainer';
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

        <CardContainer
          title="Sales Trend (Last 7 Days)"
          info="Shows the List Per day within 7  days"
        >
          <SalesTrendAreaChart />
        </CardContainer>

        <CardContainer
          title="Inventory Health"
          info="Shows Inventory Pie Chart to visualize the ratio of stocks needing attention."
        >
          <InventoryHealthPieChart />
        </CardContainer>
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex flex-row flex-1">
          <MoneyInSales />
        </div>

        <div className="flex-1">
          <MoneyInSales />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
