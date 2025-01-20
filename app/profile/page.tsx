"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FiEdit2, FiBook, FiUsers, FiHeart } from 'react-icons/fi'

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Avid reader and book enthusiast",
    favoriteGenres: ["Fiction", "Mystery", "Science Fiction"],
    booksRead: 42,
    communitiesJoined: 5,
    bookshelf: [
      { id: 1, title: "Currently Reading", books: [] },
      { id: 2, title: "Want to Read", books: [] },
      { id: 3, title: "Read", books: [] }
    ]
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <FiEdit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              <p className="mt-2 text-gray-700">{user.bio}</p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiBook className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user.booksRead}</p>
                <p className="text-gray-600">Books Read</p>
              </div>
            </div>
          </Card>
          {/* Add more stat cards */}
        </div>

        {/* Bookshelf */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Bookshelf</h2>
          {user.bookshelf.map(shelf => (
            <Card key={shelf.id} className="p-4">
              <h3 className="text-lg font-medium mb-2">{shelf.title}</h3>
              {/* Add book list */}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 