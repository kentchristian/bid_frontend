
import { getInventoryHealthReport, getSalesPerformanceOverview } from "../../api/reports";
import type { AlertsResponse, RawSalesPerformanceOverviewResponse } from "../types/report-types";
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