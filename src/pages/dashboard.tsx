import CriticalstacksAlert from '../components/cards/CriticalStacksAlert';
import TotalRevenueCard from '../components/cards/TotalRevenueCard';
import TotalUnitsSoldCard from '../components/cards/TotalUnitsSoldCard';
import PageContainer from '../components/common/PageContainer';

const Dashboard = () => {
  return (
    <PageContainer>
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
          itemsBelowThrehold={[1, 2, 3, 4]}
        />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
