import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyAuth } from '@/lib/auth'

// Add paths that should be protected
const protectedPaths = [
  '/profile',
  '/books/add',
  '/community/create',
  // Add other protected paths
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path should be protected
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Verify the token
      await verifyAuth(token)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 