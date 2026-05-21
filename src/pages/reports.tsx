import PageContainer from '../components/common/PageContainer';
import {
  AiInsightCard,
  InventoryHealthPanel,
  MonthlySalesTrend,
  RecentTransactionsReport,
  ReportsToolbar,
  SalesPerformanceOverview,
  StaffLeaderboard,
} from '../components/reports';

const Reports = () => {
  return (
    <PageContainer className="flex flex-col gap-4">
      <ReportsToolbar />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <AiInsightCard />
          <SalesPerformanceOverview />

          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
            <StaffLeaderboard />
            <MonthlySalesTrend />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <InventoryHealthPanel />
          <RecentTransactionsReport />
        </div>
      </div>
    </PageContainer>
  );
};

export default Reports;
