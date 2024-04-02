import { errorHandler } from '@/lib/errorhandler'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server' // Import NextResponse
import { userCreateSchema } from '../../schemas'
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const sessionData = await new Response(req.body).json()
    const data = userCreateSchema.parse(sessionData)
    data.password = await bcrypt.hash(data.password, 12)
    const user = await prisma.user.create({
      data,
    })
    if (user)
      return NextResponse.json({ success: true, message: 'User Registered', user }, { status: 200 })
  } catch (error) {
    return errorHandler(req, res, error)
  }
}
