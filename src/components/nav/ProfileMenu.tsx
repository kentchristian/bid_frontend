import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { icons } from '../../lib/constants/icons';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const info = ['Admin', 'Kent Christian', 'kent@gmail.com'];

  type listItemsType = {
    icons: React.ReactNode;
    text: string;
    fn?: () => void;
  };
  const listItems: listItemsType[] = [
    {
      icons: <icons.check size={16} />,
      text: 'Kent Christian',
    },
    {
      icons: <icons.check size={16} />,
      text: 'kent@gmail.com',
    },
    {
      icons: <icons.check size={16} />,
      text: 'Admin',
    },
    {
      icons: <Settings fontSize="small" />,
      text: 'Settings',
      fn: handleClose,
    },
    {
      icons: <Logout fontSize="small" />,
      text: 'Logout',
      fn: handleClose,
    },
  ];
  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{ width: 50, height: 50 }}>KC</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 200,
              maxWidth: '100%',
            },
          },
        }}
      >
        {listItems.map((item) => (
          <>
            <MenuItem onClick={item.fn}>
              <ListItemIcon>{item.icons}</ListItemIcon>
              {item.text}
            </MenuItem>
          </>
        ))}
      </Menu>
    </>
  );
};

export default ProfileMenu;
