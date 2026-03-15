import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface DynamicDataGridProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
}

const DynamicDataGrid = ({ columns, rows, loading }: DynamicDataGridProps) => {
  return (
    <div style={{ width: '100%', height: 500, minWidth: 0 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        sx={{ minWidth: 0 }}
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
