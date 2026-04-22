import { Button } from '@mui/material'; // Assuming MUI based on your sx prop usage
import type { GridColDef } from '@mui/x-data-grid';

import { format } from 'date-fns';
import { useRef } from 'react';
import { icons } from '../../lib/constants/icons';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';
import SearchBar from '../filters/SearchBar';

import { useTransactionHistory } from '../../lib/hooks/useSales';
import { useSnackbar } from '../../lib/providers/SnackbarProvider';
import { currency } from '../../lib/utils/currency';
import SummaryTile from '../cards/SummaryTile';

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

const SalesHistory = ({
  data = [],
  loading,
  getSelectedDates,
}: SalesHistoryProps) => {
  const {
    data: transactionHistory,
    isLoading: transactionHistoryLoading,
    status: transactionHistoryStatus,
  } = useTransactionHistory();

  type SummaryType = {
    label: string;
    value: string | number;
    sub: string;
  };

  const summary: SummaryType[] = [
    {
      label: 'Total Revenue',
      value: currency.format(transactionHistory?.total_revenue ?? 0) ?? 0,
      sub: 'Gross income',
    },
    {
      label: 'Transactions',
      value: transactionHistory?.total_transactions ?? 0,
      sub: 'Total Orders',
    },
    {
      label: 'Unit Sold',
      value: '',
      sub: 'Volume',
    },
  ];

  // Restored and adapted button styles
  const actionButtonSx = (colorVar: string) => ({
    minWidth: 0,
    width: 32,
    height: 32,
    padding: 0,
    // borderRadius: 0.5,
    // border: `1px solid var(${colorVar})`,
    color: `var(${colorVar})`,
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: `var(${colorVar})`,
      backgroundColor: `var(${colorVar}10)`, // Slight transparency on hover
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'transactionID',
      headerName: 'Transaction ID',
      flex: 1,
    },
    { field: 'created_by', headerName: 'Sold By', flex: 1 },
    {
      field: 'sold_at',
      headerName: 'Date & Time',
      flex: 1.2,
      renderCell: (params: any) => new Date(params.value).toLocaleString(),
    },
    {
      field: 'quantity',
      headerName: 'Items In Transaction',
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
        {summary.map((item) => (
          <SummaryTile
            label={item.label}
            value={item?.value.toLocaleString()}
            sub={item.sub}
            loading={
              transactionHistoryLoading &&
              transactionHistoryStatus === 'pending'
            }
          />
        ))}
      </div>

      <DynamicDataGrid
        columns={columns}
        rows={[]}
        loading={
          transactionHistoryLoading && transactionHistoryStatus === 'pending'
        }
        minHeight={500}
        className="sales-data-grid"
      />
    </CardContainer>
  );
};

export default SalesHistory;
