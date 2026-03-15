import DynamicDataGrid from '../common/DynamicDataGrid';

const WareHouseInventory = () => {
  const columns = [
    { field: 'name', headerName: 'Product Name', flex: 2 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'currentStock', headerName: 'Current Stock', flex: 1 },
    { field: 'reorderThreshold', headerName: 'Re-order Threshold', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.5,
      renderCell: (params: any) => {
        const { id } = params.row;
        return (
          <div className="flex gap-2 p-2">
            <button
              className="px-2 h-10 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => alert(`Add stock for ID ${id}`)}
            >
              +
            </button>
            <button
              className="px-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => alert(`Minus stock for ID ${id}`)}
            >
              -
            </button>
            <button
              className="px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => alert(`Edit product ID ${id}`)}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      name: 'Laptop Pro 15',
      category: 'Electronics',
      currentStock: 120,
      reorderThreshold: 50,
      status: 'Healthy',
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      category: 'Accessories',
      currentStock: 30,
      reorderThreshold: 20,
      status: 'Low Stock',
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      category: 'Accessories',
      currentStock: 0,
      reorderThreshold: 10,
      status: 'Out of Stock',
    },
    {
      id: 4,
      name: '24" Monitor',
      category: 'Electronics',
      currentStock: 45,
      reorderThreshold: 15,
      status: 'Healthy',
    },
    {
      id: 5,
      name: 'USB-C Hub',
      category: 'Accessories',
      currentStock: 12,
      reorderThreshold: 10,
      status: 'Low Stock',
    },
  ];

  return <DynamicDataGrid columns={columns} rows={rows} />;
};

export default WareHouseInventory;
