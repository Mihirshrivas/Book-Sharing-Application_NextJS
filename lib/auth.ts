import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

export async function verifyAuth(token: string) {
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export function generateToken(userId: string): string {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  }
} 