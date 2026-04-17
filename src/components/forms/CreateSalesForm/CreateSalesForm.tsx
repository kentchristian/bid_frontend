import {
  Autocomplete,
  Avatar,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useState, type FormEvent } from 'react';
import { icons } from '../../../lib/constants/icons';
import { cn } from '../../../lib/helpers/cn';
import { useSalesFormOptions } from '../../../lib/hooks/useSalesFormOptions';
import { Typography } from '../../common/Typography';

export type CreateSalesLineItem = {
  id: number;
  product: string;
  category: string;
  unitPrice: number;
  qty: number;
};

type CreateSalesFormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const CreateSalesForm = ({ handleSubmit }: CreateSalesFormProps) => {
  // API Fetch
  const {
    data: salesFormOptions,
    isLoading: salesFormOptionsLoading,
    status: salesFormOptionsStatus,
  } = useSalesFormOptions();

  // DropDown Props STYLE
  const isSalesFormLoading =
    salesFormOptionsLoading && salesFormOptionsStatus === 'pending';
  const DropDownProps = {
    IconComponent: isSalesFormLoading ? () => null : undefined,
    input: (
      <OutlinedInput
        label="Sales Manager"
        endAdornment={
          isSalesFormLoading ? (
            <CircularProgress color="inherit" size={20} sx={{ mr: 2 }} />
          ) : null
        }
      />
    ),
    loading: isSalesFormLoading,
  };

  type SalesFormType = {
    transactionDate: Dayjs | null;
    soldBy: string;
    category: string;
    product: string;
    quantity: number;
  };

  // Constant Button Color
  const confirmButtonSx = {
    background: 'var(--accent-positive)',
    color: 'var(--invert-text)',
    '&:hover': {
      background: 'var(--accent-positive-hover)',
      color: 'var(--invert-text)',
    },
  };

  const [salesForm, setSalesForm] = useState<SalesFormType>({
    transactionDate: dayjs(),
    soldBy: '',
    category: '',
    product: '',
    quantity: 0,
  });

  const [lineItems, setLineItems] = useState<CreateSalesLineItem[]>([]);

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.unitPrice * item.qty,
    0,
  );
  const taxRate = 0.08;
  const tax = Number((subtotal * taxRate).toFixed(2));
  const total = subtotal + tax;
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const isToday = salesForm?.transactionDate?.isSame(dayjs(), 'day'); // present Day checker
  const isAddTolistDisabled =
    !salesForm.category || !salesForm.product || !salesForm.quantity;
  const isFinalTransaction =
    lineItems.length <= 0 || !salesForm.transactionDate || !salesForm.soldBy;

  const isProductDisabled = !salesForm.category;

  /* Quantity */
  const handleIncrement = () => {
    setSalesForm({ ...salesForm, quantity: salesForm?.quantity + 1 });
  };
  const handleDecrement = () => {
    setSalesForm({ ...salesForm, quantity: salesForm?.quantity - 1 });
  };

  /* Date Section */
  const DateSection = () => {
    return (
      <div className="flex-1">
        <Typography variant="h4" className="text-base text-(--main-text)">
          Transaction Details
        </Typography>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Transaction Date"
              value={salesForm?.transactionDate}
              onChange={(newValue) => {
                const dayjsValue = newValue ? dayjs(newValue) : null;
                setSalesForm({
                  ...salesForm,
                  transactionDate: dayjsValue,
                });
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,

                  error: !salesForm?.transactionDate,
                },
              }}
            />
          </LocalizationProvider>
          <Button
            disabled={isToday}
            variant="outlined"
            size="small"
            className="whitespace-nowrap"
            onClick={() => {
              setSalesForm({ ...salesForm, transactionDate: dayjs() });
            }}
          >
            Now
          </Button>
        </div>
      </div>
    );
  };

  /* Sold By Section */
  const SoldBySection = () => {
    return (
      <div className="flex-1">
        <Typography variant="body-sm" className="text-(--main-text)">
          Sold By
        </Typography>
        <div className="mt-2 flex items-center gap-2">
          <Avatar sx={{ width: 28, height: 28 }}>JD</Avatar>
          <FormControl fullWidth size="small">
            <InputLabel id="sold-by-label">Sales Manager</InputLabel>
            <Select
              labelId="sold-by-label"
              label="Sales Manager"
              defaultValue="john-doe"
              value={salesForm?.soldBy}
              onChange={(event: SelectChangeEvent) =>
                setSalesForm({
                  ...salesForm,
                  soldBy: event.target.value as string,
                })
              }
              disabled={DropDownProps?.loading}
              IconComponent={DropDownProps?.IconComponent}
              input={DropDownProps?.input}
            >
              {salesFormOptions?.users?.map((user) => (
                <MenuItem value={user?.id}>{user?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  };

  /* Category */
  const CategorySection = () => {
    return (
      <FormControl size="small" className="lg:w-56 w-full">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          defaultValue="all"
          value={salesForm?.category}
          onChange={(event: SelectChangeEvent) =>
            setSalesForm({ ...salesForm, category: event.target.value })
          }
          disabled={DropDownProps?.loading}
          IconComponent={DropDownProps?.IconComponent}
          input={DropDownProps?.input}
          sx={{
            color: 'var-(--main-text)',
          }}
        >
          {salesFormOptions?.categories?.map((category) => (
            <MenuItem value={category?.name}>{category?.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  /* ProductSection */
  const options = [
    { id: 1, product: 'Sample', quantityStock: 3, unitPrice: 3 },
    { id: 2, product: 'Sample3', quantityStock: 3, unitPrice: 6 },
  ];

  const transformedOptions = options.map((item) => {
    return item.product;
  });
  const ProductSection = () => {
    return (
      <Autocomplete
        disablePortal
        disabled={isProductDisabled}
        value={salesForm?.product}
        onChange={(_event, newValue: string | null) =>
          setSalesForm({ ...salesForm, product: newValue as string })
        }
        options={transformedOptions}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search / Select Product" />
        )}
        sx={{
          flexGrow: 1,
          color: 'var-(--main-text)',
          '& .MuiOutlinedInput-root': {
            height: 40, // match your other field
          },
          '& .MuiOutlinedInput-input': {
            padding: '0 14px',
          },
        }}
      />
    );
  };

  const handleAddLines = () => {
    // Find the unit price
    const foundItem = options.find((item) => {
      if (item.product === salesForm?.product) {
        return item.unitPrice ?? 0;
      }
    });

    // addLine
    const addLine: CreateSalesLineItem = {
      id: lineItems.length + 1,
      product: salesForm?.product,
      category: salesForm?.category,
      unitPrice: foundItem?.unitPrice ?? 0,
      qty: salesForm?.quantity,
    };

    // setLine
    setLineItems([...lineItems, addLine]);

    // Reset Items
    setSalesForm({
      ...salesForm,
      category: '',
      product: '',
      quantity: 0,
    });
  };

  const handleRemoveLine = (id: number) => {
    const updated = lineItems.filter((item) => item.id !== id);
    setLineItems(updated);
  };

  const handleClearForm = () => {
    // clear sales form
    setSalesForm({
      transactionDate: null,
      soldBy: '',
      category: '',
      product: '',
      quantity: 0,
    });

    // clear table
    setLineItems([]);
  };

  /* TableSection */
  const TableSection = () => {
    return (
      <div className="flex-1">
        <TableContainer
          component="div"
          className={cn(
            'max-h-50',
            'overflow-y-auto rounded-lg border border-gray-100',
            'z-9999 overscroll-contain',
            'themed-scrollbar',
          )}
        >
          <Table size="small" aria-label="sales line items">
            <TableHead>
              <TableRow className="bg-(--main-bg)">
                <TableCell>Product (Item)</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Unit Price (USD)</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Total Price (USD)</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lineItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell align="right">
                    {currency.format(item.unitPrice)}
                  </TableCell>
                  <TableCell align="right">{item.qty}</TableCell>
                  <TableCell align="right">
                    {currency.format(item.unitPrice * item.qty)}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => {
                      handleRemoveLine(item.id);
                    }}
                  >
                    <IconButton size="small" aria-label="remove item">
                      <icons.delete size={16} color="var(--accent-negative)" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <section className="rounded-xl border border-gray-200/70 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <DateSection />
          <SoldBySection />
        </div>
      </section>

      <section className="rounded-xl border border-gray-200/70 p-4">
        <div className="flex flex-col gap-3">
          <Typography variant="h4" className="text-base text-(--main-text)">
            Add Items
          </Typography>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <CategorySection />
            <ProductSection />

            <div className="flex items-end gap-2">
              <TextField
                label="Quantity"
                size="small"
                value={salesForm?.quantity}
                InputProps={{ readOnly: true }}
                sx={{ width: 110 }}
              />
              <div className="flex gap-1">
                <Button
                  disabled={salesForm?.quantity < 1}
                  variant="outlined"
                  size="small"
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleIncrement}
                >
                  +
                </Button>
              </div>
            </div>
            <Button
              variant="contained"
              disabled={isAddTolistDisabled}
              sx={confirmButtonSx}
              onClick={handleAddLines}
            >
              Add to List
            </Button>
            <Button disabled variant="outlined" className="whitespace-nowrap">
              Scan Barcode
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200/70 p-4">
        <Typography variant="h4" className="text-base text-(--main-text)">
          Sales Line Items
        </Typography>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row">
          <TableSection />
          <aside className="w-full lg:w-80 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <Typography variant="body-sm" className="text-(--main-text)">
                Subtotal
              </Typography>
              <Typography variant="body" className="font-semibold">
                {currency.format(subtotal)}
              </Typography>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Typography variant="body-sm" className="text-(--main-text)">
                Tax ({Math.round(taxRate * 100)}%)
              </Typography>
              <Typography variant="body" className="font-semibold">
                {currency.format(tax)}
              </Typography>
            </div>
            <Divider className="my-3" />
            <div className="flex items-center justify-between">
              <Typography variant="h4">Total</Typography>
              <Typography variant="h3" className="text-(--accent-positive)">
                {currency.format(total)}
              </Typography>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button variant="outlined" fullWidth onClick={handleClearForm}>
                Clear Form
              </Button>
              <Button
                disabled={isFinalTransaction}
                variant="contained"
                fullWidth
                type="submit"
                sx={confirmButtonSx}
              >
                Finalize Sales Transaction
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </form>
  );
};

export default CreateSalesForm;
