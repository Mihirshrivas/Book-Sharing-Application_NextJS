import { AdminNav } from "@/components/admin-nav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col gap-4 border-r bg-gray-50/50 p-6">
        <div className="flex h-14 items-center gap-2 border-b px-2 font-semibold">
          <span className="text-lg">Admin Panel</span>
        </div>
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
} 