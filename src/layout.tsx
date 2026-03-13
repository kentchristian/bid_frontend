import { useState, type ReactNode } from "react"
import { cn } from "./lib/helpers/cn"

import Button from "@mui/material/Button"
import { icons } from "./lib/constants/icons"

const navItems = [
  { name: "Dashboard", icon: <icons.dashboard size={20} />, href: "/" },
  { name: "Sales", icon: <icons.sales size={20} />, href: "/" },
  { name: "Inventory", icon: <icons.inventory size={20} />, href: "/" },
  { name: "Reports", icon: <icons.reports size={20} />, href: "/" },
  
]

type LayoutProps = {
  children: ReactNode
  mode: "light" | "dark"
  onToggleMode: () => void
}

const Layout = ({ children, mode, onToggleMode }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const logoSrc = mode === "dark" ? "/logo-light.svg" : "/logo.svg"

  const labelTransition = cn(
    "overflow-hidden whitespace-nowrap transition-[opacity,transform,max-width] duration-500 ease-in-out",
    collapsed
      ? "max-w-0 opacity-0 -translate-x-2"
      : "max-w-full opacity-100 translate-x-0"
  )

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "border-r transition-[width] duration-500 ease-in flex flex-col overflow-hidden will-change-[width] hover:cursor-pointer",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div
          className="flex items-center justify-between px-3 pt-3"
        >
          <div
            className={cn(
              "flex items-center gap-2 transition-[opacity,transform,max-width] duration-500 ease-in-out overflow-hidden",
              collapsed
                ? "max-w-0 opacity-0 -translate-x-2"
                : "max-w-full opacity-100 translate-x-0"
            )}
          >
            <img src={logoSrc} alt="BID logo" className="h-30 w-auto" />
          </div>

          <Button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            sx={{
              minWidth: 0,
              fontSize: 30,
              color: "inherit",
              "&:hover": {
                backgroundColor: "var(--sidebar-hover)",
                color: "inherit"
              },
            }}
          >
            {collapsed ? <icons.expand size={20} /> : <icons.collapse size={20} />}
          </Button>
        </div>

        <nav className="flex flex-1 flex-col mt-4 gap-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              href={item.href}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                gap: collapsed ? 0 : 1.5,
                px: collapsed ? 2.75 : 2,
                py: 1.25,
                minHeight: 44,
                transition: "padding 500ms ease-in-out, gap 500ms ease-in-out",
                textAlign: "left",
                color: "inherit",
                "&:hover": {
                  backgroundColor: "var(--sidebar-hover)",
                  color: "inherit"
                },
              }}
            >
              {item.icon}
              <span className={labelTransition}>{item.name}</span>
            </Button>
          ))}

          <Button
            onClick={onToggleMode}
            fullWidth
            aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
            sx={{
              mt: "auto",
              justifyContent: "flex-start",
              gap: collapsed ? 0 : 1.5,
              px: collapsed ? 2.75 : 2,
              py: 1.25,
              minHeight: 44,
              transition: "padding 500ms ease-in-out, gap 500ms ease-in-out",
              textAlign: "left",
              color: "inherit",
              "&:hover": {
                backgroundColor: "var(--sidebar-hover)",
                color: "inherit"
              },
            }}
          >
            <span className="relative inline-flex h-5 w-5">
              <span
                className={cn(
                  "absolute inset-0 transition-all duration-200 ease-out",
                  mode === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                )}
              >
                <icons.darkMode size={20} />
              </span>
              <span
                className={cn(
                  "absolute inset-0 transition-all duration-200 ease-out",
                  mode === "light" ? "opacity-0 rotate-180" : "opacity-100 rotate-0",
                  
                )}
              >
                <icons.lightMode size={20} />
              </span>
            </span>
            <span className={labelTransition}>
              {mode === "light" ? "Light Mode" : "Dark Mode"}
            </span>
          </Button>
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
