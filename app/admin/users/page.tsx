"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FiSearch, FiEdit2, FiTrash2, FiUserCheck } from "react-icons/fi"

interface User {
  id: string
  name: string
  email: string
  role: string
  isVerified: boolean
  createdAt: string
  booksShared: number
  booksLent: number
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (Array.isArray(data)) {
        setUsers(data)
      } else {
        console.error('Expected array of users, got:', data)
        setUsers([])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/verify`, {
        method: 'POST'
      })
      if (res.ok) {
        fetchUsers() // Refresh users list
      }
    } catch (error) {
      console.error('Error verifying user:', error)
    }
  }

  const filteredUsers = Array.isArray(users) ? users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading users...
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Books Shared</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant={user.role === 'ADMIN' ? 'destructive' : 'default'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={user.isVerified ? 'default' : 'destructive'}>
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{user.booksShared}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {!user.isVerified && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVerifyUser(user.id)}
                        >
                          <FiUserCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 