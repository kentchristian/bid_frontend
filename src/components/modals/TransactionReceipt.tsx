import {
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  styled,
} from '@mui/material';
import React from 'react';

// Custom Typography Import
import { useTransactionTicket } from '../../lib/store/useTransactionTicket';
import { Typography } from '../common/Typography';

// --- Interfaces ---

interface SaleItem {
  id: string;
  inventory_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface TransactionData {
  transaction_id: string;
  sold_at: string;
  created_by: string;
  items: SaleItem[];
}

interface TransactionReceiptProps {
  data?: TransactionData;
}

// --- Styled Components ---
const ReceiptPaper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  border: 'none', // Force remove any borders
  outline: 'none',
  // The "Ripped Ticket" Zigzag Top Border
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -15, // Slightly overlap to hide any gap
    left: 0,
    width: '100%',
    height: 16,
    backgroundColor: theme.palette.background.paper,
    // Refined polygon to ensure no "bottom line" remains
    clipPath:
      'polygon(0% 100%, 5% 40%, 10% 100%, 15% 40%, 20% 100%, 25% 40%, 30% 100%, 35% 40%, 40% 100%, 45% 40%, 50% 100%, 55% 40%, 60% 100%, 65% 40%, 70% 100%, 75% 40%, 80% 100%, 85% 40%, 90% 100%, 95% 40%, 100% 100%)',
  },
}));

// --- Default Data ---

const DUMMY_TRANSACTION: TransactionData = {
  transaction_id: 'TXN-7B9D6BCD',
  sold_at: new Date().toISOString(),
  created_by: 'Admin User (admin@quantumanalytics.io)',
  items: [
    {
      id: '1',
      inventory_name: 'Quantum Processor Unit',
      quantity: 2,
      unit_price: 15000,
      total_price: 30000,
    },
    {
      id: '2',
      inventory_name: 'BI Dashboard License',
      quantity: 1,
      unit_price: 5000,
      total_price: 5000,
    },
    {
      id: '3',
      inventory_name: 'Cloud Storage (1TB)',
      quantity: 3,
      unit_price: 1200,
      total_price: 3600,
    },
    {
      id: '4',
      inventory_name: 'Security Firewall',
      quantity: 1,
      unit_price: 8500,
      total_price: 8500,
    },
    {
      id: '5',
      inventory_name: 'Extended Support',
      quantity: 1,
      unit_price: 2000,
      total_price: 2000,
    },
  ],
};

// --- Main Component ---

export const TransactionReceipt: React.FC<TransactionReceiptProps> = ({
  data = DUMMY_TRANSACTION,
}) => {
  const { open, onClose } = useTransactionTicket();

  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.total_price,
    0,
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperComponent={ReceiptPaper}
      // Remove default shadow that might cause a dark line
      PaperProps={{
        sx: {
          borderRadius: 0,
          overflow: 'visible',
          mt: 4,
          boxShadow: '0px 10px 30px rgba(0,0,0,0.1)', // Manual shadow to avoid border artifacts
          backgroundImage: 'none', // Remove MUI's dark mode overlay if applicable
          '& .MuiDialogContent-root': {
            border: 'none', // Ensure content doesn't have a top border
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 1 }}>
        <Typography
          variant="overline"
          weight={900}
          className="tracking-[0.2em] text-gray-500"
        >
          Transaction Receipt
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.disabled',
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        {/* Info Section */}
        <Stack spacing={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption">ID</Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="code" weight={700}>
                {data.transaction_id}
              </Typography>
              <IconButton
                size="small"
                sx={{ p: 0.5 }}
                onClick={() => handleCopy(data.transaction_id)}
              >
                <CopyIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption">Date</Typography>
            <Typography variant="body-sm" weight={600}>
              {new Date(data.sold_at).toLocaleString('en-PH', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption">Cashier</Typography>
            <Typography
              variant="body-sm"
              weight={600}
              className="truncate max-w-[180px]"
            >
              {data.created_by.split(' (')[0]}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', my: 2.5, borderWidth: 1 }} />

        {/* Scrollable Items Section */}
        <Typography
          variant="overline"
          weight={800}
          className="mb-3 block text-gray-400"
        >
          ITEMS
        </Typography>

        <Box
          sx={{
            maxHeight: '200px',
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: (theme) => theme.palette.divider,
              borderRadius: '10px',
            },
          }}
        >
          <Stack spacing={2}>
            {data.items.map((item) => (
              <Box
                key={item.id}
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body-sm"
                    weight={600}
                    className="leading-tight"
                  >
                    {item.inventory_name}
                  </Typography>
                  <Typography variant="caption">
                    {item.quantity} x ₱{item.unit_price.toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body-sm" weight={700} className="ml-4">
                  ₱{item.total_price.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: 2.5 }} />

        {/* Total Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Typography variant="body" weight={800}>
            TOTAL AMOUNT
          </Typography>
          <Typography variant="h4" weight={900} className="text-primary">
            ₱{totalAmount.toLocaleString()}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
          sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
        >
          Print
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          disableElevation
          sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionReceipt;
