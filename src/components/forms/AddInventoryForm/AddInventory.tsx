import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { icons } from '../../../lib/constants/icons';
import { useSalesFormOptions } from '../../../lib/hooks/useSales';
import CardContainer from '../../common/CardContainer';

import { useAddNewInventory } from '../../../lib/hooks/useInventory';
import type { AddInventoryType } from '../../../lib/types/inventory-type';
import DynamicModal from '../../common/DynamicModal';
import TruncatedText from '../../common/TruncatedText';
import { Typography } from '../../common/Typography';
import CreateCategoryForm from './CreateCategoryForm';

interface AddInventoryProps {
  onClose: () => void;
}

const AddInventory = ({ onClose }: AddInventoryProps) => {
  const { data: salesFormOptions, isLoading: salesFormOptionsLoading } =
    useSalesFormOptions();

  const { mutate: addNewInventory, isPending: addNewInventoryLoading } =
    useAddNewInventory({ onClose });

  type AddInventoryFormType = {
    id?: string;
    productName: string;
    category: string;
    currentStock: number | null;
    maxQuantity: number | null;
    reOrderThreshold: number | null;
    unitPrice: number | null;
  };
  const [addInventoryForm, setAddInventoryForm] =
    useState<AddInventoryFormType>({
      productName: '',
      category: '',
      currentStock: null,
      maxQuantity: null,
      reOrderThreshold: null,
      unitPrice: null,
    });

  const [othersModalOpen, setOthersModalOpen] = useState(false);

  // const [imageName, setImageName] = useState<string>('');
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     setImageName(e.target.files[0].name);
  //   }
  // };

  const handleOthersModalOpen = () => {
    setOthersModalOpen(true);
  };
  const handleOthersModalClose = () => {
    setOthersModalOpen(false);
  };

  const DropDownProps = {
    IconComponent: salesFormOptionsLoading ? () => null : undefined,
    input: (
      <OutlinedInput
        endAdornment={
          salesFormOptionsLoading ? (
            <CircularProgress color="inherit" size={20} sx={{ mr: 2 }} />
          ) : null
        }
      />
    ),
    loading: salesFormOptionsLoading,
  };

  // Transform Category Options
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

  const sxButtonConfigs = [
    {
      label: 'Cancel',
      type: 'button',
      onClick: onClose,
      sx: {
        bgcolor: 'var(--accent-negative)',
        color: 'var(--invert-text)',
        '&:hover': {
          bgcolor: 'var(--accent-negative-hover)',
          color: 'var(--invert-text)',
        },
      },
    },
    {
      label: 'Add to Inventory',
      loading: addNewInventoryLoading,
      type: 'submit',
      startIcon: <icons.save />,
      // onClick: () => {
      //   alert('Saving to Django backend...');
      //   // onClose();
      // },
      sx: {
        bgcolor: 'var(--accent-positive)',
        color: 'var(--invert-text)',
        '&:hover': {
          bgcolor: 'var(--accent-positive-hover)',
          color: 'var(--invert-text)',
        },
      },
    },
  ];

  // OTHERS add
  const OTHERS = 'Others (Create new unique category)';

  const handleClearForm = () => {
    // Clear Form
    setAddInventoryForm({
      productName: '',
      category: '',
      currentStock: null,
      maxQuantity: null,
      reOrderThreshold: null,
      unitPrice: null,
    });
  };
  const handleAddNewInventorySubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    // Set Unique V4 on Submit TODO: use for Idempotent Implementation later
    // setAddInventoryForm({ ...addInventoryForm, id: uuidv4() });

    // transform payload
    const payload: AddInventoryType = {
      product_name: addInventoryForm?.productName,
      stock_quantity: addInventoryForm?.currentStock ?? 0,
      max_quantity: addInventoryForm?.maxQuantity ?? 0,
      reorder_threshold: addInventoryForm?.reOrderThreshold ?? 0,
      unit_price: addInventoryForm?.unitPrice ?? 0,
    };

    addNewInventory(payload);

    // return clear when success
    handleClearForm();
  };
  return (
    <CardContainer className="w-150 max-h-[80vh] shadow-none border-none flex flex-col overflow-hidden overscroll-contain">
      <form
        onSubmit={handleAddNewInventorySubmit} // Ensure form has a handler
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden themed-scrollbar-always overscroll-contain"
      >
        <Grid container spacing={2}>
          {/* SECTION 1: IDENTITY */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <FormLabel className="text-(--main-text) mb-1 font-semibold">
                Product Name
              </FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Product Name"
                required
                value={addInventoryForm?.productName}
                onChange={(e) => {
                  setAddInventoryForm({
                    ...addInventoryForm,
                    productName: e.target.value,
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  position: 'static', // Prevents it from trying to float
                  transform: 'none', // Ensures it stays in place
                  color: 'inherit', // Keeps your custom class color
                  '&.Mui-focused': {
                    color: 'var(--main-text)', // Prevents color change on click
                  },
                }}
              >
                Category
              </FormLabel>
              <Select
                fullWidth
                displayEmpty
                required
                value={addInventoryForm?.category}
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
                  setAddInventoryForm({
                    ...addInventoryForm,
                    category: event.target.value,
                  });
                }}
                disabled={DropDownProps?.loading}
                IconComponent={DropDownProps?.IconComponent}
                input={DropDownProps?.input}
              >
                {categoryOptions?.map((item) => (
                  <MenuItem key={item?.id} value={item?.name}>
                    <TruncatedText text={item?.name} maxLength={15} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* SECTION 2: LOGISTICS */}
          <Grid size={12}>
            <Divider textAlign="left" sx={{ my: 1 }}>
              <Typography
                variant="caption"
                className="text-(--main-text) font-bold"
              >
                STOCK CONTROL
              </Typography>
            </Divider>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={2}>
              <FormControl>
                <FormLabel className="text-(--main-text) mb-1">
                  Current Stock
                </FormLabel>
                <TextField
                  type="number"
                  required
                  sx={{ width: 125 }}
                  value={addInventoryForm?.currentStock}
                  onChange={(e) => {
                    const value = Math.floor(Number(e.target.value));

                    setAddInventoryForm({
                      ...addInventoryForm,
                      currentStock: value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel className="text-(--main-text) mb-1">
                  Max Quantity
                </FormLabel>
                <TextField
                  type="number"
                  required
                  sx={{ width: 125 }}
                  value={addInventoryForm?.maxQuantity}
                  slotProps={{
                    htmlInput: {
                      min: addInventoryForm?.currentStock, // Optional: prevent negative numbers
                    },
                  }}
                  onChange={(e) => {
                    const value = Math.floor(Number(e.target.value));

                    setAddInventoryForm({
                      ...addInventoryForm,
                      maxQuantity: value,
                    });
                  }}
                />
              </FormControl>
            </Stack>
          </Grid>
          {/* SECTION 3: FINANCIALS */}
          <Grid size={12}>
            <Divider textAlign="left" sx={{ my: 1 }}>
              <Typography
                variant="caption"
                className="text-(--main-text) font-bold"
              >
                PRICING
              </Typography>
            </Divider>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <FormLabel className="text-(--main-text) mb-1">
                Re-order Threshold
              </FormLabel>
              <TextField
                fullWidth
                type="number"
                required
                slotProps={{
                  htmlInput: {
                    min: (addInventoryForm?.currentStock ?? 0) * 0.25, // Optional: prevent negative numbers
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <icons.warning
                        size={16}
                        color="var(--accent-warning)"
                        style={{ marginRight: 8 }}
                      />
                    </InputAdornment>
                  ),
                }}
                value={addInventoryForm?.reOrderThreshold}
                onChange={(e) => {
                  const value = Math.floor(Number(e.target.value));

                  setAddInventoryForm({
                    ...addInventoryForm,
                    reOrderThreshold: value,
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <FormLabel className="text-(--main-text) mb-1">
                Unit Price
              </FormLabel>
              <TextField
                fullWidth
                type="number"
                placeholder="0.00"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₱</InputAdornment>
                  ),
                }}
                required
                value={addInventoryForm?.unitPrice}
                onChange={(e) => {
                  const value = Math.round(Number(e.target.value) * 100) / 100;

                  setAddInventoryForm({
                    ...addInventoryForm,
                    unitPrice: value,
                  });
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* ACTIONS */}

        <div className="flex flex-row items-center justify-between mt-5 shrink-0">
          <Button
            // variant={'contained'}
            onClick={handleClearForm}
            sx={{
              color: 'var(--main-text)',
            }}
          >
            Clear
          </Button>
          <div className="gap-2  flex flex-row">
            {sxButtonConfigs.map((item, index) => (
              <Button
                loading={item?.loading}
                key={index}
                type={item.type as 'button' | 'submit'}
                variant={'contained'}
                onClick={item.onClick}
                startIcon={item.startIcon}
                sx={{
                  ...item.sx,
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

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
      </form>
    </CardContainer>
  );
};

export default AddInventory;
