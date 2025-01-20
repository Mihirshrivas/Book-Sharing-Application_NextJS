"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  FiHome, 
  FiUsers, 
  FiBook
} from "react-icons/fi"

const adminRoutes = [
  {
    title: "Overview",
    href: "/admin",
    icon: FiHome
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: FiUsers
  },
  {
    title: "Books",
    href: "/admin/books",
    icon: FiBook
  }
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {adminRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
        >
          <Button
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              pathname === route.href && "bg-purple-100 text-purple-700 hover:bg-purple-200"
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
} 