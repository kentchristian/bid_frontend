import { Button } from '@mui/material'; // Assuming MUI based on your sx prop usage
import type { GridColDef } from '@mui/x-data-grid';

import { format } from 'date-fns';
import { useRef } from 'react';
import { icons } from '../../lib/constants/icons';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';
import { Typography } from '../common/Typography';
import SearchBar from '../filters/SearchBar';

import { useSnackbar } from '../../lib/providers/SnackbarProvider';

interface SalesEntry {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  unit_price: number | string;
  total_price: number | string;
  sold_at: string;
  created_by: string;
}

interface SalesHistoryProps {
  data?: SalesEntry[];
  loading?: boolean;
  getSelectedDates: () => { from: Date | null; to: Date | null };
}

const dummySalesData: SalesEntry[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    productName: 'Logitech G Pro Keyboard',
    category: 'Peripherals',
    quantity: 2,
    unit_price: 150.0,
    total_price: 300.0,
    sold_at: '2026-04-01T10:30:00Z',
    created_by: 'admin_user',
  },
  {
    id: '67c7e3f4-d51a-464a-9351-4646702e75e1',
    productName: 'Dell UltraSharp 27"',
    category: 'Monitors',
    quantity: 1,
    unit_price: 450.0,
    total_price: 450.0,
    sold_at: '2026-04-02T14:15:00Z',
    created_by: 'j_suelan',
  },
  {
    id: 'a1b2c3d4-e5f6-4g7h-8i9j-k1l2m3n4o5p6',
    productName: 'Ergonomic Desk Chair',
    category: 'Furniture',
    quantity: 5,
    unit_price: 200.0,
    total_price: 1000.0,
    sold_at: '2026-04-03T09:00:00Z',
    created_by: 'admin_user',
  },
  {
    id: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
    productName: 'MacBook Pro M3',
    category: 'Laptops',
    quantity: 1,
    unit_price: 2499.0,
    total_price: 2499.0,
    sold_at: '2026-04-04T11:45:00Z',
    created_by: 'j_juario',
  },
  {
    id: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8',
    productName: 'USB-C Hub 7-in-1',
    category: 'Accessories',
    quantity: 10,
    unit_price: 45.0,
    total_price: 450.0,
    sold_at: '2026-04-04T16:20:00Z',
    created_by: 'admin_user',
  },
  {
    id: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9',
    productName: 'Sony WH-1000XM5',
    category: 'Audio',
    quantity: 3,
    unit_price: 350.0,
    total_price: 1050.0,
    sold_at: '2026-04-05T08:10:00Z',
    created_by: 'j_suelan',
  },
  {
    id: 'e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0',
    productName: 'Standing Desk Converter',
    category: 'Furniture',
    quantity: 2,
    unit_price: 180.0,
    total_price: 360.0,
    sold_at: '2026-04-05T13:40:00Z',
    created_by: 'j_juario',
  },
  {
    id: 'f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1',
    productName: 'MX Master 3S Mouse',
    category: 'Peripherals',
    quantity: 4,
    unit_price: 99.0,
    total_price: 396.0,
    sold_at: '2026-04-06T10:00:00Z',
    created_by: 'admin_user',
  },
  {
    id: 'g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2',
    productName: '4K Webcam',
    category: 'Accessories',
    quantity: 6,
    unit_price: 120.0,
    total_price: 720.0,
    sold_at: '2026-04-06T15:55:00Z',
    created_by: 'j_suelan',
  },
  {
    id: 'h8i9j0k1-l2m3-n4o5-p6q7-r8s9t0u1v2w3',
    productName: 'Thunderbolt 4 Cable',
    category: 'Accessories',
    quantity: 15,
    unit_price: 30.0,
    total_price: 450.0,
    sold_at: '2026-04-07T09:30:00Z',
    created_by: 'admin_user',
  },
];

