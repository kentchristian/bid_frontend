import type {
  AlertsResponse,
  MonthlySalesTrendApiParameters,
  MonthlySalesTrendResponse,
  RawSalesPerformanceOverviewResponse,
  RecentTransactionsResponse,
  StaffLeaderboardResponse,
} from '../lib/types/report-types';
import { baseApi } from '../services/axiosClient';

export const getSalesPerformanceOverview =
  async (): Promise<RawSalesPerformanceOverviewResponse> => {
    const { data } = await baseApi.get<RawSalesPerformanceOverviewResponse>(
      '/api/sales_report/sales_performance_overview/',
    );

    return data;
  };

export const getInventoryHealthReport = async (): Promise<AlertsResponse> => {
  const { data } = await baseApi.get<AlertsResponse>(
    '/api/inventory_report/inventory_health_report/',
  );

  return data;
};

export const getStaffPerformanceLeaderBoard =
  async (): Promise<StaffLeaderboardResponse> => {
    const { data } = await baseApi.get<StaffLeaderboardResponse>(
      '/api/sales_report/staff_performance_leaderboard/',
    );

    return data;
  };

export const getMonthlySalesTrend = async ({
  year,
  month,
}: MonthlySalesTrendApiParameters): Promise<MonthlySalesTrendResponse> => {
  const { data } = await baseApi.get<MonthlySalesTrendResponse>(
    `/api/sales_report/monthly_sales_trend/?year=${year}&month=${month}`,
  );

  return data;
};

export const getRecentTransactionReports =
  async (): Promise<RecentTransactionsResponse> => {
    const { data } = await baseApi.get<RecentTransactionsResponse>(
      `/api/sales_report/recent_transactions_report/`,
    );

    return data;
  };
