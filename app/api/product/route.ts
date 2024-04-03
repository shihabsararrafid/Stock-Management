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
    const products = await prisma.product.findMany({ where: {} })
    return NextResponse.json(
      { success: true, message: 'Product Created Successfully', products },
      { status: 200 },
    )
  } catch (error) {
    return errorHandler(req, res, error)
  }
}
