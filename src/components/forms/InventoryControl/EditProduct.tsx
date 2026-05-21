import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { icons } from '../../../lib/constants/icons';
import { OTHERS } from '../../../lib/constants/variables';
import { DropDownProps } from '../../../lib/helpers/dropdown-props';
import { useEditProduct } from '../../../lib/hooks/useInventory';
import { useSalesFormOptions } from '../../../lib/hooks/useSales';
import type { EditProductType } from '../../../lib/types/inventory-type';
import DynamicModal from '../../common/DynamicModal';
import TruncatedText from '../../common/TruncatedText';
import { Typography } from '../../common/Typography';
import CreateCategoryForm from '../AddInventoryForm/CreateCategoryForm';

type Props = {
  data: EditProductType;
  onClose: () => void;
};

const EditProduct = ({ data, onClose }: Props) => {
  const [formData, setFormData] = useState<EditProductType>({
    id: data.id,
    product_name: data.product_name,
    category: data.category,
  });

  const { mutate: editProduct, isPending: editProductLoading } = useEditProduct(
    { onClose },
  );

  const { data: salesFormOptions, isLoading: salesFormOptionsLoading } =
    useSalesFormOptions();

  const dropDownConfig = DropDownProps(salesFormOptionsLoading);

  const categoryOptions = useMemo(() => {
    const rawCategory = salesFormOptions?.categories?.map((category) => {
      return {
        id: category?.id,
        name: category?.name,
      };
    });

    rawCategory?.push({
      id: 'others',
      name: 'Others (Create new unique category)',
    });

    return rawCategory;
  }, [salesFormOptions?.categories]);

  const [othersModalOpen, setOthersModalOpen] = useState(false);

  const handleOthersModalOpen = () => {
    setOthersModalOpen(true);
  };
  const handleOthersModalClose = () => {
    setOthersModalOpen(false);
  };

  // Derived state for changes
  const isUnchanged = JSON.stringify(data) === JSON.stringify(formData);

  const handleInputChange =
    (field: keyof EditProductType) =>
    (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUnchanged || !salesFormOptions?.categories) return;

    const category = salesFormOptions?.categories?.find((item) => {
      if (item.name.toLowerCase() === formData?.category?.toLowerCase()) {
        return item;
      }
    });

    console.log(category);

    // Gate keeper if no id return
    if (!category) return;

    const payload = {
      id: formData.id,
      product_name: formData.product_name,
      category: category.id,
    };

    editProduct(payload);
  };

  // Button Configuration Array
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
      label: 'Save Changes',
      loading: editProductLoading,
      type: 'submit' as const,
      disabled: isUnchanged || salesFormOptionsLoading,
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
      '&.Mui-focused fieldset': { borderColor: 'var(--accent-positive)' },
    },
    '& .MuiSelect-select': { color: 'var(--main-text)' },
    '& .MuiSvgIcon-root': { color: 'var(--sidebar-muted)' }, // Dropdown arrow color
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
          className="text-[var(--accent-positive)]"
        >
          Product Management
        </Typography>
        <Typography variant="h4" weight={700}>
          Edit Basic Details
        </Typography>
      </header>

      <Box className="space-y-5">
        {/* Product Name */}
        <FormControl fullWidth className="space-y-2">
          <Typography
            variant="body-sm"
            weight={600}
            className="text-[var(--sidebar-muted)]"
          >
            Product Name
          </Typography>
          <TextField
            required
            fullWidth
            value={formData.product_name}
            onChange={handleInputChange('product_name')}
            sx={inputStyles}
          />
        </FormControl>

        {/* Category Select */}
        <FormControl fullWidth className="space-y-2">
          <Typography
            variant="body-sm"
            weight={600}
            className="text-[var(--sidebar-muted)]"
          >
            Category
          </Typography>
          <Select
            fullWidth
            displayEmpty
            required
            value={formData?.category}
            MenuProps={{
              PaperProps: {
                className: 'themed-scrollbar',
                style: {
                  maxHeight: 200, // This replaces your max-h-50
                  width: 250,
                },
              },
            }}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography className="text-(--main-text) opacity-[0.5]">
                    Select a category
                  </Typography>
                );
              }
              return selected;
            }}
            onChange={(event: SelectChangeEvent) => {
              if (event.target.value === OTHERS) {
                return handleOthersModalOpen();
              }
              setFormData({
                ...formData,
                category: event.target.value,
              });
            }}
            disabled={dropDownConfig?.loading}
            IconComponent={dropDownConfig?.IconComponent}
            input={dropDownConfig?.input}
          >
            {categoryOptions?.map((item) => (
              <MenuItem key={item?.id} value={item?.name}>
                <TruncatedText text={item?.name} maxLength={15} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Action Buttons Mapping */}
      <Box className="flex gap-3 pt-4">
        {sxButtonConfigs.map((btn, index) => (
          <Button
            key={index}
            loading={btn.loading}
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
      <DynamicModal
        title="Add New Category"
        open={othersModalOpen}
        onClose={handleOthersModalClose}
        children={
          <CreateCategoryForm
            existingCategories={categoryOptions || []}
            handleClose={handleOthersModalClose}
            others={OTHERS}
          />
        }
      />
    </Box>
  );
};

export default EditProduct;
