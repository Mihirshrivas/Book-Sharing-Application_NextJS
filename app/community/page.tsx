"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FiUsers, FiSearch, FiPlus, FiMessageCircle, FiHeart, FiShare2, FiX } from 'react-icons/fi'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

// Add interface for community type
interface Community {
  id: number
  name: string
  description: string
  memberCount: number
  image: string
  topics: string[]
  recentPosts: number
  isJoined?: boolean
}

// Update mockCommunities to include isJoined property
const mockCommunities: Community[] = [
  {
    id: 1,
    name: "Fiction Lovers",
    description: "A community for fiction book enthusiasts",
    memberCount: 1250,
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090",
    topics: ["Classic Literature", "Contemporary Fiction", "Book Reviews"],
    recentPosts: 23,
    isJoined: false
  },
  {
    id: 2,
    name: "Science & Tech Reads",
    description: "Discussing the latest in science and technology books",
    memberCount: 890,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    topics: ["Science", "Technology", "Innovation"],
    recentPosts: 15,
    isJoined: false
  },
  {
    id: 3,
    name: "Poetry Circle",
    description: "Share and discuss poetry from around the world",
    memberCount: 650,
    image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1",
    topics: ["Modern Poetry", "Classical Poetry", "Workshops"],
    recentPosts: 45,
    isJoined: false
  },
]

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    community: "Fiction Lovers",
    title: "Just finished 'The Midnight Library' - Amazing read!",
    content: "This book really makes you think about the choices we make in life...",
    likes: 124,
    comments: 45,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    community: "Science & Tech Reads",
    title: "Book Review: 'The Code Breaker' by Walter Isaacson",
    content: "An fascinating look at CRISPR and the future of gene editing...",
    likes: 89,
    comments: 32,
    timeAgo: "5 hours ago",
  },
]

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [communities, setCommunities] = useState<Community[]>(mockCommunities)
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    topics: "",
    image: ""
  })

  // Handle joining a community
  const handleJoinCommunity = (communityId: number) => {
    setCommunities(communities.map(community => {
      if (community.id === communityId) {
        const isJoining = !community.isJoined
        toast.success(isJoining 
          ? `Successfully joined ${community.name}` 
          : `Left ${community.name}`
        )
        return {
          ...community,
          isJoined: isJoining,
          memberCount: isJoining ? community.memberCount + 1 : community.memberCount - 1
        }
      }
      return community
    }))
  }

  // Handle creating a new community
  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate inputs
    if (!newCommunity.name || !newCommunity.description) {
      toast.error("Please fill in all required fields")
      return
    }

    // Create new community
    const newCommunityData: Community = {
      id: communities.length + 1,
      name: newCommunity.name,
      description: newCommunity.description,
      memberCount: 1,
      image: newCommunity.image || "https://images.unsplash.com/photo-1524578271613-d550eacf6090",
      topics: newCommunity.topics.split(',').map(topic => topic.trim()),
      recentPosts: 0,
      isJoined: true
    }

    setCommunities([...communities, newCommunityData])
    setNewCommunity({ name: "", description: "", topics: "", image: "" })
    setShowCreateForm(false)
    toast.success(`Successfully created ${newCommunityData.name}`)
  }

  // Add create community form component
  const CreateCommunityForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Community</h2>
          <button 
            onClick={() => setShowCreateForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleCreateCommunity} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Community Name*
            </label>
            <Input
              value={newCommunity.name}
              onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
              placeholder="Enter community name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <Textarea
              value={newCommunity.description}
              onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
              placeholder="Describe your community"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topics (comma-separated)
            </label>
            <Input
              value={newCommunity.topics}
              onChange={(e) => setNewCommunity({ ...newCommunity, topics: e.target.value })}
              placeholder="Fiction, Mystery, Book Reviews"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <Input
              value={newCommunity.image}
              onChange={(e) => setNewCommunity({ ...newCommunity, image: e.target.value })}
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Community
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Book Communities</h1>
            <p className="text-gray-600 mt-2">Join discussions with fellow book lovers</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          >
            <FiPlus className="h-5 w-5" />
            Create Community
          </Button>
        </div>

        {/* Search Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Communities List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Communities</h2>
            {communities
              .filter(community => 
                community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                community.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((community) => (
                <Card key={community.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle>{community.name}</CardTitle>
                      <CardDescription>{community.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiUsers className="h-4 w-4" />
                        <span>{community.memberCount} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiMessageCircle className="h-4 w-4" />
                        <span>{community.recentPosts} recent posts</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {community.topics.map((topic) => (
                        <span 
                          key={topic}
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        community.isJoined 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                      onClick={() => handleJoinCommunity(community.id)}
                    >
                      {community.isJoined ? 'Leave Community' : 'Join Community'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Discussions</h2>
            {mockPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{post.author.name}</p>
                      <p className="text-xs text-gray-500">
                        in {post.community} • {post.timeAgo}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1 hover:text-purple-600">
                      <FiHeart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-purple-600">
                      <FiMessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <button className="hover:text-purple-600">
                    <FiShare2 className="h-4 w-4" />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Show create community form when showCreateForm is true */}
      {showCreateForm && <CreateCommunityForm />}
    </div>
  )
}

