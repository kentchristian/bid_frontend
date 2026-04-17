import { Outlet } from 'react-router';

import { Typography } from './components/common/Typography';
import ProfileMenu from './components/nav/ProfileMenu';
import SideBar from './components/nav/SideBar';
import { useScrollThreshold } from './lib/hooks/useScrollThreshold';
import { useUserData } from './lib/store/useUserData';

const Layout = () => {
  const isScrolled = useScrollThreshold(80);
  const tenant = useUserData((state) => state.userData?.tenant.name);

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar />
      {/* Main content Version 1*/}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <header
          className={`
          app-header flex justify-between items-center px-4 bg-(--main-bg) overflow-hidden
          border-b border-(--sidebar-border)
          transition-[max-height,opacity,transform,padding] duration-300
          ${isScrolled ? 'max-h-0 py-0 opacity-0 -translate-y-2 pointer-events-none border-transparent' : 'min-h-20 py-2 opacity-100 translate-y-0'}
        `}
        >
          <div style={{ width: '40px' }} aria-hidden="true" />

          <Typography variant="h3" className="text-center">
            {tenant}
          </Typography>
          <div
            style={{
              width: '40px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <ProfileMenu />
          </div>
        </header>
        <main className="app-main flex-1 min-w-0 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
