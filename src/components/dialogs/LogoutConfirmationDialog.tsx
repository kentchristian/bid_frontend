import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type LogoutConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export default function LogoutConfirmationDialog({
  open,
  onClose,
  onConfirm,
  loading = false,
}: LogoutConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'var(--card)',
          color: 'var(--main-text)',
          border: '1px solid var(--card-border)',
          boxShadow: '0 18px 45px rgba(0, 0, 0, 0.25)',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>Confirm Logout</DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ color: 'var(--sidebar-muted)' }}>
          Are you sure you want to log out? You will need to log in again to
          access your account.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          // variant="contained"
          sx={{
            background: 'var(--accent-negative)',
          }}
          loading={loading}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
