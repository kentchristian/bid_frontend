import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { cn } from "./lib/helpers/cn"

const navItems = [
  { name: "Home", icon: <HomeIcon />, href: "/" },
  { name: "About", icon: <InfoIcon />, href: "/about" },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <button
          className="p-2 m-2 rounded hover:bg-gray-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          <MenuIcon />
        </button>

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