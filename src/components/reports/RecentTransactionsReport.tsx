import { useMemo } from 'react';
import { useRecentTransactionsReport } from '../../lib/hooks/useReports';
import { formatLongDate } from '../../lib/utils/formatLongDate';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';
import { Typography } from '../common/Typography';

export const RecentTransactionsReport = () => {
  const {
    data: recentTransactions,
    isLoading: recentTransactionsLoading,
    status: recentTransactionsStatus,
    // isRefetching: transactionHistoryRefetching,
  } = useRecentTransactionsReport();

  const columns = [
    {
      field: 'id',
      headerName: 'Transaction ID',
      className: 'font-semibold text-blue-600',
      flex: 0.8,
    },
    { field: 'dateTime', headerName: 'Date/Time', flex: 0.7 },
    { field: 'createdBy', headerName: 'Created By', flex: 0.5 },
    { field: 'items', headerName: 'Items' },
    { field: 'total', headerName: 'Total Price', className: 'font-semibold' },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: (value: string) => (
    //     <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-[color:var(--accent-positive)]">
    //       {value}
    //     </span>
    //   ),
    // },
  ];

  const transformedRows = useMemo(() => {
    return recentTransactions?.map((item) => {
      return {
        id: item?.transaction_id || '--',
        dateTime: formatLongDate(item?.sold_at) || '--',
        createdBy: item?.employee || 'Unknown',
        items: item?.items || 0,
        total: item?.total_price || 0,
      };
    });
  }, [recentTransactions]);

  return (
    <CardContainer
      title="Recent Transactions"
      className="min-h-72 p-4 shadow-sm"
    >
      <DynamicDataGrid
        columns={columns}
        rows={transformedRows || []}
        minHeight={350}
        loading={
          recentTransactionsLoading && recentTransactionsStatus === 'pending'
        }
      />

      <Typography
        variant="caption"
        className="mt-3 text-right text-[color:var(--sidebar-muted)]"
      >
        Synced from the latest completed transactions.
      </Typography>
    </CardContainer>
  );
};
