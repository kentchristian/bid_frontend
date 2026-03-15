import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';

const MoneyInSales = () => {
  const columns = [
    { field: 'time', headerName: 'Time', width: 20 },
    { field: 'customer', headerName: 'Customer', flex: 1 },
    { field: 'product', headerName: 'Product', width: 120 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
  ];

  const rows = [
    { id: 1, name: 'Laptop', quantity: 50, status: 'Healthy' },
    { id: 2, name: 'Mouse', quantity: 5, status: 'Low Stock' },
    { id: 3, name: 'Keyboard', quantity: 0, status: 'Out of Stock' },
  ];

  return (
    <CardContainer title="Money in Sales Feed">
      <DynamicDataGrid columns={columns} rows={rows} />
    </CardContainer>
  );
};

export default MoneyInSales;
