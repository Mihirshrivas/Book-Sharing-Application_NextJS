import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      totalUsers,
      totalBooks,
      activeLoans,
      pendingVerifications,
      recentActivities
    ] = await Promise.all([
      // Get total users
      prisma.user.count(),
      
      // Get total books
      prisma.book.count(),
      
      // Get active loans
      prisma.borrowRecord.count({
        where: {
          status: 'APPROVED',
          returnedDate: null
        }
      }),
      
      // Get pending verifications
      prisma.user.count({
        where: {
          isVerified: false
        }
      }),

      // Get recent activities
      prisma.borrowRecord.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          book: {
            select: {
              title: true
            }
          },
          borrower: {
            select: {
              name: true
            }
          }
        }
      })
    ])

    return NextResponse.json({
      stats: {
        totalUsers,
        totalBooks,
        activeLoans,
        pendingVerifications
      },
      recentActivities
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Error fetching stats' },
      { status: 500 }
    )
  }
} 