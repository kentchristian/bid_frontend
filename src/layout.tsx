import { type ReactNode } from 'react';

import SideBar from './components/nav/SideBar';

type LayoutProps = {
  children: ReactNode;
  mode: 'light' | 'dark';
  onToggleMode: () => void;
};

const Layout = ({ children, mode, onToggleMode }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-auto">
      {/* Sidebar */}
      <SideBar mode={mode} onToggleMode={onToggleMode} />
      {/* Main content Version 1*/}
      {/* <div className="flex flex-col flex-1 min-w-0 h-full">
        <header className="flex justify-end py-2 px-4">
          <ProfileMenu />
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div> */}

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
