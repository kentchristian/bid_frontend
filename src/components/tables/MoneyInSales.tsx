import { formatUnit } from '../../lib/utils/formatUnit';
import DynamicDataGrid from '../common/DynamicDataGrid';

const MoneyInSales = () => {
  const columns = [
    { field: 'time', headerName: 'Time', flex: 1 },
    { field: 'customer', headerName: 'Customer', flex: 1 },
    { field: 'product', headerName: 'Product', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 0.5 },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      valueFormatter: (params: number) => formatUnit(params, 'PHP'),
    },
  ];

  const rows = [
    {
      id: 1,
      time: '08:30 AM',
      customer: 'Juan Dela Cruz',
      product: 'Laptop',
      quantity: 1,
      total: 45000,
    },
    {
      id: 2,
      time: '09:15 AM',
      customer: 'Maria Santos',
      product: 'Wireless Mouse',
      quantity: 2,
      total: 1200,
    },
    {
      id: 3,
      time: '10:05 AM',
      customer: 'Carlos Reyes',
      product: 'Mechanical Keyboard',
      quantity: 1,
      total: 3500,
    },
    {
      id: 4,
      time: '11:40 AM',
      customer: 'Anna Lopez',
      product: 'Monitor 24"',
      quantity: 3,
      total: 27000,
    },
    {
      id: 5,
      time: '01:10 PM',
      customer: 'Mark Lim',
      product: 'USB-C Hub',
      quantity: 5,
      total: 7500,
    },
  ];

  return <DynamicDataGrid columns={columns} rows={rows} />;
};

export default MoneyInSales;
