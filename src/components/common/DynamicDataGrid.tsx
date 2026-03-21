import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { cn } from '../../lib/helpers/cn';

interface DynamicDataGridProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  className?: string;
  minHeight?: number;
}

const DynamicDataGrid = ({
  columns,
  rows,
  loading,
  className,
  minHeight,
}: DynamicDataGridProps) => {
  return (
    <div
      className={cn(
        'data-grid-wrapper w-full min-w-0 flex-1 h-full',
        className,
      )}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        classes={{
          root: 'data-grid-native-scroll',
          virtualScroller: 'themed-scrollbar',
        }}
        sx={{
          height: minHeight,
          // border: 'none',
          '& .MuiDataGrid-footerContainer': {
            height: 70, // Your desired height
            minHeight: 70, // This is CRITICAL to override MUI defaults
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />
    </div>
  );
};

export default DynamicDataGrid;
