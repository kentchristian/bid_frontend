import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import BusinessOutlined from '@mui/icons-material/BusinessOutlined';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { useUserData } from '../../lib/store/useUserData';
import Logout from '../../pages/auth/logout';
import { Typography } from '../common/Typography';

const getInitials = (name?: string) => {
  if (!name) return 'U';

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return initials.toUpperCase() || 'U';
};

const formatRole = (role?: string) => {
  if (!role) return 'User';

  return role
    .split(/[_-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userData = useUserData((state) => state.userData);

  const open = Boolean(anchorEl);
  const userName = userData?.name ?? 'User';
  const role = formatRole(userData?.role_name);
  const tenantName = userData?.tenant?.name ?? 'Tenant';
  const initials = getInitials(userName);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  type listItemsType = {
    icons: React.ReactNode;
    text: string;
    helper?: string;
    fn?: () => void;
  };

  const listItems: listItemsType[] = [
    {
      icons: <AccountCircleOutlined fontSize="small" />,
      text: role,
      helper: 'Account role',
    },
    {
      icons: <BusinessOutlined fontSize="small" />,
      text: tenantName,
      helper: 'Workspace',
    },
    // {
    //   icons: <Settings fontSize="small" />,
    //   text: 'Settings',
    //   fn: handleClose,
    //   helper: 'Account preferences',
    // },
  ];

  return (
    <>
      <Tooltip title="Open profile menu" arrow>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            color: 'var(--main-text)',
            '&:hover': {
              backgroundColor: 'var(--sidebar-hover)',
            },
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--positive-chip-text)',
              backgroundColor: 'var(--accent-positive)',
            }}
          >
            {initials}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 292,
              maxWidth: '100%',
              mt: 1,
              border: '1px solid var(--card-border)',
              backgroundColor: 'var(--card)',
              color: 'var(--main-text)',
              boxShadow: '0 18px 45px rgba(0, 0, 0, 0.16)',
              '& .MuiMenu-list': {
                py: 1,
              },
            },
          },
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar
            sx={{
              width: 48,
              height: 48,
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--positive-chip-text)',
              backgroundColor: 'var(--accent-positive)',
            }}
          >
            {initials}
          </Avatar>
          <div className="min-w-0">
            <Typography variant="body" weight={700} className="truncate">
              {userName}
            </Typography>
            <Typography
              variant="body-sm"
              className="truncate text-[color:var(--sidebar-muted)]"
            >
              {role}
            </Typography>
          </div>
        </div>

        <Divider sx={{ borderColor: 'var(--card-border)', my: 1 }} />

        {listItems.map((item) => (
          <MenuItem key={item.text} onClick={item.fn}>
            <ListItemIcon sx={{ color: 'var(--sidebar-muted)' }}>
              {item.icons}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              secondary={item.helper}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--main-text)',
              }}
              secondaryTypographyProps={{
                fontSize: 12,
                color: 'var(--sidebar-muted)',
              }}
            />
          </MenuItem>
        ))}

        <Divider sx={{ borderColor: 'var(--card-border)', my: 1 }} />

        <Logout
          variant="menuItem"
          onItemClick={handleClose}
          sx={{
            color: 'var(--accent-negative)',
            '& .MuiListItemIcon-root': {
              color: 'var(--accent-negative)',
            },
          }}
        />
      </Menu>
    </>
  );
};

export default ProfileMenu;
