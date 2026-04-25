import { Button, CircularProgress, Tooltip } from '@mui/material'; // Assuming MUI based on your sx prop usage
import type { GridColDef } from '@mui/x-data-grid';

import { useMemo, useRef, useState } from 'react';
import { icons } from '../../lib/constants/icons';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';
import SearchBar from '../filters/SearchBar';

import { useTransactionHistory } from '../../lib/hooks/useSales';
import { useSnackbar } from '../../lib/providers/SnackbarProvider';
import { useTransactionTicket } from '../../lib/store/useTransactionTicket';
import type { SalesTransactionPayload } from '../../lib/types/sales-transaction';
import type { Sales, Transactions } from '../../lib/types/transaction-history';
import { currency } from '../../lib/utils/currency';
import { dateMonthDayTimeFormatter } from '../../lib/utils/dateMonthDayTimeFormatter';
import SummaryTile from '../cards/SummaryTile';
import { Typography } from '../common/Typography';
import TransactionReceipt from '../modals/TransactionReceipt';

type DateType = { from: Date | null; to: Date | null };

interface SalesHistoryProps {
  getSelectedDates: () => DateType;
  handleClearDate: () => void;
}

const SalesHistory = ({
  getSelectedDates,
  handleClearDate,
}: SalesHistoryProps) => {
  const {
    data: transactionHistory,
    isLoading: transactionHistoryLoading,
    status: transactionHistoryStatus,
    isRefetching: transactionHistoryRefetching,
  } = useTransactionHistory();

  const [searchTerm, setSearchTerm] = useState('');
  const [dateSearch, setDateSearch] = useState<DateType>();

  type SummaryType = {
    label: string;
    value: string | number;
    sub: string;
  };

  const transformedRows = useMemo(() => {
    if (!transactionHistory?.total_transactions) {
      return []; // return empty
    }

    const baseTransactions = transactionHistory?.transactions || [];

    return baseTransactions
      .map((transaction: Transactions, idx: number) => ({
        id: idx, // temporary TOOD: replace with UUID for uniqueness
        transactionID: transaction?.transaction_id ?? 'Unknown',
        createdBy: transaction?.created_by ?? 'Unknown',
        soldAt: transaction?.sold_at ?? 'Unknown',
        quantity: transaction?.items_in_transaction ?? 0,
        totalPrice: transaction?.overall_transaction_amount ?? 0,
        items: transaction?.items ?? [], // Sales type from TransactionHistory
      }))
      .filter((row) => {
        const searchLower = searchTerm.toLowerCase().trim();

        // --- 1. Text Search Logic ---
        // If no search term, this is ALWAYS true.
        // If there is a term, it must match ID or Creator.
        const matchesSearch =
          !searchLower ||
          String(row.transactionID).toLowerCase().includes(searchLower) ||
          String(row.createdBy).toLowerCase().includes(searchLower);

        // --- 2. Date Range Logic ---
        const rowDate = new Date(row.soldAt);

        // If no 'from' date, this is ALWAYS true.
        const matchesFrom = !dateSearch?.from || rowDate >= dateSearch.from;

        // If no 'to' date, this is ALWAYS true.
        const matchesTo = !dateSearch?.to || rowDate <= dateSearch.to;

        // --- 3. The Combined "Gate" ---
        // The row only stays if it matches the Search AND the Date Range.
        return matchesSearch && matchesFrom && matchesTo;
      });
  }, [transactionHistory?.transactions, searchTerm, dateSearch]);

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

  const [transactionData, setTransactionData] = useState<
    SalesTransactionPayload | undefined
  >();
  const { onOpen } = useTransactionTicket();

  // Define Transformed type
  interface transformedItemsType {
    inventory: string;
    product_name: string;
    unit_price: number;
    quantity: number;
    total_price: number;
  }

  const handleShowReceipt = (
    transactionID: string,
    sold_at: string,
    items: Sales[],
  ) => {
    // Payload is untranformed | partial

    // Set CreatedBy name --
    const createdBy = items[0]?.created_by?.name; // Always the createdby here are designed to be the same

    // Transform payload?.items to items: Sales Type
    const transformedItems = items.reduce((acc, item) => {
      const newObject = {
        inventory: item?.inventory?.id,
        product_name: item?.inventory?.product_name,
        unit_price: item?.inventory?.unit_price,
        quantity: item?.quantity,
        total_price: item?.total_price,
      };

      acc.push(newObject);

      return acc;
    }, [] as transformedItemsType[]);

    // Assign to Payload
    const payload = {
      sold_at: sold_at,
      transaction_id: transactionID,
      created_by_name: createdBy,
      items: transformedItems,
    };

    // set Data for transactionReceipt
    setTransactionData(payload);

    onOpen();
  };

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
      renderCell: (params) => {
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
        const { id, transactionID, soldAt, items } = params.row;

        return (
          <div className="flex items-center justify-start gap-2 h-full">
            <Tooltip title="View Transaction" arrow>
              <Button
                aria-label={`View Details for ${id}`}
                variant="outlined"
                sx={actionButtonSx('--accent-primary')}
                onClick={() => handleShowReceipt(transactionID, soldAt, items)}
              >
                <icons.show size={16} />
              </Button>
            </Tooltip>

            <Tooltip title="Cancel Transaction" arrow>
              <Button
                aria-label={`Delete record ${id}`}
                variant="outlined"
                sx={actionButtonSx('--accent-negative')}
                onClick={() => alert(`Initiate refund/delete for: ${id}`)}
              >
                <icons.cancel size={16} />
              </Button>
            </Tooltip>
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
      setSearchTerm(searchTerm);
    }, 500);
  };

  const handleDateFilter = () => {
    const { from, to } = getSelectedDates();

    if (!from) {
      showSnackbar('Please select a date!', { variant: 'error' });
    }

    // from &&
    //   alert(
    //     `Date: ${format(from, 'MMM dd, yyyy')} - ${format(
    //       to ?? from,
    //       'MMM dd, yyyy',
    //     )} }`,
    //   );

    // Set 'to' date to 23:59:59 so it includes the whole day
    const adjustedTo = to
      ? new Date(new Date(to).setHours(23, 59, 59, 999))
      : null;

    setDateSearch({
      from: from,
      to: adjustedTo,
    });

    handleSearch('');
  };

  const handleClearDateFilter = () => {
    setDateSearch({
      from: null,
      to: null,
    });

    handleClearDate();
    handleSearch('');
  };
  return (
    <CardContainer
      title="Sales History"
      className="relative sales-history flex-1 min-w-0 min-h-185 mt-7"
      info="Transaction log synced with tenant inventory."
      customFunction={
        <div className="flex flex-row gap-2">
          {[
            {
              name: 'Apply Date Filter',
              fn: handleDateFilter,
              sx: {
                mainBg: 'var(--accent-positive)',
                hoverBg: 'var(--accent-positive-hover)',
              },
            },
            {
              name: 'Clear Date Filter',
              fn: handleClearDateFilter,
              sx: {
                mainBg: 'var(--accent-negative)',
                hoverBg: 'var(--accent-negative-hover)',
              },
              disabled: !dateSearch,
            },
          ].map((item) => (
            <Button
              disabled={item?.name === 'Clear Date Filter' && item?.disabled}
              key={item?.name}
              onClick={item?.fn}
              className="w-50"
              sx={{
                color: 'var(--invert-text)',
                backgroundColor: item?.sx?.mainBg,
                '&:hover': {
                  backgroundColor: item?.sx?.hoverBg,
                  color: 'var(--invert-text)',
                },
                minWidth: 150,
              }}
            >
              {item?.name}
            </Button>
          ))}
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

      {transactionHistoryRefetching && (
        <div className="absolute right-8 top-50 z-99">
          <div className="flex flex-row items-center gap-2">
            <Typography variant="caption">Refetching</Typography>
            <CircularProgress sx={{ color: 'var(--main-text)' }} size={10} />
          </div>
        </div>
      )}

      <DynamicDataGrid
        columns={columns}
        rows={transformedRows ?? []}
        loading={
          transactionHistoryLoading && transactionHistoryStatus === 'pending'
        }
        minHeight={500}
        className="sales-data-grid"
      />
      <TransactionReceipt data={transactionData} />
    </CardContainer>
  );
};

export default SalesHistory;
