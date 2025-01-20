import Link from "next/link"
import { FiSettings } from "react-icons/fi"

// Add this to your existing navigation items
{user?.role === "ADMIN" && (
  <Link href="/admin" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
    <FiSettings className="h-4 w-4" />
    Admin Panel
  </Link>
)} 