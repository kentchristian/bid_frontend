import { Button, ListItemIcon, MenuItem } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { logout } from '../../api/auth';
import LogoutConfirmationDialog from '../../components/dialogs/LogoutConfirmationDialog';
import { icons } from '../../lib/constants/icons';
import { useSetMode } from '../../lib/store/useMode';
import { useMiddleware } from '../../middleware/MiddlewareProvider';

type LocationState = {
  from?: { pathname: string };
};

type LogoutProps = {
  sx?: SxProps<Theme>;
  labelClassName?: string;
  onItemClick?: () => void;
  variant?: 'button' | 'menuItem';
};

const Logout = ({
  sx,
  labelClassName,
  onItemClick,
  variant = 'button',
}: LogoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { setAuthenticated } = useMiddleware();
  const setMode = useSetMode();

  const [openDialog, setOpenDialog] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      localStorage.clear(); // clear whats inside the storage
      setAuthenticated(false);

      const from =
        (location.state as LocationState | null)?.from?.pathname ?? '/';
      navigate(from, { replace: true });
      setMode('light'); // turn light mode for default mode
    },
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
    if (variant === 'button') {
      onItemClick?.();
    }
  };

  const handleCloseDialog = () => {
    if (logoutMutation.isPending) return;
    setOpenDialog(false); // avoids early closing
    if (variant === 'menuItem') {
      onItemClick?.();
    }
  };

  const handleConfirmDialog = () => {
    logoutMutation.mutate();
  };
  const dialog = (
    <LogoutConfirmationDialog
      open={openDialog}
      onClose={handleCloseDialog}
      onConfirm={handleConfirmDialog}
      loading={logoutMutation.isPending}
    />
  );

  if (variant === 'menuItem') {
    return (
      <>
        <MenuItem
          onClick={handleOpenDialog}
          disabled={logoutMutation.isPending}
          aria-label="Log out"
          aria-busy={logoutMutation.isPending || undefined}
          sx={sx}
        >
          <ListItemIcon>
            <icons.logout size={20} />
          </ListItemIcon>
          {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
        </MenuItem>
        {dialog}
      </>
    );
  }

  return (
    <>
      <Button
        sx={sx}
        onClick={handleOpenDialog}
        fullWidth
        disabled={logoutMutation.isPending}
        aria-label="Log out"
        aria-busy={logoutMutation.isPending || undefined}
      >
        <icons.logout size={20} />
        <span className={labelClassName}>
          {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
        </span>
      </Button>
      {dialog}
    </>
  );
};

export default Logout;
