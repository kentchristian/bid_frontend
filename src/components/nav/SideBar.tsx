import { Button, Drawer, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { icons } from '../../lib/constants/icons';
import { cn } from '../../lib/helpers/cn';
import { useThemeMode, useToggleMode } from '../../lib/store/useMode';
import Logout from '../../pages/auth/logout';

const navItems = [
  { name: 'Dashboard', icon: <icons.dashboard size={20} />, to: '/dashboard' },
  { name: 'Sales', icon: <icons.sales size={20} />, to: '/sales' },
  { name: 'Inventory', icon: <icons.inventory size={20} />, to: '/inventory' },
  { name: 'Reports', icon: <icons.reports size={20} />, to: '/reports' },
];

// 2nd Layer Interface
interface SideBarProps {
  className?: string;
}

const SideBar = ({ className }: SideBarProps) => {
  const mode = useThemeMode();
  const toggleMode = useToggleMode();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoSrc = mode === 'dark' ? '/logo.svg' : '/logo-light.svg';

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [collapsed]);

  const getLabelTransition = (isCollapsed: boolean) =>
    cn(
      'overflow-hidden whitespace-nowrap transition-[opacity,transform,max-width] duration-500 ease-in-out',
      isCollapsed
        ? 'max-w-0 opacity-0 -translate-x-2'
        : 'max-w-full opacity-100 translate-x-0',
    );

  // Web Style
  const navButtonSx = (isCollapsed: boolean) => ({
    justifyContent: 'flex-start',
    gap: isCollapsed ? 0 : 1.5,
    px: isCollapsed ? 2.75 : 2,
    py: 1.25,
    minHeight: 44,
    transition: 'padding 500ms ease-in-out, gap 500ms ease-in-out',
    textAlign: 'left',
    color: 'inherit',
    '&:hover': {
      backgroundColor: 'var(--sidebar-hover)',
      color: 'inherit',
    },
    '&[aria-current="page"]': {
      backgroundColor: 'var(--sidebar-active)',
    },
  });

  const handleMobileToggle = () => setMobileOpen((prev) => !prev);
  const handleMobileClose = () => setMobileOpen(false);

  const renderNavItems = (isCollapsed: boolean, onItemClick?: () => void) => (
    <nav className="flex flex-1 flex-col mt-4 gap-2">
      {/* Nav Buttons */}
      {navItems.map((item) => (
        <Button
          key={item.name}
          component={NavLink}
          to={item.to}
          end={item.to === '/dashboard'}
          fullWidth
          onClick={onItemClick}
          sx={navButtonSx(isCollapsed)}
        >
          {item.icon}
          <span className={getLabelTransition(isCollapsed)}>{item.name}</span>
        </Button>
      ))}

      <Button
        onClick={() => {
          toggleMode();
          onItemClick?.();
        }}
        fullWidth
        aria-label={
          mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        }
        sx={{
          mt: 'auto',
          ...navButtonSx(isCollapsed), // reusing the style collapsed
        }}
      >
        <span className="relative inline-flex h-5 w-5">
          <span
            className={cn(
              'absolute inset-0 transition-all duration-200 ease-out',
              mode === 'light'
                ? 'opacity-100 rotate-0'
                : 'opacity-0 -rotate-180',
            )}
          >
            <icons.darkMode size={20} />
          </span>
          <span
            className={cn(
              'absolute inset-0 transition-all duration-200 ease-out',
              mode === 'light'
                ? 'opacity-0 rotate-180'
                : 'opacity-100 rotate-0',
            )}
          >
            <icons.lightMode size={20} />
          </span>
        </span>
        <span className={getLabelTransition(isCollapsed)}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </Button>

      <Logout
        onItemClick={onItemClick}
        sx={navButtonSx(isCollapsed)}
        labelClassName={getLabelTransition(isCollapsed)}
      />
    </nav>
  );

  return (
    <div className="sidebar-shell">
      {/* Mobile Header Nav -- Only Shows on Mobile Breakpoint */}
      <div className="mobile-nav">
        <IconButton
          onClick={handleMobileToggle}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          sx={{
            color: 'inherit',
            '&:hover': {
              backgroundColor: 'var(--sidebar-hover)',
            },
          }}
        >
          <icons.menu size={24} />
        </IconButton>
        <img src={logoSrc} alt="BID logo" className="mobile-nav__logo" />
        <span className="h-10 w-10" aria-hidden="false" />
      </div>

      {/* Desktop SideBar */}
      <aside
        className={cn(
          'sidebar-desktop transition-[width] duration-500 ease-in flex shrink-0 flex-col overflow-hidden will-change-[width] hover:cursor-pointer',
          collapsed ? 'w-16' : 'w-64',
          className,
        )}
      >
        <div className="flex items-center justify-between px-3 pt-3">
          <div
            className={cn(
              'flex items-center gap-2 transition-[opacity,transform,max-width] duration-500 ease-in-out overflow-hidden',
              collapsed
                ? 'max-w-0 opacity-0 -translate-x-2'
                : 'max-w-full opacity-100 translate-x-0',
            )}
          >
            <img src={logoSrc} alt="BID logo" className="app-logo h-30" />
          </div>

          {/* Collapse / Expand Button */}
          <Button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            sx={{
              minWidth: 0,
              fontSize: 30,
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'var(--sidebar-hover)',
                color: 'inherit',
              },
            }}
          >
            {collapsed ? (
              <icons.expand size={20} />
            ) : (
              <icons.collapse size={20} />
            )}
          </Button>
        </div>

        {/* Render Nav Items -- The Buttons */}
        {renderNavItems(collapsed)}
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={handleMobileClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          id: 'mobile-nav-drawer',
          className: 'mobile-drawer',
        }}
      >
        <div className="mobile-drawer__header">
          <div className="mobile-drawer__brand">
            <img src={logoSrc} alt="BID logo" className="mobile-nav__logo" />
          </div>
          <IconButton
            onClick={handleMobileClose}
            aria-label="Close navigation menu"
            sx={{
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'var(--sidebar-hover)',
              },
            }}
          >
            <icons.close size={20} />
          </IconButton>
        </div>
        {renderNavItems(false, handleMobileClose)}
      </Drawer>
    </div>
  );
};

export default SideBar;
