

export type StaffPerformanceMetrics = {
  staff_id: string;
  employee: string;
  total_transactions: number;
  total_sales_revenue: number;
};

export type StaffLeaderboardResponse = {
  staff_performance_leaderboard: StaffPerformanceMetrics[];
};