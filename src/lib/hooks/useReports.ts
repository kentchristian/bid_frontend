import {
  getInventoryHealthReport,
  getMonthlySalesTrend,
  getRecentTransactionReports,
  getSalesPerformanceOverview,
  getStaffPerformanceLeaderBoard,
} from '../../api/reports';
import type {
  AlertsResponse,
  MonthlySalesTrendApiParameters,
  MonthlySalesTrendResponse,
  RawSalesPerformanceOverviewResponse,
  RecentTransactionsResponse,
  StaffLeaderboardResponse,
} from '../types/report-types';
import { useAuthQuery } from './useAuthQuery';

export const useSalesPerformanceOverview = () => {
  return useAuthQuery<RawSalesPerformanceOverviewResponse>(
    'sales-performance-overview',
    getSalesPerformanceOverview,
  );
};

export const useInventoryHealthReport = () => {
  return useAuthQuery<AlertsResponse>(
    'inventory-health-report',
    getInventoryHealthReport,
  );
};

export const useStaffLeaderBoardReport = () => {
  return useAuthQuery<StaffLeaderboardResponse>(
    'staff-leaderboard-report',
    getStaffPerformanceLeaderBoard,
  );
};

export const useMonthlySalesTrendReport = ({
  year,
  month,
}: MonthlySalesTrendApiParameters) => {
  return useAuthQuery<MonthlySalesTrendResponse>(
    ['monthly-sales-trend-report', { year, month }],
    () => getMonthlySalesTrend({ year, month }),
  );
};

export const useRecentTransactionsReport = () => {
  return useAuthQuery<RecentTransactionsResponse>(
    'recent-transactions-report',
    getRecentTransactionReports,
  );
};
