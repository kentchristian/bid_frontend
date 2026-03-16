import { Outlet } from 'react-router';

import SideBar from './components/nav/SideBar';

const Layout = () => {
  return (
    <div className="app-shell flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar />
      {/* Main content Version 1*/}
      {/* <div className="flex flex-col flex-1 min-w-0 h-full">
        <header className="flex justify-end py-2 px-4">
          <ProfileMenu />
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div> */}

      <main className="app-main flex-1 min-w-0 min-h-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
