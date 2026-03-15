import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { cn } from '../../lib/helpers/cn';

interface DynamicDataGridProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  className?: string;
}

const DynamicDataGrid = ({
  columns,
  rows,
  loading,
  className,
}: DynamicDataGridProps) => {
  return (
    <div className={cn('w-full min-w-0 flex-1 h-full', className)}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        sx={{ minWidth: 0, height: '100%' }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DynamicDataGrid;
