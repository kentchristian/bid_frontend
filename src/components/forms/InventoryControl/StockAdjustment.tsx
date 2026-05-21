// Restock & Deduct Control
import { Box, Button, FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
import { icons } from '../../../lib/constants/icons';
import { useInboundOutboundAdjustment } from '../../../lib/hooks/useInventory';
import type { ControlInventoryProps } from '../../../lib/types/inventory-type';
import { Typography } from '../../common/Typography';

type Props = {
  data: ControlInventoryProps;
  type: 'add' | 'subtract';
  onClose: () => void;
};

const StockAdjustment = ({ data, type, onClose }: Props) => {
  const { mutate: adjustments, isPending: adjustmentsLoading } =
    useInboundOutboundAdjustment({ onClose });
  // API Fetch

  const [formData, setFormData] = useState<ControlInventoryProps>({ ...data });

  // Add this inside your component, before the sxButtonConfigs
  const isUnchanged = JSON.stringify(data) === JSON.stringify(formData);

  const isAdd = type === 'add';

  const handleInputChange =
    (field: keyof ControlInventoryProps) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === '' ? '' : parseFloat(e.target.value);
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { category, ...payload } = formData;

    adjustments(payload);
  };

  const sxButtonConfigs = [
    {
      label: 'Cancel',
      type: 'button' as const,
      onClick: onClose,
      startIcon: <icons.close size={18} />,
      sx: {
        bgcolor: 'var(--accent-negative)',
        color: 'var(--invert-text)',
        flex: 1,
        '&:hover': { bgcolor: 'var(--accent-negative-hover)' },
      },
    },
    {
      label: isAdd ? 'Confirm Restock' : 'Confirm Deduction',
      loading: adjustmentsLoading,
      type: 'submit' as const,
      disabled: adjustmentsLoading || isUnchanged,
      startIcon: <icons.save size={18} />,
      sx: {
        bgcolor: 'var(--accent-positive)',
        color: 'var(--invert-text)',
        flex: 2,
        '&:hover': { bgcolor: 'var(--accent-positive-hover)' },
        '&.Mui-disabled': {
          bgcolor: 'var(--sidebar-border)',
          color: 'var(--sidebar-muted)',
        },
      },
    },
  ];

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      color: 'var(--main-text)',
      backgroundColor: 'var(--sidebar-bg)',
      borderRadius: '8px',
      '& fieldset': { borderColor: 'var(--card-border)' },
      '&.Mui-focused fieldset': {
        borderColor: isAdd
          ? 'var(--accent-positive)'
          : 'var(--accent-negative)',
      },
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      className="p-8 rounded-xl space-y-8 max-w-md mx-auto"
      sx={{ bgcolor: 'var(--card)', border: '1px solid var(--card-border)' }}
    >
      <header className="space-y-1 text-left">
        <Typography
          variant="overline"
          className={
            isAdd
              ? 'text-[var(--accent-positive)]'
              : 'text-[var(--accent-negative)]'
          }
        >
          {isAdd ? 'Inbound Adjustment' : 'Outbound Adjustment'}
        </Typography>
        <Typography variant="h4" weight={700}>
          {`Product: ${data.product_name}`}
        </Typography>
      </header>

      <Box className="space-y-5">
        {/* Current Stock */}
        <FormControl fullWidth className="space-y-2">
          <Typography
            variant="body-sm"
            weight={600}
            className="text-[var(--sidebar-muted)]"
          >
            Current Stock Level
          </Typography>
          <TextField
            required
            type="number"
            value={formData.stock_quantity}
            onChange={handleInputChange('stock_quantity')}
            sx={inputStyles}
            inputProps={{
              min: isAdd ? data.stock_quantity : 0,
              max: !isAdd && data.stock_quantity,
            }}
          />
        </FormControl>

        {/* Max Capacity */}
        <FormControl fullWidth className="space-y-2">
          <Typography
            variant="body-sm"
            weight={600}
            className="text-[var(--sidebar-muted)]"
          >
            Maximum Storage Capacity
          </Typography>
          <TextField
            required
            type="number"
            value={formData.max_quantity}
            onChange={handleInputChange('max_quantity')}
            sx={inputStyles}
            inputProps={{
              min: isAdd ? data.max_quantity : 0,
              max: !isAdd && data.max_quantity,
            }}
          />
        </FormControl>

        {/* Dual Column Row */}
        <Box className="flex gap-4">
          <FormControl fullWidth className="space-y-2">
            <Typography
              variant="body-sm"
              weight={600}
              className="text-[var(--sidebar-muted)]"
            >
              Re-order At
            </Typography>
            <TextField
              required
              type="number"
              value={formData.reorder_threshold}
              onChange={handleInputChange('reorder_threshold')}
              sx={inputStyles}
              inputProps={{
                min: isAdd ? data.reorder_threshold : 0,
                max: !isAdd && data.reorder_threshold,
              }}
            />
          </FormControl>

          <FormControl fullWidth className="space-y-2">
            <Typography
              variant="body-sm"
              weight={600}
              className="text-[var(--sidebar-muted)]"
            >
              Unit Price ($)
            </Typography>
            <TextField
              required
              type="number"
              value={formData.unit_price}
              onChange={handleInputChange('unit_price')}
              sx={inputStyles}
              inputProps={{
                step: 0.01,
                min: isAdd ? data.unit_price : 0,
                max: !isAdd && data.unit_price,
              }}
            />
          </FormControl>
        </Box>
      </Box>

      <Box className="flex gap-3 pt-4">
        {sxButtonConfigs.map((btn, index) => (
          <Button
            loading={btn.loading}
            key={index}
            variant="contained"
            type={btn.type}
            onClick={btn.onClick}
            disabled={btn.disabled}
            startIcon={btn.startIcon}
            sx={{
              ...btn.sx,
              textTransform: 'none',
              py: 1.5,
              borderRadius: '10px',
            }}
            disableElevation
          >
            {btn.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default StockAdjustment;
