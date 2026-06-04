import type { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useInventoryHealthReport } from '../../lib/hooks/useReports';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';
import { Typography } from '../common/Typography';

export const InventoryHealthPanel = () => {
  const {
    data: inventoryHealthReport,
    isLoading: inventoryHealthReportLoading,
    status: inventoryHealthReportStatus,
  } = useInventoryHealthReport();

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Alert ID',
      flex: 1,
      minWidth: 150,
      // Optional: Only show this if you need the UUID visible, otherwise you can omit it
    },
    {
      field: 'productName',
      headerName: 'Product',
      flex: 1.5, // Given more weight for long names
      minWidth: 200,
    },
    {
      field: 'stockQuantity',
      headerName: 'Quantity',
      type: 'number',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'reorderThreshold',
      headerName: 'Reorder Threshold',
      type: 'number',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
    },
  ];

  const stocksAlerts = inventoryHealthReport?.alerts?.low_stock_alerts;
  const transformedRows = useMemo(() => {
    return stocksAlerts?.map((item) => {
      return {
        id: item?.id || '--',
        productName: item?.product_name || '--',
        stockQuantity: item?.stock_quantity || 0,
        reorderThreshold: item?.reorder_threshold || 0,
      };
    });
  }, [inventoryHealthReport]);
  return (
    <CardContainer title="Inventory Health" className="min-h-96 p-4 shadow-sm">
      <div className="flex h-full flex-col gap-5">
        <section>
          <Typography variant="overline" className="mb-2">
            Low Stock Alerts
          </Typography>
          <DynamicDataGrid
            columns={columns}
            rows={transformedRows || []}
            minHeight={350}
            loading={
              inventoryHealthReportLoading &&
              inventoryHealthReportStatus === 'pending'
            }
          />
        </section>
      </div>
    </CardContainer>
  );
};
