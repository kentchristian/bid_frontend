import { useState } from "react"
import { cn } from "./lib/helpers/cn"

import Button from "@mui/material/Button"
import { icons } from "./lib/constants/icons"

const navItems = [
  { name: "Dashboard", icon: <icons.dashboard size={20} />, href: "/" },
  { name: "Sales", icon: <icons.sales size={20} />, href: "/" },
  { name: "Inventory", icon: <icons.inventory size={20} />, href: "/" },
  { name: "Reports", icon: <icons.reports size={20} />, href: "/" },
  
]

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-black border-r transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64",
          "hover:cursor-pointer"
        )}
      >
        <Button
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            alignSelf: "end",
            fontSize: 30
          }}
        >
          {collapsed ? <icons.expand size={20} /> : <icons.collapse size={20} />}
        </Button>

        <nav className="flex flex-col mt-4 gap-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}

export default Layout;