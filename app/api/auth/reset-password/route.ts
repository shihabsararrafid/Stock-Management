import { errorHandler } from '@/lib/errorhandler'
import { verifyToken } from '@/lib/jwtutils'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { NextRequest, NextResponse } from 'next/server' // Import NextResponse
import { z } from 'zod'
dotenv.config()
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const sessionData = await new Response(req.body).json()
    const data = z
      .object({
        password: z.string(),
        token: z.string(),
      })
      .parse(sessionData)
    const res = await verifyToken(data.token)
    const user = await prisma.user.findUnique({
      where: {
        email: res.email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    })
    if (!user)
      return NextResponse.json({ success: true, message: 'User Not Found' }, { status: 404 })
    if (user) {
      const password = await bcrypt.hash(data.password, 12)
      const user = await prisma.user.update({
        where: {
          id: res.id,
        },
        data: {
          password: password,
        },
      })
      //   if(!result){

      //   }
      return NextResponse.json({ success: true, message: 'Password Updated' }, { status: 200 })
    }
  } catch (error) {
    return errorHandler(req, res, error)
  }
}
