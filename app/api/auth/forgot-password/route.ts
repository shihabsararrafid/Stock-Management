import { errorHandler } from '@/lib/errorhandler'
import { signToken } from '@/lib/jwtutils'
import prisma from '@/lib/prisma'
import { sendForgotPasswordMail } from '@/lib/sendmail'
import dotenv from 'dotenv'
import { NextRequest, NextResponse } from 'next/server' // Import NextResponse
import { z } from 'zod'
dotenv.config()
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const sessionData = await new Response(req.body).json()
    const data = z
      .object({
        email: z.string().email(),
      })
      .parse(sessionData)

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
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
      const token = await signToken(user, '5mins')
      const link = process.env.BASE_URL + `auth/reset-password?token=${token}`
      const result = await sendForgotPasswordMail(user.username, link, data.email)
      //   if(!result){

      //   }
    }
    return NextResponse.json({ success: true, message: 'Email Successfully Send' }, { status: 200 })
  } catch (error) {
    return errorHandler(req, res, error)
  }
}
