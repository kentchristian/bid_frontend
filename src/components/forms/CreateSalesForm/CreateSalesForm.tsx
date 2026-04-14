import {
  Autocomplete,
  Avatar,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
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
import type { PickerValue } from '@mui/x-date-pickers/internals';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useState, type FormEvent } from 'react';
import { icons } from '../../../lib/constants/icons';
import { Typography } from '../../common/Typography';

export type CreateSalesLineItem = {
  id: number;
  product: string;
  category: string;
  unitPrice: number;
  qty: number;
};

type CreateSalesFormProps = {
  lineItems: CreateSalesLineItem[];
  quantity: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  currency: Intl.NumberFormat;
};

const CreateSalesForm = ({
  lineItems,
  quantity,
  onSubmit,
  subtotal,
  tax,
  taxRate,
  total,
  currency,
}: CreateSalesFormProps) => {
  const [transactionDate, setTransactionDate] = useState<Dayjs | null>(dayjs());
  const [soldBy, setSoldBy] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<number>(0);

  const handleDecrement = () => {
    setProductQuantity((prev) => prev - 1);
  };
  const handleIcrement = () => {
    setProductQuantity((prev) => prev + 1);
  };
  const isToday = transactionDate?.isSame(dayjs(), 'day'); // present Day checker

  /* Date Section */
  const DateSection = () => {
    return (
      <div className="flex-1">
        <Typography variant="h4" className="text-base text-gray-700">
          Transaction Details
        </Typography>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Transaction Date"
              value={transactionDate as PickerValue}
              onChange={(newValue: PickerValue) => {
                setTransactionDate(newValue);
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,

                  error: !transactionDate,
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
              setTransactionDate(dayjs());
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
        <Typography variant="body-sm" className="text-gray-500">
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
              value={soldBy}
              onChange={(event: SelectChangeEvent) =>
                setSoldBy(event.target.value as string)
              }
            >
              <MenuItem value="john-doe">John Doe</MenuItem>
              <MenuItem value="maria-k">Maria K.</MenuItem>
              <MenuItem value="staff">Sales Staff</MenuItem>
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
          value={category}
          onChange={(event: SelectChangeEvent) =>
            setCategory(event.target.value)
          }
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="office">Office Supplies</MenuItem>
        </Select>
      </FormControl>
    );
  };

  /* ProductSection */
  const options = ['Something', 'What i it'];
  const ProductSection = () => {
    return (
      <Autocomplete
        disablePortal
        value={product}
        onChange={(_event, newValue: string | null) =>
          setProduct(newValue as string)
        }
        options={options}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search / Select Product" />
        )}
        sx={{
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            height: 40, // match your other field
          },
          '& .MuiOutlinedInput-input': {
            padding: '0 14px',
            textAlign: 'center',
          },
        }}
      />
    );
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <section className="rounded-xl border border-gray-200/70 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <DateSection />
          <SoldBySection />
        </div>
      </section>

      <section className="rounded-xl border border-gray-200/70 p-4">
        <div className="flex flex-col gap-3">
          <Typography variant="h4" className="text-base text-gray-700">
            Add Items
          </Typography>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <CategorySection />
            <ProductSection />

            <div className="flex items-end gap-2">
              <TextField
                label="Quantity"
                size="small"
                value={productQuantity}
                InputProps={{ readOnly: true }}
                sx={{ width: 110 }}
              />
              <div className="flex gap-1">
                <Button
                  disabled={productQuantity < 1}
                  variant="outlined"
                  size="small"
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleIcrement}
                >
                  +
                </Button>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="whitespace-nowrap"
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
        <Typography variant="h4" className="text-base text-gray-700">
          Sales Line Items
        </Typography>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <TableContainer
              component="div"
              className="overflow-hidden rounded-lg border border-gray-100"
            >
              <Table size="small" aria-label="sales line items">
                <TableHead>
                  <TableRow className="bg-gray-50">
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
                      <TableCell align="center">
                        <IconButton size="small" aria-label="remove item">
                          <icons.delete size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <aside className="w-full lg:w-80 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <Typography variant="body-sm" className="text-gray-500">
                Subtotal
              </Typography>
              <Typography variant="body" className="font-semibold">
                {currency.format(subtotal)}
              </Typography>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Typography variant="body-sm" className="text-gray-500">
                Tax ({Math.round(taxRate * 100)}%)
              </Typography>
              <Typography variant="body" className="font-semibold">
                {currency.format(tax)}
              </Typography>
            </div>
            <Divider className="my-3" />
            <div className="flex items-center justify-between">
              <Typography variant="h4">Total</Typography>
              <Typography variant="h3" className="text-blue-600">
                {currency.format(total)}
              </Typography>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button variant="outlined" fullWidth>
                Clear Form
              </Button>
              <Button variant="contained" fullWidth>
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
