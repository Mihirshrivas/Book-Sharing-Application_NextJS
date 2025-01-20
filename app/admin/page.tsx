"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FiUsers,
  FiBook,
  FiClock,
  FiAlertCircle,
  FiActivity
} from "react-icons/fi"
import { Badge } from "@/components/ui/badge"

interface AdminStats {
  totalUsers: number
  totalBooks: number
  activeLoans: number
  pendingVerifications: number
}

interface Activity {
  id: string
  status: string
  createdAt: string
  book: { title: string }
  borrower: { name: string }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalBooks: 0,
    activeLoans: 0,
    pendingVerifications: 0
  })
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      if (data.stats) {
        setStats(data.stats)
        setActivities(data.recentActivities)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button 
          onClick={fetchAdminData}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <FiActivity className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/80 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiUsers className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiBook className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Books</p>
              <p className="text-2xl font-bold">{stats.totalBooks}</p>
            </div>
          </div>
        </Card>

       
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {activity.borrower.name} {activity.status.toLowerCase()} &quot;{activity.book.title}&quot;
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge variant={
                activity.status === 'APPROVED' ? 'default' :
                activity.status === 'PENDING' ? 'secondary' : 'destructive'
              }>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <FiUsers className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FiBook className="mr-2 h-4 w-4" />
              Manage Books
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>System Status</span>
              <Badge variant="default">Operational</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Last Updated</span>
              <span className="text-sm text-gray-600">
                {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 