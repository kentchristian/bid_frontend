
import { getInventoryHealthReport, getMonthlySalesTrend, getSalesPerformanceOverview, getStaffPerformanceLeaderBoard } from "../../api/reports";
import type { AlertsResponse, MonthlySalesTrendApiParameters, MonthlySalesTrendResponse, RawSalesPerformanceOverviewResponse, StaffLeaderboardResponse } from "../types/report-types";
import { useAuthQuery } from "./useAuthQuery";



export const useSalesPerformanceOverview = () => {
  return useAuthQuery<RawSalesPerformanceOverviewResponse>(
    'sales-performance-overview',
    getSalesPerformanceOverview
    
  );
}

export const useInventoryHealthReport = () => {
  return useAuthQuery<AlertsResponse>(
    'inventory-health-report',
    getInventoryHealthReport
    
  );
}


export const useStaffLeaderBoardReport = () => {
  return useAuthQuery<StaffLeaderboardResponse>(
    'staff-leaderboard-report',
    getStaffPerformanceLeaderBoard
    
  );
}

export const useMonthlySalesTrendReport = ({year, month}: MonthlySalesTrendApiParameters) => {
  return useAuthQuery<MonthlySalesTrendResponse>(
    // Included variables in the query key so it refetches when month/year changes
    ['monthly-sales-trend-report', { year, month }], 
    // 2. Fixed: Passed as an object wrapper inside an anonymous arrow function
    () => getMonthlySalesTrend({ year, month })
    
  );
}