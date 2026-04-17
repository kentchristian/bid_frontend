import { getInventoryMetrics } from '../../api/inventory';
import { getSalesDashboardMetrics } from '../../api/sales';
import {
  type DashboardSalesMetrics,
  type InventoryMetrics
} from '../types/usequery-types';
import { useAuthQuery } from './useAuthQuery';

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