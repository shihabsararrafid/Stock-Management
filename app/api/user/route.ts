// import { product } from './../../../node_modules/.pnpm/@prisma+client@5.11.0_prisma@5.11.0/node_moules/.prisma/client/index.d';
import { errorHandler } from '@/lib/errorhandler'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { productUploadSchema } from '../schemas'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const sessionData = await new Response(req.body).json()
    const data = productUploadSchema.parse(sessionData)
    const product = await prisma.product.create({ data })
    return NextResponse.json(
      { success: true, message: 'Product Created Successfully', product },
      { status: 200 },
    )
  } catch (error) {
    return errorHandler(req, res, error)
  }
}
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const users = await prisma.user.findMany({
      where: {},
      select: {
        password: false,
        role: true,
        id: true,
        username: true,
        department: true,
        email: true,
        image: true,
      },
    })
    return NextResponse.json({ success: true, message: 'Users List', users }, { status: 200 })
  } catch (error) {
    return errorHandler(req, res, error)
  }
}
