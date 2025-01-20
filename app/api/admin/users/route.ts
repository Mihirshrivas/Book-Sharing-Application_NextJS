import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        _count: {
          select: {
            books: true,
            borrowedBooks: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedUsers = users.map(user => ({
      ...user,
      booksShared: user._count.books,
      booksLent: user._count.borrowedBooks,
      createdAt: user.createdAt.toISOString(),
      _count: undefined
    }))

    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 }
    )
  }
} 