import { Button } from '@mui/material'; // Assuming MUI based on your sx prop usage
import type { GridColDef } from '@mui/x-data-grid';

import { format } from 'date-fns';
import { useMemo, useRef } from 'react';
import { icons } from '../../lib/constants/icons';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';
import SearchBar from '../filters/SearchBar';

import { useTransactionHistory } from '../../lib/hooks/useSales';
import { useSnackbar } from '../../lib/providers/SnackbarProvider';
import type { Transactions } from '../../lib/types/transaction-history';
import { currency } from '../../lib/utils/currency';
import { dateMonthDayTimeFormatter } from '../../lib/utils/dateMonthDayTimeFormatter';
import SummaryTile from '../cards/SummaryTile';

interface SalesHistoryProps {
  getSelectedDates: () => { from: Date | null; to: Date | null };
}

const SalesHistory = ({ getSelectedDates }: SalesHistoryProps) => {
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

  const transformedRows = useMemo(() => {
    if (!transactionHistory?.total_transactions) {
      return []; // return empty
    }

    return transactionHistory?.transactions.map((transaction: Transactions) => {
      return {
        id: transaction?.transaction_id ?? 'Unknown',
        transactionID: transaction?.transaction_id ?? 'Unknown',
        createdBy: transaction?.created_by ?? 'Unknown',
        soldAt: transaction?.sold_at ?? 'Unknown',
        quantity: transaction?.items_in_transaction ?? 0,
        totalPrice: transaction?.overall_transaction_amount ?? 0,
      };
    });
  }, [transactionHistory?.transactions]);

  // Memoized Summary
  const summary: SummaryType[] = useMemo(() => {
    return [
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
        value: transactionHistory?.units_sold ?? 0,
        sub: 'Volume',
      },
    ];
  }, [transactionHistory]);

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
    { field: 'createdBy', headerName: 'Sold By', flex: 2 },
    {
      field: 'soldAt',
      headerName: 'Date & Time',
      flex: 1,
      renderCell: (params: any) => {
        const date = dateMonthDayTimeFormatter(new Date(params.value));

        return date.toLocaleString();
      },
    },
    {
      field: 'quantity',
      headerName: 'Items In Transaction',
      flex: 0.6,
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      flex: 1,
      renderCell: (params: any) => (
        <span className="font-semibold text-[color:var(--accent-positive)]">
          {`${currency.format(params.value)}`}
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
              onClick={() => alert(`View sale: ${id}`)}
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
        rows={transformedRows ?? []}
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
