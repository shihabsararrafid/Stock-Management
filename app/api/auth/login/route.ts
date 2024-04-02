import { signToken } from '@/lib/jwtutils'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { serialize } from 'cookie'
import { NextRequest, NextResponse } from 'next/server' // Import NextResponse
import { ZodError } from 'zod'
import { loginSchema } from '../../schemas'
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const sessionData = await new Response(req.body).json()
    const data = loginSchema.parse(sessionData)
    const user = await prisma.user.findUnique({ where: { username: data.username } })
    if (user) {
      const check = await bcrypt.compare(data.password, user.password)
      if (!check) throw new Error('Unauthorized')
      const encryptedSessionData = await signToken(data)
      console.log(encryptedSessionData, 'data')
      const cookie = serialize('session', encryptedSessionData as unknown as string, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
      })
      return NextResponse.json(
        { success: true, data: 'Login' },
        { status: 200, headers: { 'Set-Cookie': `${cookie}` } },
      ) // Using NextResponse
    } else throw new Error('Unauthorized')
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Could not parse data',
          issues: error.issues,
        },
        { status: 400 },
      ) // Using NextResponse
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid Server Response',
          },
          { status: 404 },
        ) // Using NextResponse
      }
    }
    console.error(error)
    return NextResponse.json({ success: false }, { status: 400 }) // Using NextResponse
  }
}
