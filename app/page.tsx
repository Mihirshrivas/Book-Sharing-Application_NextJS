import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FiBook, FiUsers, FiMessageCircle, FiArrowRight } from "react-icons/fi"

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl opacity-20"></div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to BookShare
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our vibrant community to share, borrow, and discuss books with fellow readers. 
            Discover new stories, connect with book lovers, and explore endless possibilities.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              asChild
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/register">
                Get Started
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="px-8 py-6 text-lg border-2 hover:bg-gray-50/80"
            >
              <Link href="/books">
                Browse Books
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: FiBook,
              title: "Extensive Library",
              description: "Access a vast collection of books across various genres, from classics to contemporary bestsellers."
            },
            {
              icon: FiUsers,
              title: "Vibrant Community",
              description: "Connect with fellow book enthusiasts, share recommendations, and participate in reading groups."
            },
            {
              icon: FiMessageCircle,
              title: "Engaging Discussions",
              description: "Join thoughtful discussions about your favorite books and discover new perspectives."
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10,000+", label: "Books Available" },
              { number: "5,000+", label: "Active Members" },
              { number: "1,000+", label: "Daily Interactions" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Reading?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community today and discover your next favorite book. 
              It's free and takes less than a minute.
            </p>
            <Button 
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg"
            >
              <Link href="/register">
                Create Your Account
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center text-gray-600">
          <p>© 2024 BookShare. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

