import type { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useStaffLeaderBoardReport } from '../../lib/hooks/useReports';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';

export const StaffLeaderboard = () => {
  const {
    data: staffLeaderboardData,
    isLoading: staffLeaderboardLoading,
    status: staffLeaderboardStatus,
    // isRefetching: transactionHistoryRefetching,
  } = useStaffLeaderBoardReport();

  const columns: GridColDef[] = [
    {
      field: 'name', // Or 'created_by' depending on your backend key mapping
      headerName: 'Created By',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => {
        const { avatar, name } = params.row;

        // Helper to get initials from the name
        const getInitials = (fullName) => {
          if (!fullName) return avatar || '';
          const parts = fullName.trim().split(/\s+/);
          if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
          return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        };

        return (
          <div className="flex items-center gap-2 h-full">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--sidebar-hover)] text-[10px] font-bold shrink-0 select-none">
              {getInitials(name)}
            </span>
            <span className="text-sm font-semibold truncate" title={name}>
              {name}
            </span>
          </div>
        );
      },
    },
    {
      field: 'transactions',
      headerName: 'Total Sales Transactions',
      type: 'number',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'revenue',
      headerName: 'Total Sales Revenue',
      type: 'number',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      cellClassName: 'font-semibold', // Matches your font-semibold layout wrapper
      // Optional: Add a valueFormatter here if revenue arrives as a raw number!
    },
  ];

  const transformedRows = useMemo(() => {
    return staffLeaderboardData?.staff_performance_leaderboard?.map((item) => {
      return {
        id: item?.staff_id || '--',
        name: item?.employee || '--',
        transactions: item?.total_transactions || 0,
        revenue: item?.total_sales_revenue || 0,
      };
    });
  }, [staffLeaderboardData]);

  return (
    <CardContainer
      title="Staff Performance Leaderboard"
      className="min-h-72 p-4 shadow-sm"
    >
      <div className="overflow-x-auto rounded-lg border border-[color:var(--card-border)]">
        <DynamicDataGrid
          columns={columns}
          rows={transformedRows || []}
          minHeight={350}
          loading={
            staffLeaderboardLoading && staffLeaderboardStatus === 'pending'
          }
        />
      </div>
    </CardContainer>
  );
};
