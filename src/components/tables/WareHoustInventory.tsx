import { Button } from '@mui/material';
import { useState } from 'react';
import { FiEdit2, FiMinus, FiPlus } from 'react-icons/fi';
import { cn } from '../../lib/helpers/cn';
import type {
  TransformedHealthItems,
  TransformedWareHouseType,
} from '../../lib/types/warehouse-inventory-type';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';
import { Typography } from '../common/Typography';

type InventoryStatus = 'Healthy' | 'Low' | 'Empty';

interface WareHouseInventoryProps {
  data?: TransformedHealthItems | null;
  loading?: boolean;
}

const WareHouseInventory = ({ data, loading }: WareHouseInventoryProps) => {
  const [activeStatus, setActiveStatus] = useState<InventoryStatus>('Healthy');

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
    { field: 'productName', headerName: 'Product Name', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'currentStock', headerName: 'Current Stock', flex: 1 },
    { field: 'maxQuantity', headerName: 'Max Quantity', flex: 1 },
    { field: 'reorderThreshold', headerName: 'Re-order Threshold', flex: 1 },
    { field: 'unitPrice', headerName: 'Unit Price', flex: 1 },
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

  const statusData: Record<InventoryStatus, TransformedWareHouseType[]> = {
    Healthy: data?.healthy_stock_items ?? [],
    Low: data?.low_stock ?? [],
    Empty: data?.empty_stock ?? [],
  };

  const statusTabs: Array<{
    key: InventoryStatus;
    label: string;
    caption: string;
  }> = [
    {
      key: 'Healthy',
      label: 'Healthy Items',
      caption: 'Plenty of stock available',
    },
    {
      key: 'Low',
      label: 'Low Stock Items',
      caption: 'Approaching reorder point',
    },
    {
      key: 'Empty',
      label: 'Out of Stock Items',
      caption: 'Needs immediate restock',
    },
  ];

  const statusStyles: Record<InventoryStatus, { dot: string; pill: string }> = {
    Healthy: {
      dot: 'bg-[color:var(--accent-positive)]',
      pill: 'border-[color:var(--accent-positive)] text-[color:var(--accent-positive)]',
    },
    Low: {
      dot: 'bg-orange-500',
      pill: 'border-orange-500 text-orange-500',
    },
    Empty: {
      dot: 'bg-[color:var(--accent-negative)]',
      pill: 'border-[color:var(--accent-negative)] text-[color:var(--accent-negative)]',
    },
  };

  const statusCounts: Record<InventoryStatus, number> = {
    Healthy: statusData.Healthy.length,
    Low: statusData.Low.length,
    Empty: statusData.Empty.length,
  };

  const filteredRows = statusData[activeStatus];

  return (
    <>
      <CardContainer
        title="Warehouse Inventory"
        className="warehouse-inventory flex-1 min-w-0 min-h-165"
        info="Provides a structured view of warehouse stock levels.
Enables monitoring of inventory thresholds and supports direct quantity adjustments through add, subtract, and inline modification actions."
        // customFunction={
        //   <Switch
        //     sx={{
        //       '& .MuiSwitch-switchBase.Mui-checked': {
        //         color: 'var(--accent-positive)', // thumb color
        //       },
        //       '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        //         backgroundColor: 'var(--accent-positive)', // track color
        //       },
        //     }}
        //   />
        // }
      >
        <div className="warehouse-status-tabs flex flex-col rounded-sm sm:flex-row mb-4 shadow-2xl">
          {statusTabs.map((tab) => {
            const isActive = activeStatus === tab.key;
            const styles = statusStyles[tab.key];

            return (
              <button
                card-border
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStatus(tab.key)}
                className={cn(
                  'rounded-sm hover:cursor-pointer w-150 flex-1 border border-(--card-border) px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)]',
                  isActive
                    ? 'bg-[color:var(--sidebar-bg)] shadow-sm'
                    : 'hover:bg-[color:var(--sidebar-bg)]',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn('h-2.5 w-2.5 rounded-full', styles.dot)}
                    />
                    <Typography
                      variant="h3"
                      className="text-[color:var(--main-text)]"
                    >
                      {tab.label}
                    </Typography>
                  </div>
                  <Typography
                    variant="caption"
                    className={cn(
                      'inline-flex items-center rounded-full border px-2 py-0.5',
                      styles.pill,
                    )}
                  >
                    {statusCounts[tab.key]}
                  </Typography>
                </div>
              </button>
            );
          })}
        </div>

        <DynamicDataGrid
          columns={columns}
          rows={filteredRows}
          loading={loading}
          minHeight={450}
          className="warehouse-data-grid"
        />
      </CardContainer>
    </>
  );
};

export default WareHouseInventory;
