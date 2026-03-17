import { Button } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { logout } from '../../api/auth';
import { icons } from '../../lib/constants/icons';
import { useMiddleware } from '../../middleware/MiddlewareProvider';

type LocationState = {
  from?: { pathname: string };
};

type LogoutProps = {
  sx?: SxProps<Theme>;
  labelClassName?: string;
  onItemClick?: () => void;
};

const Logout = ({ sx, labelClassName, onItemClick }: LogoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { setAuthenticated } = useMiddleware();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      setAuthenticated(false);

      const from =
        (location.state as LocationState | null)?.from?.pathname ?? '/';
      navigate(from, { replace: true });
    },
  });

  const handleClick = () => {
    logoutMutation.mutate();
    onItemClick?.();
  };

  return (
    <Button
      sx={sx}
      onClick={handleClick}
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
  );
};

export default Logout;
