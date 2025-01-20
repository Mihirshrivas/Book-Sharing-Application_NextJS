"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FiBook, FiSearch, FiFilter, FiPlus } from 'react-icons/fi'
import { Badge } from "@/components/ui/badge"

// Mock data for books with reliable images and more genres
const initialMockBooks = [
  { 
    id: 1, 
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description: "A fantasy novel about the adventures of Bilbo Baggins",
    coverImage: "https://images.unsplash.com/photo-1515816052601-210b6f9cd321?w=500&h=750&fit=crop",
    available: true,
    condition: "Excellent"
  },
  { 
    id: 2, 
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    description: "A mystery thriller involving cryptography, art, and religious conspiracies",
    coverImage: "https://images.unsplash.com/photo-1585158531004-3c5c8201b41f?w=500&h=750&fit=crop",
    available: true,
    condition: "Good"
  },
  { 
    id: 3, 
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    description: "A psychological thriller about a woman's act of violence against her husband",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=750&fit=crop",
    available: false,
    condition: "Excellent"
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    description: "An epic science fiction novel set in a distant future",
    coverImage: "https://images.unsplash.com/photo-1576161787924-01bb08dad4b1?w=500&h=750&fit=crop",
    available: true,
    condition: "Good"
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description: "A romantic novel set in early 19th century England",
    coverImage: "https://images.unsplash.com/photo-1583454076049-d1f3d8a24d35?w=500&h=750&fit=crop",
    available: true,
    condition: "Fair"
  },
  {
    id: 6,
    title: "The Shining",
    author: "Stephen King",
    genre: "Horror",
    description: "A horror novel about a family trapped in a haunted hotel",
    coverImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&h=750&fit=crop",
    available: true,
    condition: "Good"
  },
  {
    id: 7,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    description: "A brief history of humankind",
    coverImage: "https://images.unsplash.com/photo-1503023528035-1af2ffc7b8d0?w=500&h=750&fit=crop",
    available: true,
    condition: "Excellent"
  },
  {
    id: 8,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    description: "A philosophical novel about following one's dreams",
    coverImage: "https://images.unsplash.com/photo-1508919801846-eef1f84e456b?w=500&h=750&fit=crop",
    available: true,
    condition: "Good"
  },
  {
    id: 9,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    description: "A guide to building good habits and breaking bad ones",
    coverImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=750&fit=crop",
    available: false,
    condition: "Excellent"
  },
  {
    id: 10,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    description: "A novel about the American Dream in the Jazz Age",
    coverImage: "https://images.unsplash.com/photo-1556155323-94d4e6a0c5f3?w=500&h=750&fit=crop",
    available: true,
    condition: "Good"
  },
  {
    id: 11,
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    genre: "Crime",
    description: "A crime novel about four retirees solving murders",
    coverImage: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&h=750&fit=crop",
    available: true,
    condition: "Excellent"
  },
  {
    id: 12,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Contemporary Fiction",
    description: "A novel about infinite possibilities in life",
    coverImage: "https://images.unsplash.com/photo-1508700714469-6e3d076e4a0e?w=500&h=750&fit=crop",
    available: true,
    condition: "Good"
  }
]

// All available genres
const genres = [
  "All Genres",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Horror",
  "Classic",
  "Crime",
  "Self-Help",
  "Contemporary Fiction"
]

// First, add this constant for the default book cover
const DEFAULT_BOOK_COVER = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop"

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All Genres")
  const [isAddBookVisible, setIsAddBookVisible] = useState(false)
  const [mockBooks, setMockBooks] = useState(initialMockBooks)

  const toggleAddBookForm = () => {
    setIsAddBookVisible(!isAddBookVisible)
  }

  // Function to handle borrowing a book
  const borrowBook = (bookId) => {
    setMockBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId ? { ...book, available: false } : book
      )
    );
    console.log(`Borrowing book with ID: ${bookId}`);
  }

  // Filter books based on search term and genre
  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const matchesGenre = selectedGenre === "All Genres" || book.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Explore Books</h1>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={toggleAddBookForm}>
            <FiPlus className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </div>

        {/* Add Book Form */}
        {isAddBookVisible && (
          <div className="mt-4 p-4 border rounded-md bg-white">
            <h2 className="text-xl font-semibold">Add a New Book</h2>
            {/* Form fields for book details */}
            <Input placeholder="Title" className="mt-2" />
            <Input placeholder="Author" className="mt-2" />
            <Input placeholder="Genre" className="mt-2" />
            <Input placeholder="Description" className="mt-2" />
            <Input placeholder="Cover Image URL" className="mt-2" />
            <Button className="mt-4 bg-green-600 hover:bg-green-700">Submit</Button>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by title, author, or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-2 rounded-md border border-gray-300"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/4] relative">
                {/* Availability Badge */}
                <div className="absolute top-2 right-2 z-20">
                  <Badge 
                    className={`
                      ${book.available 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-red-500 to-rose-600'} 
                      text-white shadow-lg border-0 px-3 py-1
                    `}
                  >
                    {book.available ? 'Available' : 'Borrowed'}
                  </Badge>
                </div>

                {/* Image with Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_BOOK_COVER
                  }}
                />
                
                {/* Quick Action Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    className={`w-full ${
                      book.available 
                        ? 'bg-white/90 hover:bg-white text-gray-900' 
                        : 'bg-gray-200/90 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!book.available}
                    onClick={() => borrowBook(book.id)}
                  >
                    {book.available ? 'Borrow Now' : 'Currently Unavailable'}
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 group-hover:text-purple-600 transition-colors">
                  {book.title}
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{book.author}</span>
                  <Badge 
                    variant="outline" 
                    className="bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {book.genre}
                  </Badge>
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {book.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Condition: <span className="font-medium text-gray-700">{book.condition}</span>
                    </span>
                    <span className={`font-medium ${
                      book.available ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {book.available ? '● In Stock' : '● Out of Stock'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <FiBook className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No books found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

