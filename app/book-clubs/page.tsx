"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface BookClub {
  id: string
  name: string
  description: string
  members: number
  currentBook: {
    title: string
    author: string
    coverImage: string
  }
  meetingSchedule: string
  genre: string
}

export default function BookClubs() {
  const [bookClubs, setBookClubs] = useState<BookClub[]>([])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Book Clubs</h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Create Book Club
          </Button>
        </div>

        {/* Book Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookClubs.map((club) => (
            <Card key={club.id} className="overflow-hidden hover:shadow-lg transition-all">
              {/* Club content */}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 