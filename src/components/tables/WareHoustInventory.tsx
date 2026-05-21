import { Button, Tooltip } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { useRef, useState } from 'react';
import { icons } from '../../lib/constants/icons';
import { cn } from '../../lib/helpers/cn';
import {
  type ControlInventoryProps,
  type EditProductType,
} from '../../lib/types/inventory-type';
import type {
  TransformedHealthItems,
  TransformedWareHouseType,
} from '../../lib/types/warehouse-inventory-type';
import { dateMonthDayTimeFormatter } from '../../lib/utils/dateMonthDayTimeFormatter';
import CardContainer from '../common/CardContainer';
import DynamicDataGrid from '../common/DynamicDataGrid';
import DynamicModal from '../common/DynamicModal';
import { Typography } from '../common/Typography';
import SearchBar from '../filters/SearchBar';
import { EditProduct } from '../forms/InventoryControl';
import StockAdjustment from '../forms/InventoryControl/StockAdjustment';

type InventoryStatus = 'Healthy' | 'Low' | 'Empty';

interface WareHouseInventoryProps {
  data?: TransformedHealthItems | null;
  loading?: boolean;
}

const WareHouseInventory = ({ data, loading }: WareHouseInventoryProps) => {
  const [activeStatus, setActiveStatus] = useState<InventoryStatus>('Healthy');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [onOpenStockAdjustment, setOpenStockAdjustment] = useState(false);
  const [onOpenEditProduct, setOpenEditProduct] = useState(false);

  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract'>();
  const [inventoryItem, setInventoryItem] = useState<ControlInventoryProps>({
    id: '',
    product_name: '',
    unit_price: 0,
    stock_quantity: 0,
    max_quantity: 0,
    reorder_threshold: 0,
    category: '',
  });

  const [editProduct, setEditProduct] = useState<EditProductType>({
    id: '',
    product_name: '',
    category: '',
  });

  const handleCloseStockAdjustment = () => {
    setOpenStockAdjustment(false);
  };

  const handleCloseEditProduct = () => {
    setOpenEditProduct(false);
  };

  const handleOpenStockAdjustment = ({ ...props }: ControlInventoryProps) => {
    setInventoryItem({
      id: props.id,
      product_name: props.product_name,
      unit_price: props.unit_price,
      stock_quantity: props.stock_quantity,
      max_quantity: props.max_quantity,
      reorder_threshold: props.reorder_threshold,
      category: props.category,
    });

    setOpenStockAdjustment(true);
  };

  const handleOpenEditProduct = ({ ...props }: ControlInventoryProps) => {
    setEditProduct({
      id: props.id,
      product_name: props.product_name,
      category: props.category,
    });
    setOpenEditProduct(true);
  };

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

  const buttonProps = [
    {
      id: 'add',
      label: `Add stock for ID`,
      accent: '--accent-positive',
      icon: <icons.plus size={16} />,
      toolTip: 'Add Quantity',
      action: ({ ...props }: ControlInventoryProps) => {
        setAdjustmentType('add');
        handleOpenStockAdjustment(props);
      },
    },
    {
      id: 'sub',
      label: ``,
      accent: '--accent-negative',
      icon: <icons.minus size={16} />,
      toolTip: 'Subtract Quantity',
      action: ({ ...props }: ControlInventoryProps) => {
        setAdjustmentType('subtract');
        handleOpenStockAdjustment(props);
      },
    },
    {
      id: 'edit',
      label: `Edit product ID`,
      accent: '--accent-primary',
      icon: <icons.edit size={16} />,
      toolTip: 'Edit Inventory',
      action: ({ ...props }: ControlInventoryProps) =>
        handleOpenEditProduct(props),
    },
  ];

  const columns: GridColDef[] = [
    { field: 'productName', headerName: 'Product Name', flex: 2 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'currentStock', headerName: 'Current Stock', flex: 0.5 },
    { field: 'maxQuantity', headerName: 'Max Quantity', flex: 0.5 },
    { field: 'reorderThreshold', headerName: 'Re-order Threshold', flex: 0.5 },
    { field: 'unitPrice', headerName: 'Unit Price', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      flex: 1.5,
      renderCell: (params) => {
        const date = dateMonthDayTimeFormatter(new Date(params.value));

        return date.toLocaleString();
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.5,
      renderCell: (params: any) => {
        const {
          id,
          productName,
          currentStock,
          maxQuantity,
          unitPrice,
          reorderThreshold,
          category,
        } = params.row;

        const product = {
          id: id,
          product_name: productName,
          stock_quantity: currentStock,
          max_quantity: maxQuantity,
          unit_price: unitPrice,
          reorder_threshold: reorderThreshold,
          category: category,
        };

        return (
          <div className="flex items-center justify-start gap-2 p-2">
            {buttonProps.map((item, index) => (
              <Tooltip title={item?.toolTip} arrow>
                <Button
                  key={index}
                  aria-label={`${item.label}: ${id}`}
                  variant="outlined"
                  sx={actionButtonSx(item.accent)}
                  onClick={() => item.action(product)}
                >
                  {item.icon}
                </Button>
              </Tooltip>
            ))}
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

  const handleSearch = (text: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(text);
    }, 500);
  };

  return (
    <>
      <CardContainer
        title="Warehouse Inventory"
        className="warehouse-inventory flex-1 min-w-0 min-h-165"
        info="Provides a structured view of warehouse stock levels.
Enables monitoring of inventory thresholds and supports direct quantity adjustments through add, subtract, and inline modification actions."
        customFunction={
          <div className="flex flex-end min-w-100">
            <SearchBar onChange={handleSearch} />
          </div>
        }
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
        <DynamicModal
          title="Stock Adjustment"
          open={onOpenStockAdjustment}
          onClose={handleCloseStockAdjustment}
          children={
            <>
              <StockAdjustment
                data={inventoryItem}
                type={adjustmentType ?? 'add'}
                onClose={handleCloseStockAdjustment}
              />
            </>
          }
        />
        <DynamicModal
          title="Edit Product"
          open={onOpenEditProduct}
          onClose={handleCloseEditProduct}
          children={
            <>
              <EditProduct
                data={editProduct}
                onClose={handleCloseEditProduct}
              />
            </>
          }
        />
      </CardContainer>
    </>
  );
};

export default WareHouseInventory;
