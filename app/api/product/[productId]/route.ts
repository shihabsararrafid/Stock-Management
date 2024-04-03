import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { productUpdateSchema } from '../../schemas'

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string }; response: NextResponse },
) {
  try {
    const device = await prisma?.product.findUnique({
      where: {
        id: params.productId,
      },
      select: {
        id: true,
        name: true,
        stock: true,
        photoUrl: true,
      },
    })
    return NextResponse.json(
      { success: true, message: 'Product Info', data: device },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }
    console.error(error)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { productId: string }; response: NextResponse },
) {
  try {
    const sessionData = await new Response(request.body).json()
    const data = productUpdateSchema.parse(sessionData)
    const device = await prisma?.product.update({
      where: {
        id: params.productId,
      },
      data: data,
    })
    return NextResponse.json(
      { success: true, message: 'Updated Device Device List', data: device },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }
    console.error(error)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string }; response: NextResponse },
) {
  console.log(params.productId)
  try {
    const device = await prisma?.product.delete({
      where: {
        id: params.productId,
      },
    })
    return NextResponse.json(
      { success: true, message: 'Device Deleted', data: device },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, message: 'Invalid Server Response' },
          { status: 404 },
        )
      }
    }
    console.error(error)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
