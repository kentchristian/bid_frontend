import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { icons } from '../../lib/constants/icons';
import { useCancelTransaction } from '../../lib/hooks/useSales';
import type { CancelTransactionType } from '../../lib/types/cancel-transaction';
import { Typography } from '../common/Typography';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 250,
  bgcolor: 'var(--main-bg)',
  borderRadius: 0.5,
  boxShadow: '0px 10px 30px rgba(0,0,0,0.3)',
  overflow: 'hidden', // Ensures the header matches the border radius
};

const VOID_REASONS = [
  'Entry Error',
  'Customer Change of Mind',
  'Return',
  'Defective Item',
  'Duplicate Sale',
  'System Bug',
  'Others',
];

interface CancelTransactionProps {
  open: boolean;
  onClose: () => void;
  transactionID: string;
}

const CancelTransaction = ({
  open,
  onClose,
  transactionID,
}: CancelTransactionProps) => {
  const [reason, setReason] = useState<{
    reason: string;
    details: string;
  }>({
    reason: '',
    details: '',
  });

  const { mutate: cancelTransaction, isPending: cancelTransactionPending } =
    useCancelTransaction({ handleClose: onClose }); // passing the close function for cancelTransaction modal

  const handleConfirm = () => {
    // Transform reason
    const cancelReason = reason?.reason + reason?.details;

    const payload: CancelTransactionType = {
      transaction_id: transactionID,
      cancel_reason: cancelReason,
    };

    cancelTransaction(payload);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="void-modal-title">
      <Box sx={modalStyle}>
        {/* Header - Danger Zone */}
        <Box
          sx={{
            bgcolor: 'var(--accent-negative)',
            color: 'white',
            p: 3,
            textAlign: 'center',
          }}
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <icons.warning size={40} color="var(--accent-warning)" />
            <Typography variant="h4">CANCEL TRANSACTION</Typography>
          </div>
          <Typography
            variant="code"
            className="bg-transparent flex justify-center items-center text-xl"
          >
            Transaction ID: {transactionID}
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <Stack spacing={3}>
            {/* Information Alert */}
            <Alert
              severity="warning"
              variant="outlined"
              sx={{ border: '1px solid orange' }}
            >
              This action will mark all items in this transaction as{' '}
              <strong>Cancelled</strong> and automatically restore stock levels
              in the inventory.
            </Alert>

            {/* BI Reason Selection */}
            <FormControl
              fullWidth
              required
              error={false}
              sx={{ gap: 1 }}
              onSubmit={handleConfirm}
            >
              <InputLabel id="reason-label">Select Reason</InputLabel>
              <Select
                labelId="reason-label"
                value={reason?.reason}
                label="Select Reason"
                aria-placeholder="Select the reason for cancellation"
                onChange={(e) => {
                  setReason({ ...reason, reason: e.target.value });
                }}
                sx={{
                  bgcolor: 'var(--main-bg)',
                }}
                required
              >
                {VOID_REASONS.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                fullWidth
                label="Detailed Justification"
                placeholder="Explain why this transaction is being voided (e.g., Customer returned items due to defect...)"
                multiline
                rows={4}
                value={reason?.details}
                onChange={(e) => {
                  setReason({ ...reason, details: e.target.value });
                }}
              />
              <FormHelperText sx={{ color: 'var-(--main-text)' }}>
                Providing a reason ensures accurate Business Intelligence
                reporting.
              </FormHelperText>
            </FormControl>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                disabled={cancelTransactionPending}
                onClick={onClose}
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  bgcolor: 'var(--main-bg)',
                  color: 'var(--main-text)',
                }}
              >
                GO BACK
              </Button>
              <Button
                loading={cancelTransactionPending}
                onClick={handleConfirm}
                variant="contained"
                fullWidth
                disabled={!reason?.reason}
                sx={{
                  py: 1.5,
                  bgcolor: 'var(--accent-negative)',
                  '&:hover': { bgcolor: 'var(--accent-negative-hover)' },
                  fontWeight: 'bold',
                }}
                type="submit"
              >
                CONFIRM CANCELLATION
              </Button>
            </Stack>

            <Typography
              variant="caption"
              className="flex self-center items-center text-(--main-text)"
            >
              Manager or Higher Role Access Required
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default CancelTransaction;
