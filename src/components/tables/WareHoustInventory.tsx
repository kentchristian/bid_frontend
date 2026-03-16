import { Button } from '@mui/material';
import { FiEdit2, FiMinus, FiPlus } from 'react-icons/fi';
import DynamicDataGrid from '../common/DynamicDataGrid';

const WareHouseInventory = () => {
  const actionButtonSx = (colorVar: string) => ({
    minWidth: 0,
    width: 36,
    height: 36,
    padding: 0,
    borderRadius: 0.5,
    borderColor: `var(${colorVar})`,
    color: `var(${colorVar})`,
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: `var(${colorVar})`,
      backgroundColor: 'transparent',
    },
  });

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
          <div className="flex items-center justify-start gap-2 p-2">
            <Button
              aria-label={`Add stock for ID ${id}`}
              variant="outlined"
              sx={actionButtonSx('--accent-positive')}
              onClick={() => alert(`Add stock for ID ${id}`)}
            >
              <FiPlus size={16} />
            </Button>
            <Button
              aria-label={`Minus stock for ID ${id}`}
              variant="outlined"
              sx={actionButtonSx('--accent-negative')}
              onClick={() => alert(`Minus stock for ID ${id}`)}
            >
              <FiMinus size={16} />
            </Button>
            <Button
              aria-label={`Edit product ID ${id}`}
              variant="outlined"
              sx={actionButtonSx('--accent-primary')}
              onClick={() => alert(`Edit product ID ${id}`)}
            >
              <FiEdit2 size={16} />
            </Button>
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
