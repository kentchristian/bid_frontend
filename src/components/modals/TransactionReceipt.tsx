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
import type { SalesTransactionPayload } from '../../lib/types/sales-transaction';
import { dateMonthDayTimeFormatter } from '../../lib/utils/dateMonthDayTimeFormatter';
import { Typography } from '../common/Typography';

interface TransactionReceiptProps {
  data?: SalesTransactionPayload;
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

export const TransactionReceipt: React.FC<TransactionReceiptProps> = ({
  data,
}) => {
  const { open, onClose } = useTransactionTicket();

  const totalAmount = data?.items.reduce(
    (sum, item) => sum + item?.total_price,
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
          variant="h3"
          weight={900}
          className="tracking-[0.2em] text-(--main-text) text-center mb-6"
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
            <Typography variant="caption" className="text-(--main-text)">
              ID
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography
                variant="code"
                weight={700}
                className="text-(--main-text) bg-(--main-bg)"
              >
                {data?.transaction_id}
              </Typography>
              <IconButton
                size="small"
                sx={{ p: 0.5 }}
                onClick={() => handleCopy(data?.transaction_id ?? 'Unknown')}
              >
                <CopyIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" className="text-(--main-text)">
              Date
            </Typography>
            <Typography variant="body-sm" weight={600}>
              {data?.sold_at ? dateMonthDayTimeFormatter(data?.sold_at) : 'N/A'}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" className="text-(--main-text)">
              Created By
            </Typography>
            <Typography
              variant="body-sm"
              weight={600}
              className="truncate max-w-[180px]"
            >
              {data?.created_by_name ?? 'Unknown'}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', my: 2.5, borderWidth: 1 }} />

        {/* Scrollable Items Section */}
        <Typography
          variant="overline"
          weight={800}
          className="mb-3 block text-(--main-text)"
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
            {data?.items.map((item, idx: number) => (
              <Box
                key={idx}
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
                    {item?.product_name}
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
          <Typography
            variant="h4"
            weight={900}
            className="text-(--accent-positive)"
          >
            ₱{totalAmount?.toLocaleString() ?? 0}
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
