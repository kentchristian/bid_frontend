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
  Typography,
  styled,
} from '@mui/material';
import React from 'react';
import { useTransactionTicket } from '../../lib/store/useTransactionTicket';

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

interface TransactionModalProps {
  data?: TransactionData;
}

// --- Styled Components ---

const ReceiptPaper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  // The Spiky Top Border logic
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -12,
    left: 0,
    width: '100%',
    height: 12,
    backgroundColor: theme.palette.background.paper,
    WebkitMaskImage: `linear-gradient(-45deg, transparent 6px, black 0), 
                     linear-gradient(45deg, transparent 6px, black 0)`,
    WebkitMaskSize: '12px 24px',
    maskImage: `linear-gradient(-45deg, transparent 6px, black 0), 
                linear-gradient(45deg, transparent 6px, black 0)`,
    maskSize: '12px 24px',
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
  ],
};

// --- Main Component ---

export const TransactionTicketModal: React.FC<TransactionModalProps> = ({
  data = DUMMY_TRANSACTION,
}) => {
  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.total_price,
    0,
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const { open, onClose } = useTransactionTicket(); // Transaction Ticket State

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperComponent={ReceiptPaper}
      PaperProps={{
        sx: {
          borderRadius: '4px',
          overflow: 'visible', // Required so spikes aren't clipped
          mt: 2,
        },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 1 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          fontWeight="900"
          letterSpacing={2}
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
            <Typography variant="caption" color="text.secondary">
              ID
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{ fontFamily: 'monospace' }}
              >
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
            <Typography variant="caption" color="text.secondary">
              Date
            </Typography>
            <Typography variant="caption" fontWeight="600">
              {new Date(data.sold_at).toLocaleString('en-PH', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              Cashier
            </Typography>
            <Typography
              variant="caption"
              fontWeight="600"
              noWrap
              sx={{ maxWidth: '180px' }}
            >
              {data.created_by.split(' (')[0]}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', my: 2.5, borderWidth: 1 }} />

        {/* Scrollable Items Section */}
        <Typography
          variant="caption"
          fontWeight="800"
          color="text.secondary"
          display="block"
          mb={1.5}
        >
          ITEMS
        </Typography>

        <Box
          sx={{
            maxHeight: '200px', // Specific height
            overflowY: 'auto', // Auto scroll
            pr: 1, // Space for scrollbar
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
                    variant="body2"
                    fontWeight="600"
                    sx={{ lineHeight: 1.2 }}
                  >
                    {item.inventory_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.quantity} x ₱{item.unit_price.toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="700" sx={{ ml: 2 }}>
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
          <Typography variant="subtitle1" fontWeight="900">
            TOTAL AMOUNT
          </Typography>
          <Typography variant="h6" fontWeight="900" color="primary.main">
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
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Print
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          disableElevation
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionTicketModal;