const SalesHistory = ({
  data = [],
  loading,
  getSelectedDates,
}: SalesHistoryProps) => {
  const totalSalesCount = data.length;
  const totalRevenue = data.reduce(
    (acc, curr) => acc + Number(curr.total_price),
    0,
  );
  const totalUnitsSold = data.reduce((acc, curr) => acc + curr.quantity, 0);

  // Restored and adapted button styles
  const actionButtonSx = (colorVar: string) => ({
    minWidth: 0,
    width: 32,
    height: 32,
    padding: 0,
    borderRadius: 0.5,
    border: `1px solid var(${colorVar})`,
    color: `var(${colorVar})`,
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: `var(${colorVar})`,
      backgroundColor: `var(${colorVar}10)`, // Slight transparency on hover
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'sold_at',
      headerName: 'Date & Time',
      flex: 1.2,
      renderCell: (params: any) => new Date(params.value).toLocaleString(),
    },
    { field: 'productName', headerName: 'Product', flex: 1.5 },
    { field: 'category', headerName: 'Category', flex: 1 },
    {
      field: 'quantity',
      headerName: 'Qty',
      flex: 0.6,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'total_price',
      headerName: 'Total Price',
      flex: 1,
      renderCell: (params: any) => (
        <span className="font-semibold text-[color:var(--accent-positive)]">
          {`$${Number(params.value).toLocaleString()}`}
        </span>
      ),
    },
    { field: 'created_by', headerName: 'Sold By', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.8,
      sortable: false,
      renderCell: (params: any) => {
        const { id } = params.row;
        return (
          <div className="flex items-center justify-start gap-2 h-full">
            <Button
              aria-label={`View Details for ${id}`}
              sx={actionButtonSx('--accent-primary')}
              onClick={() => console.log(`View sale: ${id}`)}
            >
              <icons.show size={16} />
            </Button>
            <Button
              aria-label={`Edit product ID ${id}`}
              variant="outlined"
              sx={actionButtonSx('--accent-primary')}
              onClick={() => alert(`Edit product ID ${id}`)}
            >
              <icons.edit size={16} />
            </Button>
            <Button
              aria-label={`Delete record ${id}`}
              sx={actionButtonSx('--accent-negative')}
              onClick={() => alert(`Initiate refund/delete for: ${id}`)}
            >
              <icons.delete size={16} />
            </Button>
          </div>
        );
      },
    },
  ];

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { showSnackbar } = useSnackbar();

  const handleSearch = (searchTerm: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      if (searchTerm) alert(searchTerm);
    }, 500);
  };

  const handleDateFilter = () => {
    // getSelectedDates();
    const { from, to } = getSelectedDates();

    if (!from) {
      showSnackbar('Please select a date!', { variant: 'error' });
    }

    from &&
      alert(
        `Date: ${format(from, 'MMM dd, yyyy')} - ${format(
          to ?? from,
          'MMM dd, yyyy',
        )}`,
      );
  };
  return (
    <CardContainer
      title="Sales History"
      className="sales-history flex-1 min-w-0 min-h-180 mt-7"
      info="Transaction log synced with tenant inventory."
      customFunction={
        <div className="flex flex-row gap-2">
          <Button onClick={handleDateFilter} className="w-50">
            Apply Date Filter
          </Button>
          <SearchBar onChange={handleSearch} />
        </div>
      }
    >
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SummaryTile
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          sub="Gross income"
        />
        <SummaryTile
          label="Transactions"
          value={totalSalesCount.toString()}
          sub="Total orders"
        />
        <SummaryTile
          label="Units Sold"
          value={totalUnitsSold.toString()}
          sub="Volume"
        />
      </div>

      <DynamicDataGrid
        columns={columns}
        rows={dummySalesData}
        loading={loading}
        minHeight={500}
        className="sales-data-grid"
      />
    </CardContainer>
  );
};

const SummaryTile = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) => (
  <div className="flex-1 border border-(--card-border) p-4 rounded-sm bg-[color:var(--sidebar-bg)] shadow-sm">
    <Typography
      variant="caption"
      className="text-gray-500 uppercase tracking-wider font-bold"
    >
      {label}
    </Typography>
    <Typography variant="h2" className="mt-1">
      {value}
    </Typography>
    <Typography
      variant="caption"
      className="text-[color:var(--accent-primary)]"
    >
      {sub}
    </Typography>
  </div>
);

export default SalesHistory;
