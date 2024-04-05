import { errorHandler } from '@/lib/errorhandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const nameHeader = new Headers(req.headers)
    console.log(nameHeader.get('userId'), 'hi')
    const userId = nameHeader.get('userId')
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          username: true,
          email: true,
          image: true,
          id: true,
          role: true,
          department: true,
          borrowList: {
            select: {
              id: true,
              userId: true,
              product: true,
              value: true,
              createdAt: true,
            },
          },
        },
      })
      return NextResponse.json({ message: 'Verified User', data: user }, { status: 200 })
    } else return NextResponse.json({ message: 'Invalid Server Response' }, { status: 404 })
  } catch (error) {
    return errorHandler(req, res, error)
  }
  // console.log(payload)
}
