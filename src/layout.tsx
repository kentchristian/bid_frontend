import { type ReactNode } from "react"

import ProfileMenu from "./components/nav/ProfileMenu"
import SideBar from "./components/nav/SideBar"


type LayoutProps = {
  children: ReactNode
  mode: "light" | "dark"
  onToggleMode: () => void
}

const Layout = ({ children, mode, onToggleMode }: LayoutProps) => {
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar 
        mode={mode}
        onToggleMode={onToggleMode}      
      />
      {/* Main content */}
      <div className="flex flex-col w-full h-full">
        <header className="flex justify-end py-2 px-4">
          <ProfileMenu />
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
      
    </div>
  )
}

export default Layout;
