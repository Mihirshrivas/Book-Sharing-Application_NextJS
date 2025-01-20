"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FiClock, FiStar, FiShare2, FiBookmark, FiMessageCircle, FiHeart, FiDownload } from 'react-icons/fi'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function BookDetails({ params }: { params: { id: string } }) {
  const [book] = useState({
    id: params.id,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    description: "A vivid and colorful portrait of the Jazz Age set in New York's Long Island. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
    genre: "Classic Literature",
    rating: 4.5,
    reviews: 128,
    available: true,
    condition: "Good",
    owner: "Library Main Branch",
    publishYear: 1925,
    pages: 180,
    language: "English",
    tags: ["Classic", "American Literature", "Romance", "Jazz Age"],
    similarBooks: [
      { id: 1, title: "The Catcher in the Rye", author: "J.D. Salinger", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f" },
      { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c" }
    ]
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main Content */}
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Book Cover */}
            <div className="space-y-4">
              <div className="aspect-[3/4] relative overflow-hidden rounded-xl shadow-2xl group">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 space-y-2">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    {book.available ? 'Available' : 'Borrowed'}
                  </Badge>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" className="flex flex-col items-center p-4 hover:bg-purple-50">
                  <FiHeart className="h-6 w-6 mb-1" />
                  <span className="text-xs">Like</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 hover:bg-purple-50">
                  <FiBookmark className="h-6 w-6 mb-1" />
                  <span className="text-xs">Save</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 hover:bg-purple-50">
                  <FiShare2 className="h-6 w-6 mb-1" />
                  <span className="text-xs">Share</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 hover:bg-purple-50">
                  <FiMessageCircle className="h-6 w-6 mb-1" />
                  <span className="text-xs">Review</span>
                </Button>
              </div>
            </div>

            {/* Right Column - Book Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
              </div>
              
              {/* Rating */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(book.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{book.rating}</span>
                  <span className="text-gray-600">({book.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{book.description}</p>

              {/* Book Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
                <div>
                  <p className="text-sm text-gray-500">Genre</p>
                  <p className="font-medium">{book.genre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-medium">{book.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="font-medium">{book.publishYear}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="font-medium">{book.pages}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {book.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Borrow Now
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FiDownload className="h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Similar Books Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Similar Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {book.similarBooks.map(similar => (
              <Card key={similar.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={similar.cover} 
                    alt={similar.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{similar.title}</h3>
                  <p className="text-sm text-gray-600">{similar.author}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 