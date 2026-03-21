import type { TransformedMoneyInSalesType } from '../../lib/types/money-in-sales';
import { formatUnit } from '../../lib/utils/formatUnit';
import DynamicDataGrid from '../common/DynamicDataGrid';

interface MoneyInSalesProps {
  rows: TransformedMoneyInSalesType[]; // this is the transformed data
  loading?: boolean;
}

const MoneyInSales = ({ rows, loading }: MoneyInSalesProps) => {
  const columns = [
    { field: 'time', headerName: 'Time', flex: 1 },
    { field: 'created_by', headerName: 'Created By', flex: 1 },
    { field: 'product', headerName: 'Product', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 0.5 },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      valueFormatter: (params: number) => formatUnit(params, 'PHP'),
    },
  ];

  return (
    <DynamicDataGrid
      columns={columns}
      rows={rows}
      minHeight={350}
      loading={loading}
    />
  );
};

export default MoneyInSales;
