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
          "border-r transition-[width] duration-300 ease-in-out flex flex-col text-slate-100",
          collapsed ? "w-16" : "w-64",
          "hover:cursor-pointer"
        )}
      >
        <div
          className={cn(
            "flex items-center px-3 pt-3",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="BID logo" className="h-30 w-auto" />
            </div>
          )}

          <Button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            sx={{
              minWidth: 0,
              fontSize: 30,
              color: "inherit",
            }}
          >
            {collapsed ? <icons.expand size={20} /> : <icons.collapse size={20} />}
          </Button>
        </div>

        <nav className="flex flex-col mt-4 gap-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              href={item.href}
              fullWidth
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                gap: collapsed ? 0 : 1.5,
                px: collapsed ? 1.25 : 2,
                py: 1.25,
                minHeight: 44,
                textAlign: "left",
                color: "inherit",
              }}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Button>
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
