import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: { isVerified: true }
    })

    return NextResponse.json({ message: 'User verified successfully' })
  } catch (error) {
    console.error('Error verifying user:', error)
    return NextResponse.json(
      { error: 'Error verifying user' },
      { status: 500 }
    )
  }
} 