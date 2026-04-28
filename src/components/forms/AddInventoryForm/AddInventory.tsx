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

import DynamicModal from '../../common/DynamicModal';
import { Typography } from '../../common/Typography';
import CreateCategoryForm from './CreateCategoryForm';

interface AddInventoryProps {
  onClose: () => void;
}

const AddInventory = ({ onClose }: AddInventoryProps) => {
  const { data: salesFormOptions, isLoading: salesFormOptionsLoading } =
    useSalesFormOptions();

  const [addInventoryForm, setAddInventoryForm] = useState({
    category: '',
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

  return (
    <CardContainer className="w-150 max-h-[80vh] shadow-none border-none flex flex-col overflow-hidden overscroll-contain">
      <form
        onSubmit={(e) => e.preventDefault()} // Ensure form has a handler
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
                    {item?.name}
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
                <TextField type="number" required sx={{ width: 125 }} />
              </FormControl>
              <FormControl>
                <FormLabel className="text-(--main-text) mb-1">
                  Max Quantity
                </FormLabel>
                <TextField type="number" required sx={{ width: 125 }} />
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
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* ACTIONS */}
        <div className="mt-5 flex shrink-0 justify-end gap-2 p-2">
          {sxButtonConfigs.map((item, index) => (
            <Button
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

        <DynamicModal
          title="Add New Category"
          open={othersModalOpen}
          onClose={handleOthersModalClose}
          children={
            <CreateCategoryForm
              existingCategories={categoryOptions || []}
              onClose={handleOthersModalClose}
              others={OTHERS}
            />
          }
        />
      </form>
    </CardContainer>
  );
};

export default AddInventory;
