import { useQuery } from '@tanstack/react-query';
import { getInventoryMetrics } from '../../api/inventory';
import { getSalesDashboardMetrics } from '../../api/sales';
import { useMiddleware } from '../../middleware/MiddlewareProvider';
import {
  type DashboardSalesMetrics,
  type InventoryMetrics
} from '../types/usequery-types';
import { getCookie } from '../utils/getCookie';


const useAuthQuery = <T>(key: string, fetcher: () => Promise<T>) => {
  const { isAuthenticated } = useMiddleware();
  const csrftoken = getCookie('csrftoken');

  return useQuery<T>({
    queryKey: [csrftoken, key],
    queryFn: fetcher,
    enabled: !!isAuthenticated,
  })
}

export const useSalesMetrics = () => {
  return useAuthQuery<DashboardSalesMetrics>(
    'sales-metrics',
    getSalesDashboardMetrics
  );
}

export const useInventoryMetrics = () => {
  return useAuthQuery<InventoryMetrics>(
    'inventory-metrics',
    getInventoryMetrics
  );
}